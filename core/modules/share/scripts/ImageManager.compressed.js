ScriptLoader.load("Form","ModalBox");var ImageManager=new Class({Extends:Form,initialize:function(a){this.parent(a);this.image={};this.imageMargins=["margin-left","margin-right","margin-top","margin-bottom"];$("filename").disabled=true;var b=ModalBox.getExtraData();if(b!=null){this.image=b;this.updateForm()}},openImageLib:function(){ModalBox.open({url:this.singlePath+"file-library/image/",onClose:function(a){if(a){this.image=a;this.updateForm()}window.focus()}.bind(this)})},updateForm:function(){if(this.image.insertThumbnail){$("filename").value=this.image.thumbnail;$("thumbnail").src=this.image.filename}else{$("filename").value=this.image.upl_path;$("thumbnail").src=this.image.upl_data.thumb}$("width").value=this.image.upl_data.width||0;$("height").value=this.image.upl_data.height||0;$("align").value=$("align").value||this.image.align||"";this.imageMargins.each(function(a){$(a).value=$(a).value||this.image.propertyName||"0"},this);$("alt").value=$("alt").value||this.image.upl_name||""},insertImage:function(){if($("filename").value){this.image.filename=$("filename").value;this.image.width=parseInt($("width").value)||"";this.image.height=parseInt($("height").value)||"";this.image.align=$("align").value||"";this.imageMargins.each(function(a){this.image[a]=parseInt($(a).value)||0},this);this.image.alt=$("alt").value;this.image.thumbnail=$("thumbnail").src;ModalBox.setReturnValue(this.image)}this.close()}});