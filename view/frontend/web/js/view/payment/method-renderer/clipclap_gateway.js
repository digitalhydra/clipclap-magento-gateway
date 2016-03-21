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

                var ivaTax = window.checkoutConfig.payment.clipclap_gateway.ivaTax;
                var quoteTotal = parseFloat(window.checkoutConfig.totalsData.base_grand_total);
                var tax_rate = (quoteTotal * ivaTax)/100;
                var orderId = window.checkoutConfig.formKey;
                var order_id = window.checkoutConfig.quoteData.entity_id;

                window._$clipclap._Buttons = {
                    "#botonClipClap":{
                        'paymentRef': 'Orden '+order_id,
                        'netValue': quoteTotal.toFixed(2),
                        'taxValue': tax_rate,
                        'tipValue': '0',
                        'description': 'Compra por valor de '+quoteTotal.toFixed(2)
                    }
                };

                this._super()
                    .observe([
                        'transactionResult'
                    ]);
                return this;
            },
            getInstructions:function(){
                
            },
            getClipCLapButton:function(){
                console.log('call getClipCLapButton',window._$clipclap);

                    var evt = document.createEvent('Event');
                    evt.initEvent('load',false,false);
                    window.dispatchEvent(evt);

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
