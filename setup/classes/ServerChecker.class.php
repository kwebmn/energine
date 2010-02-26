<?php
    /**
     * Содержит класс ServerChecker
     *
     * @package energine
     * @subpackage configurator
     * @author Tigrenok
     * @copyright Energine 2007
     * @version $Id: ServerChecker.class.php,v 1.12 2007/11/26 14:13:59 tigrenok Exp $
     */

    require_once('Model.class.php');

    /**
     * Класс проверки сервера на возможность установки Energine
     *
     * @package energine
     * @subpackage configurator
     */
    class ServerChecker extends Model {
        /**
         * Список модулей, необходимых для корректной работы системы
         *
         * @var array
         * @access private
         */
        private $modules = array(
            	'dom',
            	'session',
            	'SimpleXML',
            	'iconv',
            	'json',
            	'gd',
            	'mbstring',
            	'PDO',
            	'pdo_mysql',
            	'tidy',
            	'xsl',
                'zip'
        );

        /**
         * Флаг работы без вывода информации
         *
         * @var boolean
         * @access private
         */
        private $silentMode = true;

        /**
         * Путь к файлу от корня сервера
         *
         * @var string
         * @access private
         */
        private static $systemConfigPath;

        /**
         * Проверка веб сервера
         *
         * @return boolean
         * @access private
         */
        private function isApacheSuitable() {
            $result = true;
            
            if (!(isset($_SERVER['SCRIPT_FILENAME']) ||
                    isset($_SERVER['REQUEST_URI']) ||
                    isset($_SERVER['SERVER_NAME']) ||
                    isset($_SERVER['SCRIPT_NAME'])
            )) {
               $this->getViewer()->addBlock('Это удивительно, но на этот сервер невозможно установить Energine. Свяжитесь с разработчиками и сообщите им об этом прискорбном факте.',Viewer::TPL_CHECKER_EXCEPTION);
              	$result = false;
            } elseif(!$this->silentMode) {
                $this->getViewer()->addBlock('Подходящий сервер запущен.',Viewer::TPL_CHECKER_CONFIRM);
            }

            return $result;
        }

        /**
         * Проверка модулей РНР
         *
         * @return boolean
         * @access private
         */
        private function isPHPModulesAvailable() {
            $result =  true;
            $installedModules = get_loaded_extensions();
            $difference = array_diff($this->modules, $installedModules);
            if(!empty($difference)){
            	$this->getViewer()->addBlock(array('Следующие модули PHP должны быть установлены:'=>$difference),Viewer::TPL_CHECKER_EXCEPTION);
            	$result = false;
            } elseif(!$this->silentMode) {
                $this->getViewer()->addBlock('Все необходимые модули PHP установлены.',Viewer::TPL_CHECKER_CONFIRM);
            }

            return $result;
        }

        /**
         * ПРоверка прав и наличия файлов
         *
         * @return boolean
         * @access private
         */

        private function hasValidEnvironment() {
            $result = true;
            $serverRoot = str_replace(SCRIPT_NAME,'',$_SERVER['SCRIPT_FILENAME']);
            $this->systemConfigPath = $serverRoot.'/'.PATH_SYSTEM_CONFIG;

            if (!is_writable($this->systemConfigPath) && !@chmod($this->systemConfigPath,CHMOD_DIRS)) {
                $this->getViewer()->addBlock('У апача нет прав на запись в конфигурационный файл ('.$this->systemConfigPath.') и нет возможности изменить права. Необходимо вручную изменить права на файл конфигурации.',Viewer::TPL_CHECKER_EXCEPTION);
                $result = false;
            }
            elseif(!$this->silentMode) {
                $this->getViewer()->addBlock('Права на запись в конфигурационный файл присутствуют.',Viewer::TPL_CHECKER_CONFIRM);
            }

            if (!is_writable($serverRoot) && !@chmod($serverRoot,CHMOD_DIRS)) {
                $this->getViewer()->addBlock('У апача нет прав на запись в корневую директорию ('.$serverRoot.') и нет возможности изменить права. Необходимо вручную изменить права на корневую директорию.',Viewer::TPL_CHECKER_EXCEPTION);
                $result = false;
            }
            elseif(!$this->silentMode) {
                $this->getViewer()->addBlock('Права на запись в корневую директорию присутствуют.',Viewer::TPL_CHECKER_CONFIRM);
            }
            
            foreach (Processor::$uploadsFolders as $folderName){
            	$fname = $serverRoot.'/'.UPLOADS_FOLDER_NAME.'/'.$folderName;
	            if(!is_writable($fname)){
	            	$this->getViewer()->addBlock('Нет прав на запись в директорию '.$fname.' и нет возможности изменить их . Вам необходимо вручную выставить уровень прав 0777.', Viewer::TPL_CHECKER_EXCEPTION);
	            	$result = false;
	            }
            }

            return $result;
        }
        
        /**
         * Метод проверки сервера на возможность установки Energine
         *
         * @return void
         * @access public
         */
        public function run() {
            if (!$this->silentMode) {
                $this->getViewer()->addBlock('Проверка сервера:',Viewer::TPL_HEADER);
            }

            if (
                $this->isApacheSuitable() &&
                $this->isPHPModulesAvailable() &&
                $this->hasValidEnvironment()
            ) {
                if (!$this->silentMode) {
                    $this->getViewer()->addBlock('Все проверки пройдены. Вы можете <a href="?state=install">продолжить установку системы</a>.',Viewer::TPL_CHECKER_CONFIRM);
                }
            }
            else {
            	throw new CheckerException();
            }
        }

        /**
         * Устанавливает "бесшумный" режим
         *
         * @param boolean
         * @return void
         * @access public
         */
        public function silentMode($sw) {
            $this->silentMode = $sw;
        }

    }