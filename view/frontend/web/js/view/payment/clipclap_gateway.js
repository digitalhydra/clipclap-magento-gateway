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

    console.log('call button file')
    var cc = document.createElement('script'); cc.type = 'text/javascript'; cc.async = true;cc.src = 'https://clipclap.co/paybutton/js/paybutton.min.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cc, s);

        return Component.extend({});
    }
);
