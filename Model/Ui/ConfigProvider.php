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
            'payment_us/clipclap_gateway/merchant_key',
            ScopeInterface::SCOPE_STORE
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
                    'merchantKey' => 'some_key',
                    'buttonTheme' => 'el azul',
                    'ivaTax' => 'el iva',
                ]
            ]
        ];
    }
}
