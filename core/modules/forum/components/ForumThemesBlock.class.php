<?php
/**
 * Содержит класс ForumThemesBlock
 *
 * @package energine
 * @subpackage forum
 * @author d.pavka
 * @copyright d.pavka@gmail.com
 */

/**
 * Блок тем форума
 *
 * @package energine
 * @subpackage forum
 * @author d.pavka@gmail.com
 */
class ForumThemesBlock extends DataSet {
    /**
     * Конструктор класса
     *
     * @param string $name
     * @param string $module
     * @param Document $document
     * @param array $params
     * @access public
     */
    public function __construct($name, $module, Document $document, array $params = null) {
        parent::__construct($name, $module, $document, $params);
        $this->setType(self::COMPONENT_TYPE_LIST);
        $this->setProperty('exttype', 'feed');
        $this->addTranslation('TXT_READ_ALL_THEMES', 'TXT_COMMENT_NUM', 'TXT_LAST_COMMENT_DATE');
    }

    protected function createBuilder() {
        return new SimpleBuilder();
    }

    protected function defineParams() {
        return array_merge(
            parent::defineParams(),
            array(
                'limit' => 10
            )
        );
    }

    protected function loadDataDescription() {
        $result = array(
            'theme_id' => array(
                'type' => QAL::COLTYPE_INTEGER,
                'length' => 10,
                'key' => true,
                'index' => 'PRI',
            ),

            'comment_created' => array(
                'type' => QAL::COLTYPE_DATETIME,
                'outputFormat' => '%E'
            ),
            'comment_num' => array(
                'type' => QAL::COLTYPE_STRING,
            ),
            'comment_name' => array(
                'type' => QAL::COLTYPE_STRING,
            ),
            'theme_name' => array(
                'type' => QAL::COLTYPE_STRING,
            ),
            'theme_url' => array(
                'type' => QAL::COLTYPE_STRING,
            ),
        );
        return $result;
    }

    protected function loadData() {
        $result = false;
        $result = $this->dbh->selectRequest('
            SELECT  theme_id, theme_name, smap_id as theme_url, comment_num, SUBSTR(comment_name FROM 1 FOR 50) as comment_name , comment_created
            FROM `forum_theme` t
            LEFT JOIN forum_theme_comment c ON c.comment_id=t.comment_id
            WHERE t.comment_id IS NOT NULL and theme_closed =0 ORDER BY comment_num DESC
            LIMIT 0, ' . $this->getParam('limit') . '
        ');
        if(!empty($result) && is_array($result)){
            $result = array_map(function($row){
                $row['comment_name'] = strip_tags($row['comment_name']);
                $row['theme_url'] = Sitemap::getInstance()->getURLByID($row['theme_url']).$row['theme_id'].'/';
                return $row;
            }, $result);
        }
        return $result;

    }
}