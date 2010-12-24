ScriptLoader.load("TabPane","Toolbar","ModalBox","TreeView");var DivManager=new Class({Implements:Energine.request,initialize:function(a){Asset.css("treeview.css");Asset.css("div.css");this.element=$(a);this.tabPane=new TabPane(this.element);this.langId=this.element.getProperty("lang_id");new Element("ul").setProperty("id","divTree").addClass("treeview").injectInside($("treeContainer")).adopt(new Element("li").setProperty("id","treeRoot").adopt(new Element("a",{href:"#"}).set("html",Energine.translations.get("TXT_DIVISIONS"))));this.tree=new TreeView("divTree",{dblClick:this.go.bind(this)});this.treeRoot=this.tree.getSelectedNode();this.singlePath=this.element.getProperty("single_template");this.site=this.element.getProperty("site");this.loadTree();if(!(document.getElement(".e-singlemode-layout"))){window.addEvent("resize",this.fitTreeFormSize.bind(this))}},attachToolbar:function(c){this.toolbar=c;var a=this.element.getElement(".e-pane-b-toolbar");if(a){a.adopt(this.toolbar.getElement())}else{this.element.adopt(this.toolbar.getElement())}this.toolbar.disableControls();var b;["add","select","close","edit"].each(function(e){var d;if(d=this.toolbar.getControlById(e)){d.enable()}},this);c.bindTo(this)},loadTree:function(){this.request(this.singlePath+this.site+"/get-data/","languageID="+this.langId,function(a){this.buildTree(a.data,(a.current)?a.current:null);if(!(document.getElement(".e-singlemode-layout"))){this.pane=this.element;this.paneContent=this.pane.getElement(".e-pane-item");this.treeContainer=this.pane.getElement(".e-divtree-select");this.minPaneHeight=300;this.fitTreeFormSize();new Fx.Scroll(document.getElement(".e-mainframe")?document.getElement(".e-mainframe"):window).toElement(this.pane)}}.bind(this))},buildTree:function(d,g){var h={};for(var e=0,a=d.length;e<a;e++){var f=d[e];var c=f.smap_pid||"treeRoot";if(!h[c]){h[c]=[]}h[c].push(f)}var b=function(p){var n=this.tree.getNodeById(p);for(var l=0,j=h[p].length;l<j;l++){var q=h[p][l];var m=(q.tmpl_icon)?Energine.base+q.tmpl_icon:Energine.base+"templates/icons/empty.icon.gif";var o=q.smap_id;if(!q.smap_pid){this.treeRoot.setName(q.smap_name);this.treeRoot.id=q.smap_id;this.treeRoot.setData(q);this.treeRoot.setIcon(m);this.treeRoot.addEvent("select",this.onSelectNode.bind(this))}else{var k=new TreeView.Node({id:o,name:q.smap_name,data:{"class":((o==g)?" current":""),icon:m}},this.tree);k.setData(q);k.addEvent("select",this.onSelectNode.bind(this));n.adopt(k)}if(h[o]){b(o)}}}.bind(this);b(this.treeRoot.getId());this.tree.setupCssClasses();this.treeRoot.expand();this.tree.expandToNode(g);if(this.tree.getNodeById(g)){this.tree.getNodeById(g).select()}},fitTreeFormSize:function(){var e=window.getSize().y-10;var b=this.pane.getSize().y;var d=this.treeContainer.getSize().y;var a=this.paneContent.getSize().y-22;var c=b-a;if(e>this.minPaneHeight){if((d+c)>e){this.pane.setStyle("height",e)}else{this.pane.setStyle("height",d+c)}}else{this.pane.setStyle("height",this.minPaneHeight)}},reload:function(a){if(a){this.treeRoot.removeChilds();this.treeRoot.id="treeRoot";this.loadTree()}},add:function(){var a=this.tree.getSelectedNode().getId();ModalBox.open({url:this.singlePath+"add/"+a+"/",onClose:function(b){if(b){if(b.afterClose=="add"){this.add()}else{if(b.afterClose=="go"){window.top.location.href=Energine.base+b.url}else{this.reload(true)}}}}.bind(this),extraData:this.tree.getSelectedNode()})},edit:function(){var a=this.tree.getSelectedNode().getId();ModalBox.open({url:this.singlePath+a+"/edit",onClose:this.refreshNode.bind(this),extraData:this.tree.getSelectedNode()})},del:function(){var a=Energine.translations.get("MSG_CONFIRM_DELETE")||"Do you really want to delete record?";if(!confirm(a)){return}var b=this.tree.getSelectedNode().getId();this.request(this.singlePath+b+"/delete","",function(c){this.tree.getSelectedNode().remove();this.treeRoot.select()}.bind(this))},changeOrder:function(a){if(!a.result){return}if(a.dir=="<"){this.tree.getSelectedNode().moveUp()}else{this.tree.getSelectedNode().moveDown()}},up:function(){var a=this.tree.getSelectedNode().getId();this.request(this.singlePath+a+"/up","",this.changeOrder.bind(this))},down:function(){var a=this.tree.getSelectedNode().getId();this.request(this.singlePath+a+"/down","",this.changeOrder.bind(this))},select:function(){var a=this.tree.getSelectedNode().getData();ModalBox.setReturnValue(a);ModalBox.close()},close:function(){ModalBox.close()},go:function(){var a=this.tree.getSelectedNode().getData();if(a.smap_segment||!a.smap_pid){window.top.document.location=((a.site)?a.site:Energine.base)+a.smap_segment}},onSelectNode:function(c){if(this.toolbar){var e=c.getData(),a;var d=this.toolbar.getControlById("add");var f=this.toolbar.getControlById("edit");var b=this.toolbar.getControlById("select");if((undefined!=e)&&e.smap_pid){this.toolbar.enableControls()}else{this.toolbar.disableControls();if(d){d.enable()}if(b){b.enable()}if(f){f.enable()}}if(a=this.toolbar.getControlById("close")){a.enable()}}},refreshNode:function(){var a=this.tree.getSelectedNode().getId();this.request(this.singlePath+"get-node-data","languageID="+this.langId+"&id="+a,function(d){if(d.data.smap_pid==null){d.data.smap_pid=""}var c=d.data.smap_pid;var e=this.tree.getSelectedNode();if(c!=e.getData().smap_pid){var b=(c)?this.tree.getNodeById(c):this.treeRoot;this.tree.expandToNode(b);e.injectInside(b)}e.setData(d.data);e.setName(d.data.smap_name)}.bind(this))}});