<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\ClipClapGateway\Model\Adminhtml\Source;

use Magento\Payment\Model\Method\AbstractMethod;

/**
 * Class ThemeButton
 */
class IvaType implements \Magento\Framework\Option\ArrayInterface
{
    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return [
            ['value' => '16',  'label' => 'IVA Regular del 16%'], 
            ['value' => '5',  'label' => 'IVA Reducido del 5%'], 
            ['value' => '0',  'label' => 'IVA Excento del 0%'], 
            ['value' => '0',  'label' => 'IVA Excluído del 0%'], 
            ['value' => '8',  'label' => 'Consumo Regular 8%'], 
            ['value' => '4',  'label' => 'Consumo Reducido 4%'], 
            ['value' => '20',  'label' => 'IVA Ampliado 20%']
        ];
    }
}
