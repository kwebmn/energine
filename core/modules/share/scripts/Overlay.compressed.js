var Overlay=new Class({Implements:Options,options:{opacity:0.5,hideObjects:true,indicator:true},initialize:function(a,b){Asset.css("overlay.css");this.setOptions(b);this.element=new Element("div").addClass("e-overlay e-overlay-loading").injectInside(a?a:document.body);this.element.fade("hide");if(!(this.options.indicator)){this.element.removeClass("e-overlay-loading")}},show:function(){this.setupObjects(true);this.element.fade(this.options.opacity)},hide:function(){var a=new Fx.Tween(this.element,{property:"opacity"});a.start(this.options.opacity,0).chain(this.setupObjects.pass(false,this));a.start(0)},setupObjects:function(b){var a;if(!this.options.hideObjects){return}var c=$A((a=$(document.body)).getElements("object"));c.extend($A(a.getElements(Browser.Engine.trident?"select":"embed")));c.each(function(d){d.style.visibility=b?"hidden":""})}});