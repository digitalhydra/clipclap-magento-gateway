/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default'
    ],
    function (Component) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Magento_ClipClapGateway/payment/form',
                transactionResult: ''
            },

            initObservable: function () {

                this._super()
                    .observe([
                        'transactionResult'
                    ]);
                return this;
            },
            getInstructions:function(){
                console.log('set instructions')
                
            },

            getCode: function() {
                console.log('getCode')
                var _$clipclap = _$clipclap || {};
                _$clipclap._setKey = 'Vc7Jhi1v0DC9Tq0n6Ln5';
                _$clipclap._themeButton = "blue";
                _$clipclap._Buttons = {
                    "#botonClipClap":{
                        'paymentRef': 'ref0000001',
                        'netValue': '13000',
                        'taxValue': '1000',
                        'tipValue': '500',
                        'description': 'Combo 1. Hambuerguesa, Perro y Gaseosa'
                    }
                };
                return 'clipclap_gateway';
            },

            getData: function() {
                return {
                    'method': this.item.method,
                    'additional_data': {
                        'transaction_result': this.transactionResult()
                    }
                };
            },

            getTransactionResults: function() {
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
console.log('call-button')
    (function() {
        var cc = document.createElement('script'); cc.type = 'text/javascript'; cc.async = true;
        cc.src = 'https://clipclap.co/paybutton/js/paybutton.min.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cc, s);
    })();
