<?xml version='1.0' encoding="UTF-8" ?>
<xsl:stylesheet 
    version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns="http://www.w3.org/1999/xhtml" 
    xmlns:set="http://exslt.org/sets"
    extension-element-prefixes="set">

    <!-- компонент DivisionEditor -->
    <xsl:template match="document/translations[translation[@component=//component[@class='DivisionEditor']/@name]]">
            <script type="text/javascript">
                <xsl:for-each select="translation[@component=$COMPONENTS[@class='DivisionEditor']/@name]">
                    var <xsl:value-of select="@const"/>='<xsl:value-of select="." disable-output-escaping="yes"/>';
                </xsl:for-each>
            </script>
    </xsl:template>    
    
    <!-- вывод дерева разделов -->
    <xsl:template match="recordset[parent::component[javascript/object/@name='DivManager'][@class='DivisionEditor'][@type='list']]">
        <xsl:variable name="TAB_ID" select="generate-id(record[1])"/>
        <div id="{generate-id(.)}" template="{$BASE}{$LANG_ABBR}{../@template}"   lang_id="{$LANG_ID}" single_template="{$BASE}{$LANG_ABBR}{../@single_template}" site="{../@site}">
            <ul class="tabs">
                <li>
                    <a href="#{$TAB_ID}"><xsl:value-of select="record[1]/field[1]/@tabName" /></a>
                    <!--<span class="data">{ lang: <xsl:value-of select="$LANG_ID" /> }</span>-->
                </li>
            </ul>
            <div class="paneContainer">
                <div id="{$TAB_ID}">
                    <div id="treeContainer" class="e-divtree-select"></div>
                </div>
            </div>
        </div>
    </xsl:template>    
    
    <!-- вывод дерева разделов -->
    <xsl:template match="recordset[parent::component[javascript/object/@name='DivSidebar'][@class='DivisionEditor'][@componentAction='main'][@type='list']]">
        <div id="{generate-id(.)}" template="{$BASE}{$LANG_ABBR}{../@template}"  lang_id="{$LANG_ID}" single_template="{$BASE}{$LANG_ABBR}{../@single_template}" site="{../@site}">
            <div id="treeContainer" class="e-divtree-main"></div>
        </div>
    </xsl:template>
    
    <xsl:template match="field[@name='page_rights'][@type='custom']">
        <xsl:variable name="RECORDS" select="recordset/record"/>
        <div class="table_data">
            <table width="100%" border="0">
                <thead>
                    <tr>
                        <td><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></td>
                        <xsl:for-each select="$RECORDS[position()=1]/field[@name='right_id']/options/option">
                            <td><xsl:value-of select="."/></td>
                        </xsl:for-each>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="$RECORDS">
                        <tr>
    						<xsl:if test="floor(position() div 2) = position() div 2">
                                <xsl:attribute name="class">even</xsl:attribute>
                            </xsl:if>
                            <td class="group_name"><xsl:value-of select="field[@name='group_id']"/></td>
                            <xsl:for-each select="field[@name='right_id']/options/option">
                                <td>
                                    <input type="radio" style="border:none; width:auto;" value="{@id}">
                                        <xsl:attribute name="name">right_id[<xsl:value-of select="../../../field[@name='group_id']/@group_id"/>]</xsl:attribute>
                                        <xsl:if test="@selected">
                                            <xsl:attribute name="checked">checked</xsl:attribute>
                                        </xsl:if>
                                    </input>
                                </td>
                            </xsl:for-each>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </div>
    </xsl:template>    
    
    <!-- поле выбора родительского раздела -->
    <xsl:template match="field[@name='smap_pid'][@mode='2'][ancestor::component[@class='DivisionEditor'][@type='form']]">
    	<div class="field">
            <xsl:if test="not(@nullable)">
                <xsl:attribute name="class">field required</xsl:attribute>
            </xsl:if>
    		<xsl:if test="@title">
    		    <div class="name">
        			<label for="{@name}"><xsl:value-of select="@title" disable-output-escaping="yes"/>:</label>
    			</div>
    		</xsl:if>
    		<div class="control">
                <xsl:variable name="FIELD_ID"><xsl:value-of select="generate-id()"/></xsl:variable>
                <span class="read" id="s_{$FIELD_ID}" style="margin-right: 5px;"><xsl:value-of select="@data_name" disable-output-escaping="yes" /></span>
                <input type="hidden" id="h_{$FIELD_ID}" value="{.}">                    
            		<xsl:attribute name="name"><xsl:choose>
    					<xsl:when test="@tableName"><xsl:value-of select="@tableName"/><xsl:if test="@language">[<xsl:value-of select="@language"/>]</xsl:if>[<xsl:value-of select="@name" />]</xsl:when>
    					<xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
    				</xsl:choose></xsl:attribute>
                </input>
        		<button type="button" id="sitemap_selector" hidden_field="h_{$FIELD_ID}" span_field="s_{$FIELD_ID}">...</button>
            </div>
    	</div>
    </xsl:template>
    
    
    <xsl:template match="field[@name='smap_pid'][@mode='1'][@type!='hidden'][ancestor::component[@class='DivisionEditor'][@type='form']]">
        <div class="field">
            <xsl:if test="@title">
                <div class="name">
                    <label for="{@name}"><xsl:value-of select="@title" disable-output-escaping="yes"/>:</label>
                </div>
            </xsl:if>
            <span class="read"><xsl:value-of select="@data_name" disable-output-escaping="yes" /></span>
                <input type="hidden" value="{.}">
                    <xsl:attribute name="name">
                        <xsl:choose>
                            <xsl:when test="@tableName"><xsl:value-of select="@tableName"/>[<xsl:value-of select="@name" />]</xsl:when>
                            <xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </input>
        </div>
    </xsl:template>    
    <!-- поле для ввода сегмента раздела -->
    <xsl:template match="field[@name='smap_segment'][ancestor::component[@class='DivisionEditor'][@type='form']]">
    	<div class="field">
            <xsl:if test="not(@nullable)">
                <xsl:attribute name="class">field required</xsl:attribute>
            </xsl:if>
            <xsl:if test="@title">
                <div class="name">
                    <label for="{@name}"><xsl:value-of select="@title" disable-output-escaping="yes"/></label>
                </div>
            </xsl:if>
    		<div class="control">
                <div class="smap_segment">      
                    <span><xsl:value-of select="../field[@name='smap_pid']/@base"/><xsl:value-of select="$LANG_ABBR"/></span><span id="smap_pid_segment"><xsl:value-of select="../field[@name='smap_pid']/@segment"/></span>
                    <xsl:choose>
                        <xsl:when test="@mode='2'">
                            <input style="width: 150px;">
                                <xsl:call-template name="FORM_ELEMENT_ATTRIBUTES"/>
                            </input>
                        </xsl:when>
                        <xsl:otherwise>
                            <span class="read current_segment"><xsl:value-of select="." disable-output-escaping="yes"/></span>
                            <input type="hidden" value="{.}">
                                <xsl:attribute name="name"><xsl:choose>
                                    <xsl:when test="@tableName"><xsl:value-of select="@tableName"/>[<xsl:value-of select="@name" />]</xsl:when>
                                    <xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
                                </xsl:choose></xsl:attribute>
                            </input>
                        </xsl:otherwise>
                    </xsl:choose>/
                </div>
            </div>
    	</div>
    </xsl:template>
    
    <!-- поле выбора шаблона -->
    <!--<xsl:template match="field[@name='tmpl_id'][ancestor::component[@class='DivisionEditor'][@type='form']]">
        <div class="field">
    	    <xsl:if test="not(@nullable)">
                <xsl:attribute name="class">field required</xsl:attribute>
            </xsl:if>
            <xsl:if test="@title">
                <div class="name">
                    <label for="{@name}"><xsl:value-of select="@title" disable-output-escaping="yes"/></label>
                </div>
            </xsl:if>
    		<div class="control">
                <select id="{@name}">
                    <xsl:attribute name="name"><xsl:choose>
                        <xsl:when test="@tableName"><xsl:value-of select="@tableName"/>[<xsl:value-of select="@name" />]</xsl:when>
                        <xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
                    </xsl:choose></xsl:attribute>
                    <xsl:if test="@nullable='1'">
                        <option></option>
                    </xsl:if>
                    <xsl:for-each select="options/option[@tmpl_is_system='']">
                    	<xsl:sort select="@tmpl_order_num" order="ascending" data-type="number"/>
                        <option value="{@id}">
                            <xsl:if test="@selected">
                                <xsl:attribute name="selected">selected</xsl:attribute>
                            </xsl:if>
                            <xsl:value-of select="."/>
                        </option>
                    </xsl:for-each>
                    <optgroup label="System templates">
                    <xsl:for-each select="options/option[@tmpl_is_system='1']">
                    	<xsl:sort select="@tmpl_order_num" order="ascending" data-type="number"/>
                        <option disabled="disabled" value="{@id}">
                            <xsl:if test="@selected">
                                <xsl:attribute name="selected">selected</xsl:attribute>
                            </xsl:if>
                            <xsl:value-of select="."/>
                        </option>
                    </xsl:for-each>
                    </optgroup>
                </select>
            </div>
    	</div>
    </xsl:template>-->
    
    <xsl:template match="record[parent::recordset[parent::component[@class='DivisionEditor'][@type='list']]]"/>
    <!-- /компонент DivisionEditor -->
    
    <xsl:template match="component[@class='SiteList']">
        <xsl:if test="not(recordset[@empty])">
            <div class="site_list_box">
                <xsl:apply-templates/>
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="recordset[parent::component[@class='SiteList']]">
        <ul class="site_list">
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="record[ancestor::component[@class='SiteList']]">
        <li>
            <xsl:if test="field[@name='site_id'] = $COMPONENTS[@class='DivisionEditor']/@site">
                <xsl:attribute name="class">active</xsl:attribute>
            </xsl:if>
            <a href="{$BASE}{$LANG_ABBR}{../../@template}show/{field[@name='site_id']}/"><xsl:value-of select="field[@name='site_name']"/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>