
/*!
* eForm - WordPress Form Builder
*
* Autogenerated by Grunt on: 2019-09-19
* @version 3.8.0
* @author Swashata Ghosh (WPQuark)
* @license GPL-3.0
*/
/**
 * Inline Form Validation Engine 2.6.2, jQuery plugin
 *
 * Copyright(c) 2010, Cedric Dugas
 * http://www.position-absolute.com
 *
 * 2.0 Rewrite by Olivier Refalo
 * http://www.crionics.com
 *
 * Form validation engine allowing custom regex rules to be added.
 * @license    MIT
 * Licensed under the MIT License
 *
 * This file is heavily modified by Swashata
 */
!function(e){"use strict";var t={init:function(a){return this.data("jqv")&&null!=this.data("jqv")||(a=t._saveOptions(this,a),e(document).on("click",".formError",function(){e(this).fadeOut(150,function(){e(this).parent(".formErrorOuter").remove(),e(this).remove()})})),this},attach:function(a){var i;return(i=a?t._saveOptions(this,a):this.data("jqv")).validateAttribute=this.find("[data-validation-engine*=validate]").length?"data-validation-engine":"class",i.binded&&(this.on(i.validationEventTrigger,"["+i.validateAttribute+"*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)",t._onFieldEvent),this.on("click","["+i.validateAttribute+"*=validate][type=checkbox],["+i.validateAttribute+"*=validate][type=radio]",t._onFieldEvent),this.on(i.validationEventTrigger,"["+i.validateAttribute+"*=validate][class*=datepicker]",{delay:300},t._onFieldEvent)),i.autoPositionUpdate&&e(window).on("resize",{noAnimation:!0,formElem:this},t.updatePromptsPosition),this.on("click","a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']",t._submitButtonClick),this.removeData("jqv_submitButton"),i.bindOnSubmit&&this.on("submit",t._onSubmitEvent),this},detach:function(){var a=this.data("jqv");return this.find("["+a.validateAttribute+"*=validate]").not("[type=checkbox]").off(a.validationEventTrigger,t._onFieldEvent),this.find("["+a.validateAttribute+"*=validate][type=checkbox],[class*=validate][type=radio]").off("click",t._onFieldEvent),a.bindOnSubmit&&this.off("submit",t._onSubmitEvent),this.removeData("jqv"),this.off("click","a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']",t._submitButtonClick),this.removeData("jqv_submitButton"),a.autoPositionUpdate&&e(window).off("resize",t.updatePromptsPosition),this},validate:function(){var a=e(this),i=null;if(a.is("form")||a.hasClass("validationEngineContainer")){if(a.hasClass("validating"))return!1;a.addClass("validating");var r=a.data("jqv");i=t._validateFields(this);setTimeout(function(){a.removeClass("validating")},100),i&&r.onSuccess?r.onSuccess():!i&&r.onFailure&&r.onFailure()}else if(a.is("form")||a.hasClass("validationEngineContainer"))a.removeClass("validating");else{var o=a.closest("form, .validationEngineContainer");r=o.data("jqv")?o.data("jqv"):e.validationEngine.defaults;!(i=t._validateField(a,r))&&r.onFieldSuccess?r.onFieldSuccess(a):r.onFieldFailure&&i&&r.onFieldFailure(a)}return r.onValidationComplete?!!r.onValidationComplete(o,i):i},validateSilent:function(){var a=e(this),i=null;if(a.is("form")||a.hasClass("validationEngineContainer")){if(a.hasClass("validating"))return!1;a.addClass("validating");var r=a.data("jqv");i=t._validateFields(this,!0);setTimeout(function(){a.removeClass("validating")},100)}else if(a.is("form")||a.hasClass("validationEngineContainer"))a.removeClass("validating");else{var o=a.closest("form, .validationEngineContainer");r=o.data("jqv")?o.data("jqv"):e.validationEngine.defaults,i=t._validateField(a,r,void 0,!0)}return r.onValidationComplete?!!r.onValidationComplete(o,i):i},updatePromptsPosition:function(a){if(a&&this==window)var i=a.data.formElem,r=a.data.noAnimation;else i=e(this.closest("form, .validationEngineContainer"));var o=i.data("jqv");return i.find("["+o.validateAttribute+"*=validate]").not(":disabled").each(function(){var a=e(this);o.prettySelect&&a.is(":hidden")&&(a=i.find("#"+o.usePrefix+a.attr("id")+o.useSuffix));var s=t._getPrompt(a),n=e(s).find(".formErrorContent").html();s&&t._updatePrompt(a,e(s),n,void 0,!1,o,r)}),this},showPrompt:function(e,a,i,r){var o=this.closest("form, .validationEngineContainer").data("jqv");return o||(o=t._saveOptions(this,o)),i&&(o.promptPosition=i),o.showArrow=1==r,t._showPrompt(this,e,a,!1,o),this},hide:function(){var a,i=e(this).closest("form, .validationEngineContainer").data("jqv"),r=i&&i.fadeDuration?i.fadeDuration:.3;return a=e(this).is("form")||e(this).hasClass("validationEngineContainer")?"parentForm"+t._getClassName(e(this).attr("id")):t._getClassName(e(this).attr("id"))+"formError",e("."+a).fadeTo(r,.3,function(){e(this).parent(".formErrorOuter").remove(),e(this).remove()}),this},hideAll:function(){var t=this.data("jqv"),a=t?t.fadeDuration:300;return e(".formError").fadeTo(a,300,function(){e(this).parent(".formErrorOuter").remove(),e(this).remove()}),this},_onFieldEvent:function(a){var i=e(this),r=i.closest("form, .validationEngineContainer").data("jqv");r.eventTrigger="field",window.setTimeout(function(){var e=t._validateField(i,r);!e&&r.onFieldSuccess?r.onFieldSuccess(i):e&&r.onFieldFailure&&r.onFieldFailure(i)},a.data?a.data.delay:0)},_onSubmitEvent:function(){var a=e(this),i=a.data("jqv");if(a.data("jqv_submitButton")){var r=e("#"+a.data("jqv_submitButton"));if(r&&r.length>0&&(r.hasClass("validate-skip")||"true"==r.attr("data-validation-engine-skip")))return!0}i.eventTrigger="submit";var o=t._validateFields(a);return o&&i.ajaxFormValidation?(t._validateFormWithAjax(a,i),!1):i.onValidationComplete?!!i.onValidationComplete(a,o):o},_checkAjaxStatus:function(t){var a=!0;return e.each(t.ajaxValidCache,function(e,t){if(!t)return a=!1,!1}),a},_checkAjaxFieldStatus:function(e,t){return 1==t.ajaxValidCache[e]},_validateFields:function(a,i){void 0===i&&(i=!1);var r=a.data("jqv"),o=!1;a.trigger("jqv.form.validating");var s=null;if(a.find("["+r.validateAttribute+"*=validate]").not(":disabled").each(function(){var n=e(this),l=[];if(e.inArray(n.attr("name"),l)<0){if((o|=t._validateField(n,r,void 0,i))&&null==s&&(n.is(":hidden")&&r.prettySelect?s=n=a.find("#"+r.usePrefix+t._jqSelector(n.attr("id"))+r.useSuffix):(n.data("jqv-prompt-at")instanceof jQuery?n=n.data("jqv-prompt-at"):n.data("jqv-prompt-at")&&(n=e(n.data("jqv-prompt-at"))),s=n)),r.doNotShowAllErrosOnSubmit)return!1;if(l.push(n.attr("name")),1==r.showOneMessage&&o)return!1}}),a.trigger("jqv.form.result",[o]),o){if(r.scroll&&!i){var n=s.offset().top,l=s.offset().left,d=r.promptPosition;if("string"==typeof d&&-1!=d.indexOf(":")&&(d=d.substring(0,d.indexOf(":"))),"bottomRight"!=d&&"bottomLeft"!=d){var u=t._getPrompt(s);u&&(n=u.offset().top)}if(r.scrollOffset&&(n-=r.scrollOffset),r.isOverflown){var c=e(r.overflownDIV);if(!c.length)return!1;n+=c.scrollTop()+-parseInt(c.offset().top)-5,e(r.overflownDIV+":not(:animated)").animate({scrollTop:n},1100,function(){r.focusFirstField&&s.focus()})}else e("html, body").animate({scrollTop:n},1100,function(){r.focusFirstField&&s.focus()}),e("html, body").animate({scrollLeft:l},1100)}else r.focusFirstField&&!i&&s.focus();return!1}return!0},_validateFormWithAjax:function(a,i){var r=a.serialize(),o=i.ajaxFormValidationMethod?i.ajaxFormValidationMethod:"GET",s=i.ajaxFormValidationURL?i.ajaxFormValidationURL:a.attr("action"),n=i.dataType?i.dataType:"json";e.ajax({type:o,url:s,cache:!1,dataType:n,data:r,form:a,methods:t,options:i,beforeSend:function(){return i.onBeforeAjaxFormValidation(a,i)},error:function(e,a){i.onFailure?i.onFailure(e,a):t._ajaxError(e,a)},success:function(r){if("json"==n&&!0!==r){for(var o=!1,s=0;s<r.length;s++){var l=r[s],d=l[0],u=e(e("#"+d)[0]);if(1==u.length){var c=l[2];if(1==l[1])if(""!=c&&c){if(i.allrules[c])(f=i.allrules[c].alertTextOk)&&(c=f);i.showPrompts&&t._showPrompt(u,c,"pass",!1,i,!0)}else t._closePrompt(u);else{var f;if(o|=!0,i.allrules[c])(f=i.allrules[c].alertText)&&(c=f);i.showPrompts&&t._showPrompt(u,c,"",!1,i,!0)}}}i.onAjaxFormComplete(!o,a,r,i)}else i.onAjaxFormComplete(!0,a,r,i)}})},_validateField:function(a,i,r,o){if(void 0==o&&(o=!1),a.attr("id")||(a.attr("id","form-validation-field-"+e.validationEngine.fieldIdCounter),++e.validationEngine.fieldIdCounter),!i.validateNonVisibleFields&&(a.is(":hidden")&&!i.prettySelect||a.parent().is(":hidden")))return!1;var s=a.attr(i.validateAttribute),n=/validate\[(.*)\]/.exec(s);if(!n)return!1;var l=n[1].split(/\[|,|\]/),d=a.attr("name"),u="",c="",f=!1,v=!1;i.isError=!1,i.showArrow=!0,i.maxErrorsPerField>0&&(v=!0);for(var p=e(a.closest("form, .validationEngineContainer")),m=0;m<l.length;m++)l[m]=l[m].replace(" ",""),""===l[m]&&delete l[m];m=0;for(var g=0;m<l.length;m++){if(v&&g>=i.maxErrorsPerField){if(!f){var h=e.inArray("required",l);f=-1!=h&&h>=m}break}var x=void 0;switch(l[m]){case"required":f=!0,x=t._getErrorMessage(p,a,l[m],l,m,i,t._required);break;case"custom":x=t._getErrorMessage(p,a,l[m],l,m,i,t._custom);break;case"groupRequired":var _="["+i.validateAttribute+"*="+l[m+1]+"]",C=p.find(_).eq(0);C[0]!=a[0]&&(t._validateField(C,i,r),i.showArrow=!0),(x=t._getErrorMessage(p,a,l[m],l,m,i,t._groupRequired))&&(f=!0),i.showArrow=!1;break;case"ajax":(x=t._ajax(a,l,m,i))&&(c="load");break;case"minSize":x=t._getErrorMessage(p,a,l[m],l,m,i,t._minSize);break;case"maxSize":x=t._getErrorMessage(p,a,l[m],l,m,i,t._maxSize);break;case"min":x=t._getErrorMessage(p,a,l[m],l,m,i,t._min);break;case"max":x=t._getErrorMessage(p,a,l[m],l,m,i,t._max);break;case"past":x=t._getErrorMessage(p,a,l[m],l,m,i,t._past);break;case"future":x=t._getErrorMessage(p,a,l[m],l,m,i,t._future);break;case"dateRange":_="["+i.validateAttribute+"*="+l[m+1]+"]";i.firstOfGroup=p.find(_).eq(0),i.secondOfGroup=p.find(_).eq(1),(i.firstOfGroup[0].value||i.secondOfGroup[0].value)&&(x=t._getErrorMessage(p,a,l[m],l,m,i,t._dateRange)),x&&(f=!0),i.showArrow=!1;break;case"dateTimeRange":_="["+i.validateAttribute+"*="+l[m+1]+"]";i.firstOfGroup=p.find(_).eq(0),i.secondOfGroup=p.find(_).eq(1),(i.firstOfGroup[0].value||i.secondOfGroup[0].value)&&(x=t._getErrorMessage(p,a,l[m],l,m,i,t._dateTimeRange)),x&&(f=!0),i.showArrow=!1;break;case"maxCheckbox":a=e(p.find("input[name='"+d+"']")),x=t._getErrorMessage(p,a,l[m],l,m,i,t._maxCheckbox);break;case"minCheckbox":a=e(p.find("input[name='"+d+"']")),x=t._getErrorMessage(p,a,l[m],l,m,i,t._minCheckbox);break;case"equals":x=t._getErrorMessage(p,a,l[m],l,m,i,t._equals);break;case"funcCall":x=t._getErrorMessage(p,a,l[m],l,m,i,t._funcCall);break;case"creditCard":x=t._getErrorMessage(p,a,l[m],l,m,i,t._creditCard);break;case"condRequired":void 0!==(x=t._getErrorMessage(p,a,l[m],l,m,i,t._condRequired))&&(f=!0)}var b=!1;if("object"==typeof x)switch(x.status){case"_break":b=!0;break;case"_error":x=x.message;break;case"_error_no_prompt":return!0}if(b)break;"string"==typeof x&&(u+='<span class="error-message">'+x+"</span><br/>",i.isError=!0,g++)}!f&&!a.val()&&a.val().length<1&&e.inArray("equals",l)<0&&(i.isError=!1);var E=a.prop("type"),T=a.data("promptPosition")||i.promptPosition;("radio"==E||"checkbox"==E)&&p.find("input[name='"+d+"']").length>1&&(a=e("inline"===T?p.find("input[name='"+d+"'][type!=hidden]:last"):p.find("input[name='"+d+"'][type!=hidden]:first")),i.showArrow=!1),a.is(":hidden")&&i.prettySelect&&(a=p.find("#"+i.usePrefix+t._jqSelector(a.attr("id"))+i.useSuffix)),o||(i.isError&&i.showPrompts?t._showPrompt(a,u,c,!1,i):t._closePrompt(a)),a.trigger("jqv.field.result",[a,i.isError,u]);var F=e.inArray(a[0],i.InvalidFields);return-1==F?i.isError&&i.InvalidFields.push(a[0]):i.isError||i.InvalidFields.splice(F,1),t._handleStatusCssClasses(a,i),o||(i.isError&&i.onFieldFailure&&i.onFieldFailure(a),!i.isError&&i.onFieldSuccess&&i.onFieldSuccess(a)),i.isError},_handleStatusCssClasses:function(e,t){t.addSuccessCssClassToField&&e.removeClass(t.addSuccessCssClassToField),t.addFailureCssClassToField&&e.removeClass(t.addFailureCssClassToField),t.addSuccessCssClassToField&&!t.isError&&e.addClass(t.addSuccessCssClassToField),t.addFailureCssClassToField&&t.isError&&e.addClass(t.addFailureCssClassToField)},_getErrorMessage:function(a,i,r,o,s,n,l){var d=jQuery.inArray(r,o);"custom"!==r&&"funcCall"!==r||(r=r+"["+o[d+1]+"]",delete o[d]);var u,c=r,f=(i.attr("data-validation-engine")?i.attr("data-validation-engine"):i.attr("class")).split(" ");if(void 0!=(u="future"==r||"past"==r||"maxCheckbox"==r||"minCheckbox"==r?l(a,i,o,s,n):l(i,o,s,n))){var v=t._getCustomErrorMessage(e(i),f,c,n);v&&(u=v)}return u},_getCustomErrorMessage:function(e,a,i,r){var o=!1,s=/^custom\[.*\]$/.test(i)?t._validityProp.custom:t._validityProp[i];if(void 0!=s&&void 0!=(o=e.attr("data-errormessage-"+s)))return o;if(void 0!=(o=e.attr("data-errormessage")))return o;var n="#"+e.attr("id");if(void 0!==r.custom_error_messages[n]&&void 0!==r.custom_error_messages[n][i])o=r.custom_error_messages[n][i].message;else if(a.length>0)for(var l=0;l<a.length&&a.length>0;l++){var d="."+a[l];if(void 0!==r.custom_error_messages[d]&&void 0!==r.custom_error_messages[d][i]){o=r.custom_error_messages[d][i].message;break}}return o||void 0===r.custom_error_messages[i]||void 0===r.custom_error_messages[i].message||(o=r.custom_error_messages[i].message),o},_validityProp:{required:"value-missing",custom:"custom-error",groupRequired:"value-missing",ajax:"custom-error",minSize:"range-underflow",maxSize:"range-overflow",min:"range-underflow",max:"range-overflow",past:"type-mismatch",future:"type-mismatch",dateRange:"type-mismatch",dateTimeRange:"type-mismatch",maxCheckbox:"range-overflow",minCheckbox:"range-underflow",equals:"pattern-mismatch",funcCall:"custom-error",creditCard:"pattern-mismatch",condRequired:"value-missing"},_required:function(t,a,i,r,o){switch(t.prop("type")){case"text":case"password":case"textarea":case"file":case"select-one":case"select-multiple":default:var s=e.trim(t.val()),n=e.trim(t.attr("data-validation-placeholder")),l=e.trim(t.attr("placeholder"));if(!s||n&&s==n||l&&s==l)return r.allrules[a[i]].alertText;break;case"radio":case"checkbox":if(o){if(!t.attr("checked"))return r.allrules[a[i]].alertTextCheckboxMultiple;break}var d=t.closest("form, .validationEngineContainer"),u=t.attr("name");if(0==d.find("input[name='"+u+"']:checked").length)return 1==d.find("input[name='"+u+"']:visible").length?r.allrules[a[i]].alertTextCheckboxe:r.allrules[a[i]].alertTextCheckboxMultiple}},_groupRequired:function(a,i,r,o){var s="["+o.validateAttribute+"*="+i[r+1]+"]",n=!1;if(a.closest("form, .validationEngineContainer").find(s).each(function(){if(!t._required(e(this),i,r,o))return n=!0,!1}),!n)return o.allrules[i[r]].alertText},_custom:function(e,t,a,i){var r,o=t[a+1],s=i.allrules[o];if(s)if(s.regex){var n=s.regex;if(!n)return void alert("jqv:custom regex not found - "+o);if(!new RegExp(n).test(e.val()))return i.allrules[o].alertText}else{if(!s.func)return void alert("jqv:custom type not allowed "+o);if("function"!=typeof(r=s.func))return void alert("jqv:custom parameter 'function' is no function - "+o);if(!r(e,t,a,i))return i.allrules[o].alertText}else alert("jqv:custom rule not found - "+o)},_funcCall:function(e,t,a,i){var r,o=t[a+1];if(o.indexOf(".")>-1){for(var s=o.split("."),n=window;s.length;)n=n[s.shift()];r=n}else r=window[o]||i.customFunctions[o];if("function"==typeof r)return r(e,t,a,i)},_equals:function(t,a,i,r){var o=a[i+1];if(t.val()!=e("#"+o).val())return r.allrules.equals.alertText},_maxSize:function(e,t,a,i){var r=t[a+1];if(e.val().length>r){var o=i.allrules.maxSize;return o.alertText+r+o.alertText2}},_minSize:function(e,t,a,i){var r=t[a+1];if(e.val().length<r){var o=i.allrules.minSize;return o.alertText+r+o.alertText2}},_min:function(e,t,a,i){var r=parseFloat(t[a+1]);if(parseFloat(e.val())<r){var o=i.allrules.min;return o.alertText2?o.alertText+r+o.alertText2:o.alertText+r}},_max:function(e,t,a,i){var r=parseFloat(t[a+1]);if(parseFloat(e.val())>r){var o=i.allrules.max;return o.alertText2?o.alertText+r+o.alertText2:o.alertText+r}},_past:function(a,i,r,o,s){var n,l=r[o+1],d=e(a.find("#"+l.replace(/^#+/,"")));if("now"==l.toLowerCase())n=new Date;else if(void 0!=d.val()){if(d.is(":disabled"))return;n=t._parseDate(d.val())}else n=t._parseDate(l);if(t._parseDate(i.val())>n){var u=s.allrules.past;return u.alertText2?u.alertText+t._dateToString(n)+u.alertText2:u.alertText+t._dateToString(n)}},_future:function(a,i,r,o,s){var n,l=r[o+1],d=e(a.find("#"+l.replace(/^#+/,"")));if("now"==l.toLowerCase())n=new Date;else if(void 0!=d.val()){if(d.is(":disabled"))return;n=t._parseDate(d.val())}else n=t._parseDate(l);if(t._parseDate(i.val())<n){var u=s.allrules.future;return u.alertText2?u.alertText+t._dateToString(n)+u.alertText2:u.alertText+t._dateToString(n)}},_isDate:function(e){return new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/).test(e)},_isDateTime:function(e){return new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/).test(e)},_dateCompare:function(e,t){return new Date(e.toString())<new Date(t.toString())},_dateRange:function(e,a,i,r){return!r.firstOfGroup[0].value&&r.secondOfGroup[0].value||r.firstOfGroup[0].value&&!r.secondOfGroup[0].value?r.allrules[a[i]].alertText+r.allrules[a[i]].alertText2:t._isDate(r.firstOfGroup[0].value)&&t._isDate(r.secondOfGroup[0].value)&&t._dateCompare(r.firstOfGroup[0].value,r.secondOfGroup[0].value)?void 0:r.allrules[a[i]].alertText+r.allrules[a[i]].alertText2},_dateTimeRange:function(e,a,i,r){return!r.firstOfGroup[0].value&&r.secondOfGroup[0].value||r.firstOfGroup[0].value&&!r.secondOfGroup[0].value?r.allrules[a[i]].alertText+r.allrules[a[i]].alertText2:t._isDateTime(r.firstOfGroup[0].value)&&t._isDateTime(r.secondOfGroup[0].value)&&t._dateCompare(r.firstOfGroup[0].value,r.secondOfGroup[0].value)?void 0:r.allrules[a[i]].alertText+r.allrules[a[i]].alertText2},_maxCheckbox:function(e,t,a,i,r){var o=a[i+1],s=t.attr("name");if(e.find("input[name='"+s+"']:checked").length>o)return r.showArrow=!1,r.allrules.maxCheckbox.alertText2?r.allrules.maxCheckbox.alertText+" "+o+" "+r.allrules.maxCheckbox.alertText2:r.allrules.maxCheckbox.alertText},_minCheckbox:function(e,t,a,i,r){var o=a[i+1],s=t.attr("name");if(e.find("input[name='"+s+"']:checked").length<o)return r.showArrow=!1,r.allrules.minCheckbox.alertText+" "+o+" "+r.allrules.minCheckbox.alertText2},_creditCard:function(e,t,a,i){var r=!1,o=e.val().replace(/ +/g,"").replace(/-+/g,""),s=o.length;if(s>=14&&s<=16&&parseInt(o)>0){var n,l=0,d=(a=s-1,1),u=new String;do{n=parseInt(o.charAt(a)),u+=d++%2==0?2*n:n}while(--a>=0);for(a=0;a<u.length;a++)l+=parseInt(u.charAt(a));r=l%10==0}if(!r)return i.allrules.creditCard.alertText},_ajax:function(a,i,r,o){var s=i[r+1],n=o.allrules[s],l=n.extraData,d=n.extraDataDynamic,u={fieldId:a.attr("id"),fieldValue:a.val()};if("object"==typeof l)e.extend(u,l);else if("string"==typeof l){var c=l.split("&");for(r=0;r<c.length;r++){var f=c[r].split("=");f[0]&&f[0]&&(u[f[0]]=f[1])}}if(d){var v=String(d).split(",");for(r=0;r<v.length;r++){var p=v[r];if(e(p).length){var m=a.closest("form, .validationEngineContainer").find(p).val();p.replace("#",""),escape(m);u[p.replace("#","")]=m}}}if("field"==o.eventTrigger&&delete o.ajaxValidCache[a.attr("id")],!o.isError&&!t._checkAjaxFieldStatus(a.attr("id"),o))return e.ajax({type:o.ajaxFormValidationMethod,url:n.url,cache:!1,dataType:"json",data:u,field:a,rule:n,methods:t,options:o,beforeSend:function(){},error:function(e,a){o.onFailure?o.onFailure(e,a):t._ajaxError(e,a)},success:function(i){var r=i[0],s=e("#"+r).eq(0);if(1==s.length){var l=i[1],d=i[2];if(l){if(o.ajaxValidCache[r]=!0,d){if(o.allrules[d])(u=o.allrules[d].alertTextOk)&&(d=u)}else d=n.alertTextOk;o.showPrompts&&(d?t._showPrompt(s,d,"pass",!0,o):t._closePrompt(s)),"submit"==o.eventTrigger&&a.closest("form").submit()}else{var u;if(o.ajaxValidCache[r]=!1,o.isError=!0,d){if(o.allrules[d])(u=o.allrules[d].alertText)&&(d=u)}else d=n.alertText;o.showPrompts&&t._showPrompt(s,d,"",!0,o)}}s.trigger("jqv.field.result",[s,o.isError,d])}}),n.alertTextLoad},_ajaxError:function(e,t){0==e.status&&null==t?alert("The page is not served from a server! ajax call failed"):"undefined"!=typeof console&&console.log("Ajax error: "+e.status+" "+t)},_dateToString:function(e){return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},_parseDate:function(e){var t=e.split("-");return t==e&&(t=e.split("/")),t==e?(t=e.split("."),new Date(t[2],t[1]-1,t[0])):new Date(t[0],t[1]-1,t[2])},_showPrompt:function(a,i,r,o,s,n){a.data("jqv-prompt-at")instanceof jQuery?a=a.data("jqv-prompt-at"):a.data("jqv-prompt-at")&&(a=e(a.data("jqv-prompt-at")));var l=t._getPrompt(a);n&&(l=!1),e.trim(i)&&(l?t._updatePrompt(a,l,i,r,o,s):t._buildPrompt(a,i,r,o,s))},_buildPrompt:function(a,i,r,o,s){var n=e("<div>");switch(n.addClass(t._getClassName(a.attr("id"))+"formError"),n.addClass("parentForm"+t._getClassName(a.closest("form, .validationEngineContainer").attr("id"))),n.addClass("formError"),r){case"pass":n.addClass("greenPopup");break;case"load":n.addClass("blackPopup")}o&&n.addClass("ajaxed");e("<div>").addClass("formErrorContent").html(i).appendTo(n);var l=a.data("promptPosition")||s.promptPosition;if(s.showArrow){var d=e("<div>").addClass("formErrorArrow");if("string"==typeof l)-1!=(f=l.indexOf(":"))&&(l=l.substring(0,f));switch(l){case"bottomLeft":case"bottomRight":n.find(".formErrorContent").before(d),d.addClass("formErrorArrowBottom").html('<div class="line1">\x3c!-- --\x3e</div><div class="line2">\x3c!-- --\x3e</div><div class="line3">\x3c!-- --\x3e</div><div class="line4">\x3c!-- --\x3e</div><div class="line5">\x3c!-- --\x3e</div><div class="line6">\x3c!-- --\x3e</div><div class="line7">\x3c!-- --\x3e</div><div class="line8">\x3c!-- --\x3e</div><div class="line9">\x3c!-- --\x3e</div><div class="line10">\x3c!-- --\x3e</div>');break;case"topLeft":case"topRight":d.html('<div class="line10">\x3c!-- --\x3e</div><div class="line9">\x3c!-- --\x3e</div><div class="line8">\x3c!-- --\x3e</div><div class="line7">\x3c!-- --\x3e</div><div class="line6">\x3c!-- --\x3e</div><div class="line5">\x3c!-- --\x3e</div><div class="line4">\x3c!-- --\x3e</div><div class="line3">\x3c!-- --\x3e</div><div class="line2">\x3c!-- --\x3e</div><div class="line1">\x3c!-- --\x3e</div>'),n.append(d)}}s.addPromptClass&&n.addClass(s.addPromptClass);var u=a.attr("data-required-class");if(void 0!==u)n.addClass(u);else if(s.prettySelect&&e("#"+a.attr("id")).next().is("select")){var c=e("#"+a.attr("id").substr(s.usePrefix.length).substring(s.useSuffix.length)).attr("data-required-class");void 0!==c&&n.addClass(c)}n.css({opacity:0}),"inline"===l?(n.addClass("inline"),a.closest(".input-field").length?a.closest(".input-field").after(n):a.closest(".ipt_uif_matrix_div_cell").length?a.closest(".ipt_uif_matrix_div_cell").append(n):a.closest(".ipt_uif_question_content").length?n.appendTo(a.closest(".ipt_uif_question_content")):a.closest(".ipt_uif_container").length?a.closest(".ipt_uif_container").find(".ipt_uif_container_inner").before(n):a.closest(".ipt_uif_column_inner").length?n.appendTo(a.closest(".ipt_uif_column_inner")):a.after(n)):a.before(n);var f=t._calculatePosition(a,n,s);return n.css({position:"inline"===l?"relative":"absolute",top:f.callerTopPosition,left:f.callerleftPosition,marginTop:f.marginTopSize,opacity:0}).data("callerField",a),s.autoHidePrompt&&setTimeout(function(){n.animate({opacity:0},function(){n.closest(".formErrorOuter").remove(),n.remove()})},s.autoHideDelay),n.animate({opacity:.87})},_updatePrompt:function(e,a,i,r,o,s,n){if(a){void 0!==r&&("pass"==r?a.addClass("greenPopup"):a.removeClass("greenPopup"),"load"==r?a.addClass("blackPopup"):a.removeClass("blackPopup")),o?a.addClass("ajaxed"):a.removeClass("ajaxed"),a.find(".formErrorContent").html(i);var l=t._calculatePosition(e,a,s),d={top:l.callerTopPosition,left:l.callerleftPosition,marginTop:l.marginTopSize};n?a.css(d):a.animate(d)}},_closePrompt:function(e){var a=t._getPrompt(e);a&&a.fadeTo("fast",0,function(){a.parent(".formErrorOuter").remove(),a.remove()})},closePrompt:function(e){return t._closePrompt(e)},_getPrompt:function(a){var i=e(a).closest("form, .validationEngineContainer").attr("id"),r=t._getClassName(a.attr("id"))+"formError",o=e("."+t._escapeExpression(r)+".parentForm"+t._getClassName(i))[0];if(o)return e(o)},_escapeExpression:function(e){return e.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g,"\\$1")},isRTL:function(t){var a=e(document),i=e("body"),r=t&&t.hasClass("rtl")||t&&"rtl"===(t.attr("dir")||"").toLowerCase()||a.hasClass("rtl")||"rtl"===(a.attr("dir")||"").toLowerCase()||i.hasClass("rtl")||"rtl"===(i.attr("dir")||"").toLowerCase();return Boolean(r)},_calculatePosition:function(e,t,a){var i,r,o,s=e.width(),n=e.position().left,l=e.position().top;e.height();i=r=0,o=-t.height();var d=e.data("promptPosition")||a.promptPosition,u="",c="",f=0,v=0;switch("string"==typeof d&&-1!=d.indexOf(":")&&(u=d.substring(d.indexOf(":")+1),d=d.substring(0,d.indexOf(":")),-1!=u.indexOf(",")&&(c=u.substring(u.indexOf(",")+1),u=u.substring(0,u.indexOf(",")),v=parseInt(c),isNaN(v)&&(v=0)),f=parseInt(u),isNaN(u)&&(u=0)),d){default:case"topRight":r+=n+s-30,i+=l;break;case"topLeft":i+=l,r+=n;break;case"centerRight":i=l+4,o=0,r=n+e.outerWidth(!0)+5;break;case"centerLeft":r=n-(t.width()+2),i=l+4,o=0;break;case"bottomLeft":i=l+e.height()+5,o=0,r=n;break;case"bottomRight":r=n+s-30,i=l+e.height()+5,o=0;break;case"inline":r=0,i=0,o=0}return{callerTopPosition:(i+=v)+"px",callerleftPosition:(r+=f)+"px",marginTopSize:o+"px"}},_saveOptions:function(t,a){if(e.validationEngineLanguage)var i=e.validationEngineLanguage.allRules;else e.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");e.validationEngine.defaults.allrules=i;var r=e.extend(!0,{},e.validationEngine.defaults,a);return t.data("jqv",r),r},_getClassName:function(e){if(e)return e.replace(/:/g,"_").replace(/\./g,"_")},_jqSelector:function(e){return e.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1")},_condRequired:function(e,a,i,r){var o,s;for(o=i+1;o<a.length;o++)if((s=jQuery("#"+a[o]).first()).length&&void 0==t._required(s,["required"],0,r,!0))return t._required(e,["required"],0,r)},_submitButtonClick:function(t){var a=e(this);a.closest("form, .validationEngineContainer").data("jqv_submitButton",a.attr("id"))}};e.fn.validationEngine=function(a){var i=e(this);return i[0]?"string"==typeof a&&"_"!=a.charAt(0)&&t[a]?("showPrompt"!=a&&"hide"!=a&&"hideAll"!=a&&t.init.apply(i),t[a].apply(i,Array.prototype.slice.call(arguments,1))):"object"!=typeof a&&a?void e.error("Method "+a+" does not exist in jQuery.validationEngine"):(t.init.apply(i,arguments),t.attach.apply(i)):i},e.validationEngine={fieldIdCounter:0,defaults:{validationEventTrigger:"blur",scroll:!0,focusFirstField:!0,showPrompts:!0,validateNonVisibleFields:!1,promptPosition:"topRight",bindMethod:"bind",inlineAjax:!1,ajaxFormValidation:!1,ajaxFormValidationURL:!1,ajaxFormValidationMethod:"get",onAjaxFormComplete:e.noop,onBeforeAjaxFormValidation:e.noop,onValidationComplete:!1,doNotShowAllErrosOnSubmit:!1,custom_error_messages:{},binded:!0,showArrow:!0,isError:!1,maxErrorsPerField:!1,ajaxValidCache:{},autoPositionUpdate:!1,InvalidFields:[],onFieldSuccess:!1,onFieldFailure:!1,onSuccess:!1,onFailure:!1,validateAttribute:"class",addSuccessCssClassToField:"",addFailureCssClassToField:"",autoHidePrompt:!1,autoHideDelay:1e4,fadeDuration:.3,prettySelect:!1,addPromptClass:"",usePrefix:"",useSuffix:"",showOneMessage:!1,bindOnSubmit:!0}},e(function(){e.validationEngine.defaults.promptPosition=t.isRTL()?"topLeft":"topRight"})}(jQuery);