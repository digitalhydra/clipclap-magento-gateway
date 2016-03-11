/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/

require(['https://clipclap.co/paybutton/js/paybutton.min.js'], 
    function (paybutton) { 
        console.log('load paybutton con requirejs'); 
        
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
    }
);
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default'
    ],
    function (Component) {
        'use strict';
        // console.log('comp')
        
        return Component.extend({
            defaults: {
                template: 'Magento_ClipClapGateway/payment/form',
                transactionResult: ''
            },

            initObservable: function () {
                console.log('initObservable');
                    console.log(window._$clipclap);

                    console.log('call button file');
                    //<![CDATA[
                    // (function(d, t) {
                    //     var g = d.createElement(t),
                    //         s = d.getElementsByTagName(t)[0];
                    //     g.src = 'https://clipclap.co/paybutton/js/paybutton.min.js';
                    //     s.parentNode.insertBefore(g, s);
                    // }(document, 'script'));
                    //]]>
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
                console.log('getCode');
                return 'clipclap_gateway';
            },

            getData: function() {
                console.log('getData');
                
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
