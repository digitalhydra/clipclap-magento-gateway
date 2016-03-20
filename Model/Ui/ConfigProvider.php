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
final class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'clipclap_gateway';

    public function __construct(
        \Magento\Payment\Helper\Data $paymentData,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        array $data = array()
    ) {
    //     parent::__construct(
    //         $paymentData,
    //         $scopeConfig,
    //         $data
    //     );
 
        $this->_scopeConfig = $scopeConfig;
        // $showTemplateHint =  $this->_scopeConfig->getValue('merchant_key', \Magento\ClipClapGateway\Model\ScopeInterface::SCOPE_STORE);
        
        // $this->getConfigData('merchant_key')
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
                    'merchantKey' => '',
                    'buttonTheme' => 'el azul',
                    'ivaTax' => 'el iva',
                ]
            ]
        ];
    }
}
