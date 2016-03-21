<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\ClipClapGateway\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\ClipClapGateway\Gateway\Http\Client\ClientMock;

/**
 * Class ConfigProvider
 */
class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'clipclap_gateway';
    
    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    ) {
        // parent::__construct( $scopeConfig );

        $this->_scopeConfig = $scopeConfig;

        $this->merchantKey = $this->_scopeConfig->getValue(
            'payment/clipclap_gateway/merchant_key',
            'store'
        );
        $this->buttonTheme = $this->_scopeConfig->getValue(
            'payment/clipclap_gateway/button_type',
            'store'
        );
        $this->ivaTax = $this->_scopeConfig->getValue(
            'payment/clipclap_gateway/iva_type',
            'store'
        );
        $this->ivaTax = $this->_scopeConfig->getValue(
            'payment/clipclap_gateway/debug',
            'store'
        );
    }

    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
        return [
            'payment' => [
                self::CODE => [
                    'transactionResults' => [
                        ClientMock::SUCCESS => __('Success'),
                        ClientMock::FAILURE => __('Fraud')
                    ],
                    'merchantKey' => $this->merchantKey,
                    'buttonTheme' => $this->buttonTheme,
                    'ivaTax' => $this->ivaTax,
                    'debugMode' => $this->debugMode,
                ]
            ]
        ];
    }
}
