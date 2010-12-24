var TreeView=new Class({options:{dblClick:$empty},Implements:Options,selectedNode:null,initialize:function(b,a){this.element=$(b);this.options.dblClick=this.nodeToggleListener;this.setOptions(a);this.nodes=[];this.element.getElements("li").each(function(c){this.nodes.push(new TreeView.Node(c,this))},this);this.nodes[0].select();this.setupCssClasses()},getSelectedNode:function(){return this.selectedNode},getNodeById:function(d){for(var b=0,a=this.nodes.length;b<a;b++){var c=this.nodes[b];if(c.id==d){return c}}return false},expandToNode:function(c){var b=[];var a=function(d){var e;if(d&&(e=d.getParent())){b.push(e);a(e)}};a((!(c instanceof TreeView.Node))?this.getNodeById(c):c);b.reverse();b.each(function(d){d.expand()})},expandAllNodes:function(){for(var b=0,a=this.nodes.length;b<a;this.nodes[b].expand(),b++){}},collapseAllNodes:function(){for(var b=0,a=this.nodes.length;b<a;this.nodes[b].collapse(),b++){}},setupCssClasses:function(){this.element.getElements("li").each(function(a){if(a.retrieve("treeNode").childs&&a.retrieve("treeNode").childs.childNodes.length){a.addClass("folder")}else{a.removeClass("folder")}if(a.getNext()){a.removeClass("last")}else{a.addClass("last")}});this.setupStyles()},setupStyles:function(){if(!Browser.Engine.trident){return}this.element.getElements("li.last").each(function(a){if(a.hasClass("folder")){if(a.hasClass("opened")){a.setStyles({background:"#FFF url(images/treeview/opened_last.gif) left -3px no-repeat"})}else{a.setStyles({background:"#FFF url(images/treeview/closed_last.gif) left -3px no-repeat"})}}else{a.setStyles({background:"#FFF url(images/treeview/h_line_last.gif) left -7px no-repeat"})}})},nodeToggleListener:function(d){d=new Event(d||window.event);d.stop();var c=d.target.retrieve("treeNode");if(d.target.get("tag")=="a"){c=d.target.getParent().retrieve("treeNode");if(!c){return}}if(d.target.get("tag")=="li"){var a=d.page.x-c.element.getLeft();var g=d.page.y-c.element.getTop();var f=Browser.Engine.trident?$(document.documentElement).getStyle("border-left-width"):0;var e=Browser.Engine.trident?$(document.documentElement).getStyle("border-top-width"):0;if(f=="medium"&&e=="medium"){f=2;e=2}var b=$("treeContainer");f-=b.getScroll().x;e-=b.getScroll().y;a-=f;g-=e;if((0>a||a>8)||(4>g||g>12)){return}}c.toggle()},nodeSelectListener:function(b){b=new Event(b||window.event);b.stop();var a=b.target.getParent().retrieve("treeNode");a.select()}});TreeView.Node=new Class({Implements:Events,tree:null,element:null,anchor:null,childs:null,opened:false,selected:false,id:null,data:null,initialize:function(b,a){this.tree=a;if($type(b)=="element"){this.element=$(b);this.id=this.element.getProperty("id")}else{this.element=new Element("li").adopt(new Element("a").setProperties({href:"#"}).set("html",b.name));this.id=b.id;this.data=b.data;this.setIcon(b.data.icon)}this.element.store("treeNode",this);this.anchor=this.element.getElement("a");if(b.data&&b.data["class"]){this.anchor.addClass(b.data["class"])}this.childs=this.element.getElement("ul");this.opened=this.element.hasClass("opened");this.element.addEvent("click",this.tree.nodeToggleListener);this.anchor.addEvent("dblclick",this.tree.options.dblClick);this.anchor.addEvent("click",this.tree.nodeSelectListener)},adopt:function(a){if(!(a instanceof TreeView.Node)){return false}if(!this.childs){this.childs=new Element("ul").addClass("hidden").injectInside(this.element)}this.childs.adopt(a.element);this.tree.nodes.push(a);return this},injectBefore:function(a){if(!(a instanceof TreeView.Node)){return false}this.element.injectBefore(a.element);this.tree.nodes.push(a);return this},injectInside:function(a){if(!(a instanceof TreeView.Node)){return false}if(!a.childs){a.childs=new Element("ul").addClass("hidden").injectInside(a.element)}this.element.inject(a.childs,"top");a.expand();this.tree.setupCssClasses();return this},removeChilds:function(){if(!this.childs){return}this.childs.getChildren().each(function(a){a.retrieve("treeNode").remove()},this)},getPrevious:function(){var a=this.element.getPrevious();return(a?a.retrieve("treeNode"):false)},getNext:function(){var a=this.element.getNext();return(a?a.retrieve("treeNode"):false)},getParent:function(){var a=this.element.getParent().getParent();return(a?a.retrieve("treeNode"):false)},isParentOf:function(d){var b=this.element.getElements("li");for(var c=0,a=b.length;c<a;c++){if(b[c].retrieve("treeNode")==d){return true}}return false},swap:function(b){if(!(b instanceof TreeView.Node)){return false}if(this.isParentOf(b)||b.isParentOf(this)){return false}var a;if(a=this.getNext()){if(a==b){b.swap(this)}else{this.injectBefore(b);b.injectBefore(a)}}else{a=this.getParent();this.injectBefore(b);a.adopt(b)}this.tree.setupCssClasses();return this},moveUp:function(){return this.swap(this.getPrevious())},moveDown:function(){return this.swap(this.getNext())},remove:function(){this.removeChilds();this.element.dispose();this.tree.nodes.pop(this);this.tree.setupCssClasses();return this},toggle:function(){if(this.childs&&this.childs.childNodes.length){this.element.toggleClass("opened");this.opened=this.element.hasClass("opened");this.childs.toggleClass("hidden");this.tree.setupStyles()}return this},expand:function(){if(!this.opened){this.toggle()}return this},collapse:function(){if(this.opened){this.toggle()}return this},disable:function(){},enable:function(){},select:function(){if(this==this.tree.selectedNode){this.fireEvent("select",this);return this}if(this.tree.selectedNode){this.tree.selectedNode.unselect()}this.tree.selectedNode=this;this.element.addClass("selected");this.selected=true;this.fireEvent("select",this);return this},unselect:function(){this.element.removeClass("selected");this.selected=false;return this},getId:function(){return this.id},setName:function(a){this.element.getElement("a").set("html",a)},setData:function(a){this.data=a},setIcon:function(a){this.element.getElement("a").setStyles({"background-image":"url("+a+")","background-position":"1px 1px","background-repeat":"no-repeat"})},getData:function(){return this.data}});