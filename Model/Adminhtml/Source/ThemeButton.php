<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Magento\ClipClapGateway\Model\Adminhtml\Source;

use Magento\Payment\Model\Method\AbstractMethod;


class ThemeButton implements \Magento\Framework\Option\ArrayInterface
{
    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return [
            ['value' => 'blue', 'label' => __('Azul')],
            ['value' => 'black', 'label' => __('Negro')],
            ['value' => 'white', 'label' => __('Blanco')]
        ];
    }
}