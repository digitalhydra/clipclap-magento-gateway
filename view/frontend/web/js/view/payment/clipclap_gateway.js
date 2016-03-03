/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
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
        (function() {
            var cc = document.createElement('script'); cc.type = 'text/javascript'; cc.async = true;
            cc.src = 'https://clipclap.co/paybutton/js/paybutton.min.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cc, s);
        })();
        return Component.extend({});
    }
);
