<?php
/**
 * Класс ImageManager.
 *
 * @package energine
 * @subpackage image
 * @author 1m.dm
 * @copyright Energine 2006
 */


/**
 * Менеджер изображений.
 *
 * @package energine
 * @subpackage image
 * @author 1m.dm
 */
class ImageManager extends DataSet {

    public function __construct($name, $module,   array $params = null) {
        parent::__construct($name, $module,  $params);
        $this->setTitle('TXT_IMG_MANAGER');
    }

    public function createDataDescription() {
        $result = parent::createDataDescription();
        $fieldDescr = $result->getFieldDescriptionByName('align');
        $fieldDescr->loadAvailableValues(
            array(
                array('id' => 'bottom', 'value' => $this->translate('TXT_ALIGN_BOTTOM')),
                array('id' => 'middle', 'value' => $this->translate('TXT_ALIGN_MIDDLE')),
                array('id' => 'top',    'value' => $this->translate('TXT_ALIGN_TOP')),
                array('id' => 'left',   'value' => $this->translate('TXT_ALIGN_LEFT')),
                array('id' => 'right',  'value' => $this->translate('TXT_ALIGN_RIGHT'))
            ),
            'id', 'value'
        );
        return $result;
    }
}

