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
        // console.log('comp')
        
        var _$clipclap = _$clipclap || {};
        console.log('clipclap_define_var');
        _$clipclap._setKey = 'Vc7Jhi1v0DC9Tq0n6Ln5';
        _$clipclap._themeButton = "blue";
        _$clipclap._debugButton = true;
        _$clipclap._Buttons = {
            "#botonClipClap":{
                'paymentRef': 'Order 456787865',
                'netValue': '13000',
                'taxValue': '1000',
                'tipValue': '500',
                'description': 'Compra de pruebas magento'
            }
        };
        return Component.extend({
            defaults: {
                template: 'Magento_ClipClapGateway/payment/form',
                transactionResult: '',
                clipclap: _$clipclap
            },

            initObservable: function () {
                // (function(){
                //     console.log('call button file')
                // var cc = document.createElement('script'); cc.type = 'text/javascript'; cc.async = true;cc.src = 'https://clipclap.co/paybutton/js/paybutton.min.js';
                // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cc, s);

                // })()
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
    
