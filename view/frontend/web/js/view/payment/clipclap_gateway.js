/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
    var _$clipclap = _$clipclap || {};
    _$clipclap._setKey = window.checkoutConfig.payment.clipclap_gateway.merchantKey;
    _$clipclap._themeButton = window.checkoutConfig.payment.clipclap_gateway.buttonTheme;
    _$clipclap._debugButton = window.checkoutConfig.payment.clipclap_gateway.debugMode;
    _$clipclap.transactionState = function(status, codRespuesta, paymentRef, token, numAprobacion, fechaTransaccion){

            // jQuery("body").block({
            //     message: "Estamos procesando el pedido.",
            //     baseZ: 99999,
            //     overlayCSS:{ background: "#fff", opacity: 0.6 },
            //     css: { padding:"20px", zindex:"9999999", textAlign:"center",color:"#555",border: "3px solid #aaa",backgroundColor:"#fff",cursor:"wait",lineHeight:"24px",
            //     }
            // });
            // var transactionData = {
            //     'estado' : status,
            //     'codRespuesta' : codRespuesta,
            //     'paymentRef' : '<?php echo $clipclap_args["order_id"]; ?>',
            //     'token' : token,
            //     'numAprobacion' : numAprobacion,
            //     'fechaTransaccion' : fechaTransaccion
            // }
            
            // jQuery.post( '<?php echo $api_url; ?>', transactionData )
            // .done(function( data ) {
            //     window.location = '<?php echo $redirect_url; ?>';
            // });

    };
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
