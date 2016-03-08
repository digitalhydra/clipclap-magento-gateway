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
        
        return Component.extend({
            defaults: {
                template: 'Magento_ClipClapGateway/payment/form',
                transactionResult: ''
            },

            initObservable: function () {
                console.log('initObservable');

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
                console.log(window._$clipclap);

                    console.log('call button file');
                    var cc = document.createElement('script'); cc.type = 'text/javascript'; cc.async = true;
                    cc.src = 'https://clipclap.co/paybutton/js/paybutton.min.js';
                    var s = document.getElementsByTagName('script')[0]; 
                    s.parentNode.insertBefore(cc, s);

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
    
