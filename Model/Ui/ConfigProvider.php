<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\ClipClapGateway\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\ClipClapGateway\Gateway\Http\Client\ClientMock;

// use Magento\Quote\Api\Data\CartInterface;
// use Magento\Payment\Model\Method\AbstractMethod;
// use Magento\Sales\Model\Order;

/**
 * Class ConfigProvider
 */
// final class ConfigProvider implements ConfigProviderInterface
// class ConfigProvider implements AbstractMethod
class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'clipclap_gateway';

    public function __construct(
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory,
        \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory,
        \Magento\Payment\Helper\Data $paymentData,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        array $data = array()
    ) {
        // parent::__construct($context,
        //     $registry,
        //     $extensionFactory,
        //     $customAttributeFactory,
        //     $paymentData,
        //     $scopeConfig,
        //     $data);
 
        $this->_scopeConfig = $scopeConfig;
        // $this->_merchantKey =  $this->getConfigData('merchant_key');
        $this->_merchantKey = $this->_scopeConfig->getValue('merchant_id');
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
                    'merchantKey' =>  $this->_merchantKey,
                    'buttonTheme' => 'el azul',
                    'ivaTax' => 'el iva',
                ]
            ]
        ];
    }
}
