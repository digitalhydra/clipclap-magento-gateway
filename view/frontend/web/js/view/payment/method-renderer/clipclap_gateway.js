/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
// require(['https://clipclap.co/paybutton/js/paybutton.min.js'], 
//     function (paybutton) { 

//         console.log('load paybutton con requirejs y re emite window.load',window._$clipclap); 
//         var evt = document.createEvent('Event');
//         evt.initEvent('load',false,false);
//         window.dispatchEvent(evt);
        
//     }
// );

/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default',
        'https://clipclap.co/paybutton/js/paybutton.min.js'
    ],
    function (Component,paybutton) {
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
                var _transactionResult = this.transactionResult;
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

                    switch (codRespuesta){
                        case 3002:
                            document.getElementById('transaction_result').value = 1;
                        break;
                        case 1002:
                        case 1000:
                        default:
                            document.getElementById('transaction_result').value = 0;
                        break
                    }
                    window._$clipclap.transactionData = {
                        'estado' : status,
                        'codRespuesta' : codRespuesta,
                        'paymentRef' : paymentRef,
                        'token' : token,
                        'numAprobacion' : numAprobacion,
                        'fechaTransaccion' : fechaTransaccion
                    };
                    console.log(window._$clipclap);
                    var form = document.querySelector('li#payment form.payment').submit();
                    

                };

                // console.log('call getClipCLapButton',window._$clipclap);

                    var evt = document.createEvent('Event');
                    evt.initEvent('load',false,false);
                    window.dispatchEvent(evt);

                return true;
            },
            getCode: function() {
                // console.log('getCode');
                return 'clipclap_gateway';
            },

            getData: function() {
                // console.log('getData');
                
                return {
                    'method': this.item.method,
                    'additional_data': {
                        'transaction_result': this.transactionResult()
                    }
                };
            },
            getTransactionResults: function() {
                console.log('getTransactionResults');
                return _.map(window.checkoutConfig.payment.clipclap_gateway.transactionResults, function(value, key) {
                    return {
                        'value': key,
                        'transaction_result': value
                    }
                });
            }
        });
    }
);
