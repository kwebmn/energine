ScriptLoader.load("Overlay");var ModalBox=window.top.ModalBox||{boxes:[],init:function(){Asset.css("modalbox.css");this.overlay=new Overlay(document.body,{indicator:false});this.initialized=true},open:function(a){var b=new Element("div").addClass("e-modalbox").injectInside(document.body);b.options={url:null,onClose:$empty,extraData:null};$extend(b.options,$pick(a,{}));if(Browser.Engine.trident){iframe=$(document.createElement('<iframe class="e-modalbox-frame" src="'+b.options.url+'" frameBorder="0" scrolling="no" />'))}else{iframe=new Element("iframe").setProperties({src:b.options.url,frameBorder:"0",scrolling:"no","class":"e-modalbox-frame"})}b.iframe=iframe.injectInside(b);b.closeButton=new Element("div").addClass("e-modalbox-close").injectInside(b);b.closeButton.addEvents({click:this.close.bind(this),mouseover:function(){this.addClass("highlighted")},mouseout:function(){this.removeClass("highlighted")}});this.boxes.push(b);if(this.boxes.length==1){this.overlay.show()}},getCurrent:function(){return this.boxes[this.boxes.length-1]},getExtraData:function(){var a=null;if(this.getCurrent()){a=this.getCurrent().options.extraData}return a},setReturnValue:function(a){this.getCurrent().store("returnValue",a)},close:function(){if(!this.boxes.length){return}var b=this.boxes.pop();b.options.onClose(b.retrieve("returnValue"));var a=function(){b.iframe.setProperty("src","about:blank");b.iframe.destroy();b.destroy()};a.delay(1);if(!this.boxes.length){this.overlay.hide()}},keyboardListener:function(a){switch(a.key){case"esc":this.close();break}}};if(!ModalBox.initialized){window.addEvent("domready",ModalBox.init.bind(ModalBox))};