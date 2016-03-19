/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/

    console.log('clipclap_define_var');
    var _$clipclap = _$clipclap || {};
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

    console.log('transfer_options',window.checkoutConfig.payment.clipclap_gateway);

/*global define*/
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        
        rendererList.push(
            {
                type: 'clipclap_gateway',
                component: 'Magento_ClipClapGateway/js/view/payment/method-renderer/clipclap_gateway'
            }
        );
        /** Add view logic here if needed */
        
        // function (config) { console.log('config',config); }

        //
        return Component.extend({});
        
    }
);
