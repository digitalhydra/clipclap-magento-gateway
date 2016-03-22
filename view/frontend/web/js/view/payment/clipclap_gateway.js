/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
    var _$clipclap = _$clipclap || {};
    _$clipclap._setKey = window.checkoutConfig.payment.clipclap_gateway.merchantKey;
    _$clipclap._themeButton = window.checkoutConfig.payment.clipclap_gateway.buttonTheme;
    _$clipclap._debugButton = window.checkoutConfig.payment.clipclap_gateway.debugMode;
    
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
