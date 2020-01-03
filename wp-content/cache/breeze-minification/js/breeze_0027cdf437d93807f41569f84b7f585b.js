
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(X){"use strict";var b={};b.fileapi=void 0!==X("<input type='file'/>").get(0).files,b.formdata=void 0!==window.FormData;var C=!!X.fn.prop;function r(e){var t=e.data;e.isDefaultPrevented()||(e.preventDefault(),X(e.target).ajaxSubmit(t))}function a(e){var t=e.target,r=X(t);if(!r.is("[type=submit],[type=image]")){var a=r.closest("[type=submit]");if(0===a.length)return;t=a[0]}var n=this;if("image"==(n.clk=t).type)if(void 0!==e.offsetX)n.clk_x=e.offsetX,n.clk_y=e.offsetY;else if("function"==typeof X.fn.offset){var i=r.offset();n.clk_x=e.pageX-i.left,n.clk_y=e.pageY-i.top}else n.clk_x=e.pageX-t.offsetLeft,n.clk_y=e.pageY-t.offsetTop;setTimeout(function(){n.clk=n.clk_x=n.clk_y=null},100)}function _(){if(X.fn.ajaxSubmit.debug){var e="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e)}}X.fn.attr2=function(){if(!C)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},X.fn.ajaxSubmit=function(E){if(!this.length)return _("ajaxSubmit: skipping submit process - no element selected"),this;var M,e,t,F=this;"function"==typeof E?E={success:E}:void 0===E&&(E={}),M=E.type||this.attr2("method"),(t=(t="string"==typeof(e=E.url||this.attr2("action"))?X.trim(e):"")||window.location.href||"")&&(t=(t.match(/^([^#]+)/)||[])[1]),E=X.extend(!0,{url:t,success:X.ajaxSettings.success,type:M||X.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},E);var r={};if(this.trigger("form-pre-serialize",[this,E,r]),r.veto)return _("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(E.beforeSerialize&&!1===E.beforeSerialize(this,E))return _("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var a=E.traditional;void 0===a&&(a=X.ajaxSettings.traditional);var n,O=[],i=this.formToArray(E.semantic,O);if(E.data&&(E.extraData=E.data,n=X.param(E.data,a)),E.beforeSubmit&&!1===E.beforeSubmit(i,this,E))return _("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[i,this,E,r]),r.veto)return _("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var o=X.param(i,a);n&&(o=o?o+"&"+n:n),"GET"==E.type.toUpperCase()?(E.url+=(0<=E.url.indexOf("?")?"&":"?")+o,E.data=null):E.data=o;var s=[];if(E.resetForm&&s.push(function(){F.resetForm()}),E.clearForm&&s.push(function(){F.clearForm(E.includeHidden)}),!E.dataType&&E.target){var u=E.success||function(){};s.push(function(e){var t=E.replaceTarget?"replaceWith":"html";X(E.target)[t](e).each(u,arguments)})}else E.success&&s.push(E.success);if(E.success=function(e,t,r){for(var a=E.context||this,n=0,i=s.length;n<i;n++)s[n].apply(a,[e,t,r||F,F])},E.error){var c=E.error;E.error=function(e,t,r){var a=E.context||this;c.apply(a,[e,t,r,F])}}if(E.complete){var l=E.complete;E.complete=function(e,t){var r=E.context||this;l.apply(r,[e,t,F])}}var f=0<X("input[type=file]:enabled",this).filter(function(){return""!==X(this).val()}).length,m="multipart/form-data",p=F.attr("enctype")==m||F.attr("encoding")==m,d=b.fileapi&&b.formdata;_("fileAPI :"+d);var h,v=(f||p)&&!d;!1!==E.iframe&&(E.iframe||v)?E.closeKeepAlive?X.get(E.closeKeepAlive,function(){h=x(i)}):h=x(i):h=(f||p)&&d?function(e){for(var r=new FormData,t=0;t<e.length;t++)r.append(e[t].name,e[t].value);if(E.extraData){var a=function(e){var t,r,a=X.param(e,E.traditional).split("&"),n=a.length,i=[];for(t=0;t<n;t++)a[t]=a[t].replace(/\+/g," "),r=a[t].split("="),i.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);return i}(E.extraData);for(t=0;t<a.length;t++)a[t]&&r.append(a[t][0],a[t][1])}E.data=null;var n=X.extend(!0,{},X.ajaxSettings,E,{contentType:!1,processData:!1,cache:!1,type:M||"POST"});E.uploadProgress&&(n.xhr=function(){var e=X.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var t=0,r=e.loaded||e.position,a=e.total;e.lengthComputable&&(t=Math.ceil(r/a*100)),E.uploadProgress(e,r,a,t)},!1),e});n.data=null;var i=n.beforeSend;return n.beforeSend=function(e,t){E.formData?t.data=E.formData:t.data=r,i&&i.call(this,e,t)},X.ajax(n)}(i):X.ajax(E),F.removeData("jqxhr").data("jqxhr",h);for(var g=0;g<O.length;g++)O[g]=null;return this.trigger("form-submit-notify",[this,E]),this;function x(e){var t,r,l,f,i,m,p,d,a,n,h,v,o=F[0],g=X.Deferred();if(g.abort=function(e){d.abort(e)},e)for(r=0;r<O.length;r++)t=X(O[r]),C?t.prop("disabled",!1):t.removeAttr("disabled");if((l=X.extend(!0,{},X.ajaxSettings,E)).context=l.context||l,i="jqFormIO"+(new Date).getTime(),l.iframeTarget?(n=(m=X(l.iframeTarget)).attr2("name"))?i=n:m.attr2("name",i):(m=X('<iframe name="'+i+'" src="'+l.iframeSrc+'" />')).css({position:"absolute",top:"-1000px",left:"-1000px"}),p=m[0],d={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";_("aborting upload... "+t),this.aborted=1;try{p.contentWindow.document.execCommand&&p.contentWindow.document.execCommand("Stop")}catch(e){}m.attr("src",l.iframeSrc),d.error=t,l.error&&l.error.call(l.context,d,t,e),f&&X.event.trigger("ajaxError",[d,l,t]),l.complete&&l.complete.call(l.context,d,t)}},(f=l.global)&&0==X.active++&&X.event.trigger("ajaxStart"),f&&X.event.trigger("ajaxSend",[d,l]),l.beforeSend&&!1===l.beforeSend.call(l.context,d,l))return l.global&&X.active--,g.reject(),g;if(d.aborted)return g.reject(),g;(a=o.clk)&&(n=a.name)&&!a.disabled&&(l.extraData=l.extraData||{},l.extraData[n]=a.value,"image"==a.type&&(l.extraData[n+".x"]=o.clk_x,l.extraData[n+".y"]=o.clk_y));var x=1,b=2;function y(t){var r=null;try{t.contentWindow&&(r=t.contentWindow.document)}catch(e){_("cannot get iframe.contentWindow document: "+e)}if(r)return r;try{r=t.contentDocument?t.contentDocument:t.document}catch(e){_("cannot get iframe.contentDocument: "+e),r=t.document}return r}var s=X("meta[name=csrf-token]").attr("content"),u=X("meta[name=csrf-param]").attr("content");function c(){var e=F.attr2("target"),t=F.attr2("action"),r=F.attr("enctype")||F.attr("encoding")||"multipart/form-data";o.setAttribute("target",i),M&&!/post/i.test(M)||o.setAttribute("method","POST"),t!=l.url&&o.setAttribute("action",l.url),l.skipEncodingOverride||M&&!/post/i.test(M)||F.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),l.timeout&&(v=setTimeout(function(){h=!0,D(x)},l.timeout));var a=[];try{if(l.extraData)for(var n in l.extraData)l.extraData.hasOwnProperty(n)&&(X.isPlainObject(l.extraData[n])&&l.extraData[n].hasOwnProperty("name")&&l.extraData[n].hasOwnProperty("value")?a.push(X('<input type="hidden" name="'+l.extraData[n].name+'">').val(l.extraData[n].value).appendTo(o)[0]):a.push(X('<input type="hidden" name="'+n+'">').val(l.extraData[n]).appendTo(o)[0]));l.iframeTarget||m.appendTo("body"),p.attachEvent?p.attachEvent("onload",D):p.addEventListener("load",D,!1),setTimeout(function e(){try{var t=y(p).readyState;_("state = "+t),t&&"uninitialized"==t.toLowerCase()&&setTimeout(e,50)}catch(e){_("Server abort: ",e," (",e.name,")"),D(b),v&&clearTimeout(v),v=void 0}},15);try{o.submit()}catch(e){document.createElement("form").submit.apply(o)}}finally{o.setAttribute("action",t),o.setAttribute("enctype",r),e?o.setAttribute("target",e):F.removeAttr("target"),X(a).remove()}}u&&s&&(l.extraData=l.extraData||{},l.extraData[u]=s),l.forceSync?c():setTimeout(c,10);var T,j,w,S=50;function D(e){if(!d.aborted&&!w){if((j=y(p))||(_("cannot access response document"),e=b),e===x&&d)return d.abort("timeout"),void g.reject(d,"timeout");if(e==b&&d)return d.abort("server abort"),void g.reject(d,"error","server abort");if(j&&j.location.href!=l.iframeSrc||h){p.detachEvent?p.detachEvent("onload",D):p.removeEventListener("load",D,!1);var t,r="success";try{if(h)throw"timeout";var a="xml"==l.dataType||j.XMLDocument||X.isXMLDoc(j);if(_("isXml="+a),!a&&window.opera&&(null===j.body||!j.body.innerHTML)&&--S)return _("requeing onLoad callback, DOM not available"),void setTimeout(D,250);var n=j.body?j.body:j.documentElement;d.responseText=n?n.innerHTML:null,d.responseXML=j.XMLDocument?j.XMLDocument:j,a&&(l.dataType="xml"),d.getResponseHeader=function(e){return{"content-type":l.dataType}[e.toLowerCase()]},n&&(d.status=Number(n.getAttribute("status"))||d.status,d.statusText=n.getAttribute("statusText")||d.statusText);var i=(l.dataType||"").toLowerCase(),o=/(json|script|text)/.test(i);if(o||l.textarea){var s=j.getElementsByTagName("textarea")[0];if(s)d.responseText=s.value,d.status=Number(s.getAttribute("status"))||d.status,d.statusText=s.getAttribute("statusText")||d.statusText;else if(o){var u=j.getElementsByTagName("pre")[0],c=j.getElementsByTagName("body")[0];u?d.responseText=u.textContent?u.textContent:u.innerText:c&&(d.responseText=c.textContent?c.textContent:c.innerText)}}else"xml"==i&&!d.responseXML&&d.responseText&&(d.responseXML=k(d.responseText));try{T=L(d,i,l)}catch(e){r="parsererror",d.error=t=e||r}}catch(e){_("error caught: ",e),r="error",d.error=t=e||r}d.aborted&&(_("upload aborted"),r=null),d.status&&(r=200<=d.status&&d.status<300||304===d.status?"success":"error"),"success"===r?(l.success&&l.success.call(l.context,T,"success",d),g.resolve(d.responseText,"success",d),f&&X.event.trigger("ajaxSuccess",[d,l])):r&&(void 0===t&&(t=d.statusText),l.error&&l.error.call(l.context,d,r,t),g.reject(d,"error",t),f&&X.event.trigger("ajaxError",[d,l,t])),f&&X.event.trigger("ajaxComplete",[d,l]),f&&!--X.active&&X.event.trigger("ajaxStop"),l.complete&&l.complete.call(l.context,d,r),w=!0,l.timeout&&clearTimeout(v),setTimeout(function(){l.iframeTarget?m.attr("src",l.iframeSrc):m.remove(),d.responseXML=null},100)}}}var k=X.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},A=X.parseJSON||function(e){return window.eval("("+e+")")},L=function(e,t,r){var a=e.getResponseHeader("content-type")||"",n="xml"===t||!t&&0<=a.indexOf("xml"),i=n?e.responseXML:e.responseText;return n&&"parsererror"===i.documentElement.nodeName&&X.error&&X.error("parsererror"),r&&r.dataFilter&&(i=r.dataFilter(i,t)),"string"==typeof i&&("json"===t||!t&&0<=a.indexOf("json")?i=A(i):("script"===t||!t&&0<=a.indexOf("javascript"))&&X.globalEval(i)),i};return g}},X.fn.ajaxForm=function(e){if((e=e||{}).delegation=e.delegation&&X.isFunction(X.fn.on),!e.delegation&&0===this.length){var t={s:this.selector,c:this.context};return!X.isReady&&t.s?(_("DOM not ready, queuing ajaxForm"),X(function(){X(t.s,t.c).ajaxForm(e)})):_("terminating; zero elements found by selector"+(X.isReady?"":" (DOM not ready)")),this}return e.delegation?(X(document).off("submit.form-plugin",this.selector,r).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,e,r).on("click.form-plugin",this.selector,e,a),this):this.ajaxFormUnbind().bind("submit.form-plugin",e,r).bind("click.form-plugin",e,a)},X.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},X.fn.formToArray=function(e,t){var r=[];if(0===this.length)return r;var a,n,i,o,s,u,c,l,f=this[0],m=this.attr("id"),p=e?f.getElementsByTagName("*"):f.elements;if(p&&!/MSIE [678]/.test(navigator.userAgent)&&(p=X(p).get()),m&&(a=X(':input[form="'+m+'"]').get()).length&&(p=(p||[]).concat(a)),!p||!p.length)return r;for(n=0,c=p.length;n<c;n++)if((o=(u=p[n]).name)&&!u.disabled)if(e&&f.clk&&"image"==u.type)f.clk==u&&(r.push({name:o,value:X(u).val(),type:u.type}),r.push({name:o+".x",value:f.clk_x},{name:o+".y",value:f.clk_y}));else if((s=X.fieldValue(u,!0))&&s.constructor==Array)for(t&&t.push(u),i=0,l=s.length;i<l;i++)r.push({name:o,value:s[i]});else if(b.fileapi&&"file"==u.type){t&&t.push(u);var d=u.files;if(d.length)for(i=0;i<d.length;i++)r.push({name:o,value:d[i],type:u.type});else r.push({name:o,value:"",type:u.type})}else null!=s&&(t&&t.push(u),r.push({name:o,value:s,type:u.type,required:u.required}));if(!e&&f.clk){var h=X(f.clk),v=h[0];(o=v.name)&&!v.disabled&&"image"==v.type&&(r.push({name:o,value:h.val()}),r.push({name:o+".x",value:f.clk_x},{name:o+".y",value:f.clk_y}))}return r},X.fn.formSerialize=function(e){return X.param(this.formToArray(e))},X.fn.fieldSerialize=function(n){var i=[];return this.each(function(){var e=this.name;if(e){var t=X.fieldValue(this,n);if(t&&t.constructor==Array)for(var r=0,a=t.length;r<a;r++)i.push({name:e,value:t[r]});else null!=t&&i.push({name:this.name,value:t})}}),X.param(i)},X.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var n=this[r],i=X.fieldValue(n,e);null==i||i.constructor==Array&&!i.length||(i.constructor==Array?X.merge(t,i):t.push(i))}return t},X.fieldValue=function(e,t){var r=e.name,a=e.type,n=e.tagName.toLowerCase();if(void 0===t&&(t=!0),t&&(!r||e.disabled||"reset"==a||"button"==a||("checkbox"==a||"radio"==a)&&!e.checked||("submit"==a||"image"==a)&&e.form&&e.form.clk!=e||"select"==n&&-1==e.selectedIndex))return null;if("select"==n){var i=e.selectedIndex;if(i<0)return null;for(var o=[],s=e.options,u="select-one"==a,c=u?i+1:s.length,l=u?i:0;l<c;l++){var f=s[l];if(f.selected){var m=f.value;if(m||(m=f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value),u)return m;o.push(m)}}return o}return X(e).val()},X.fn.clearForm=function(e){return this.each(function(){X("input,select,textarea",this).clearFields(e)})},X.fn.clearFields=X.fn.clearInputs=function(r){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();a.test(e)||"textarea"==t?this.value="":"checkbox"==e||"radio"==e?this.checked=!1:"select"==t?this.selectedIndex=-1:"file"==e?/MSIE/.test(navigator.userAgent)?X(this).replaceWith(X(this).clone(!0)):X(this).val(""):r&&(!0===r&&/hidden/.test(e)||"string"==typeof r&&X(this).is(r))&&(this.value="")})},X.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},X.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},X.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e=this.type;if("checkbox"==e||"radio"==e)this.checked=r;else if("option"==this.tagName.toLowerCase()){var t=X(this).parent("select");r&&t[0]&&"select-one"==t[0].type&&t.find("option").selected(!1),this.selected=r}})},X.fn.ajaxSubmit.debug=!1});