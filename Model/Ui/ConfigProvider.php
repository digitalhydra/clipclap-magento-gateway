<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\ClipClapGateway\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\ClipClapGateway\Gateway\Http\Client\ClientMock;
use Magento\Framework\App\Config\ScopeConfigInterface;


/**
 * Class ConfigProvider
 */
class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'clipclap_gateway';
    

    /**
     * @param ConfigFactory $configFactory
     * @param ResolverInterface $localeResolver
     * @param CurrentCustomer $currentCustomer
     * @param PaypalHelper $paypalHelper
     * @param PaymentHelper $paymentHelper
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
    ) {
        
        $this->scopeConfig = $scopeConfig;

        
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
            ],
            'config'=>$this->scopeConfig
        ];
    }
}
