/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/

/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default',
        'https://clipclap.co/paybutton/js/paybutton.min.js',
        'jquery',
        'Magento_Checkout/js/action/place-order',
        'Magento_Checkout/js/action/select-payment-method',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/payment/additional-validators',
        'mage/url'
    ],
    function (Component,
        paybutton,
        $,
        placeOrderAction,
        selectPaymentMethodAction,
        customer,
        checkoutData,
        additionalValidators,
        url
    ) {
        'use strict';
        // console.log('comp')
        
        return Component.extend({
            defaults: {
                template: 'Magento_ClipClapGateway/payment/form',
                transactionResult: ''
            },

            initObservable: function () {
                // console.log('initObservable');


                this._super()
                    .observe([
                        'transactionResult'
                    ]);
                return this;
            },
            getInstructions:function(){
                
            },
            getClipCLapButton:function(){
                var self = this;

                var ivaTax = window.checkoutConfig.payment.clipclap_gateway.ivaTax;
                var quoteTotal = (parseFloat(window.checkoutConfig.totalsData.base_grand_total)).toFixed(0).toString();
                var tax_rate = ((quoteTotal * ivaTax)/100).toFixed(0).toString();
                var orderId = window.checkoutConfig.formKey;
                var d = new Date();
                var orderHash = d.getTime();

                window._$clipclap._Buttons = {
                    "#botonClipClap":{
                        'paymentRef': 'Orden '+orderId+'#'+orderHash,
                        'netValue': (quoteTotal)+'',
                        'taxValue': (tax_rate)+'',
                        'tipValue': '0',
                        'description': 'Compra por valor de '+quoteTotal+''
                    }
                };

                window._$clipclap.transactionState = function(status, codRespuesta, paymentRef, token, numAprobacion, fechaTransaccion){

                    window._$clipclap.transactionData = {
                        'estado' : status,
                        'codRespuesta' : codRespuesta,
                        'paymentRef' : paymentRef,
                        'token' : token,
                        'numAprobacion' : numAprobacion,
                        'fechaTransaccion' : fechaTransaccion
                    };
                    // console.log(window._$clipclap.transactionData);
                    switch (codRespuesta){
                        case '3002':
                        case '3001':
                            document.getElementById('transaction_result').value = 1;
                            self.transactionResult = 1;
                            self.placeOrder();
                        break;
                        case '1002':
                        case '1000':
                        default:
                            self.transactionResult = 0;
                            document.getElementById('transaction_result').value = 0;
                            self.afterFailedPlaceOrder();
                        break
                    }

                    //

                };

                // console.log('call getClipCLapButton',window._$clipclap._Buttons);

                    var evt = document.createEvent('Event');
                    evt.initEvent('load',false,false);
                    window.dispatchEvent(evt);

                return true;
            },
            getCode: function() {
                // console.log('getCode');
                return 'clipclap_gateway';
            },
            placeOrder: function (data, event) {
                if (event) {
                    event.preventDefault();
                }
                var self = this,
                    placeOrder,
                    emailValidationResult = customer.isLoggedIn(),
                    loginFormSelector = 'li#payment form.payments';
                
                if (!customer.isLoggedIn()) {
                    $(loginFormSelector).validation();
                    emailValidationResult = Boolean($(loginFormSelector + ' input[name=username]').valid());
                }
                if (emailValidationResult && this.validate() && additionalValidators.validate()) {
                    this.isPlaceOrderActionAllowed(false);
                    placeOrder = placeOrderAction(this.getData(), false, this.messageContainer);

                    $.when(placeOrder).fail(function () {
                        self.isPlaceOrderActionAllowed(true);
                    }).done(this.afterPlaceOrder.bind(this));
                    return true;
                }
                return false;
            },
            getData: function() {
                var self = this;

                return {
                    'method': this.item.method,
                    'additional_data': {
                        'transaction_result': self.transactionResult
                    }
                };
            },
            transactionResult:function(){
                return this.transactionResult;
            },
            getTransactionResults: function() {
                console.log('getTransactionResults');
                return _.map(window.checkoutConfig.payment.clipclap_gateway.transactionResults, function(value, key) {
                    return {
                        'value': key,
                        'transaction_result': value
                    }
                });
            },
            selectPaymentMethod: function() {
                selectPaymentMethodAction(this.getData());
                checkoutData.setSelectedPaymentMethod(this.item.method);
                return true;
            },
            afterPlaceOrder: function () {
                window.location.replace(url.build('checkout/onepage/success/'));
            },
            afterFailedPlaceOrder: function () {
                window.location.replace(url.build('checkout/'));
            },
        });
    }
);
