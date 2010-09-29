<?php
/**
 * Содержит класс ForumСategoriesEditor
 *
 * @package energine
 * @subpackage forum
 * @author d.pavka
 * @copyright d.pavka@gmail.com
 */

 /**
  * редаткор категорий
  *
  * @package energine
  * @subpackage forum
  * @author d.pavka@gmail.com
  */
 class ForumCategoriesEditor extends Grid {
    /**
     * Конструктор класса
     *
     * @param string $name
     * @param string $module
     * @param Document $document
     * @param array $params
     * @access public
     */
    public function __construct($name, $module, Document $document,  array $params = null) {
        parent::__construct($name, $module, $document,  $params);
        $this->setTableName('forum_categories');
    }
}