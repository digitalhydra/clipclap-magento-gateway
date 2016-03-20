<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\ClipClapGateway\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\ClipClapGateway\Gateway\Http\Client\ClientMock;
use Magento\Checkout\Model\Session as CheckoutSession;


/**
 * Class ConfigProvider
 */

class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'clipclap_gateway';

    /**
     * @var CheckoutSession
     */
    private $checkoutSession;

    /**
     * @var \Magento\Quote\Api\PaymentMethodManagementInterface
     */
    protected $paymentMethodManagement;

    public function __construct(
        CheckoutSession $checkoutSession,
        \Magento\Quote\Api\PaymentMethodManagementInterface $paymentMethodManagement,
        array $data = array()
    ) {
        // parent::__construct($context,
        //     $registry,
        //     $extensionFactory,
        //     $customAttributeFactory,
        //     $paymentData,
        //     $scopeConfig,
        //     $data);
 
        // $this->_scopeConfig = $scopeConfig;
        // // $this->_merchantKey =  $this->getConfigData('merchant_key');
        // $this->_merchantKey = $this->_scopeConfig->getValue('merchant_id');
        // $this->getConfigData('merchant_key')
        $this->checkoutSession = $checkoutSession;
        $this->paymentMethodManagement = $paymentMethodManagement;
    }

    public function getConfig()
    {

        // $output['paymentMethods'] = $this->getPaymentMethods();

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
            ],
            'paymentMethods'=>$this->getPaymentMethods()
        ];
    }

    /**
     * Returns array of payment methods
     * @return array
     */
    private function getPaymentMethods()
    {
        $paymentMethods = [];
        $quote = $this->checkoutSession->getQuote();
        if ($quote->getIsVirtual()) {
            foreach ($this->paymentMethodManagement->getList($quote->getId()) as $paymentMethod) {
                $paymentMethods[] = [
                    'code' => $paymentMethod->getCode(),
                    'title' => $paymentMethod->getTitle()
                ];
            }
        }
        return $paymentMethods;
    }
}
