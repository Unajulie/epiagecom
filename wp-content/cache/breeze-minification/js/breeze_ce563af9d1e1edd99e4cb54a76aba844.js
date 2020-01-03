
function gformBindFormatPricingFields(){jQuery(".ginput_amount, .ginput_donation_amount").off("change.gform").on("change.gform",function(){gformFormatPricingField(this)}),jQuery(".ginput_amount, .ginput_donation_amount").each(function(){gformFormatPricingField(this)})}function Currency(e){this.currency=e,this.toNumber=function(e){return this.isNumeric(e)?parseFloat(e):gformCleanNumber(e,this.currency.symbol_right,this.currency.symbol_left,this.currency.decimal_separator)},this.toMoney=function(e,r){if((r=r||!1)||(e=gformCleanNumber(e,this.currency.symbol_right,this.currency.symbol_left,this.currency.decimal_separator)),!1===e)return"";e+="",negative="","-"==e[0]&&(e=parseFloat(e.substr(1)),negative="-"),money=this.numberFormat(e,this.currency.decimals,this.currency.decimal_separator,this.currency.thousand_separator),"0.00"==money&&(negative="");var t=this.currency.symbol_left?this.currency.symbol_left+this.currency.symbol_padding:"",i=this.currency.symbol_right?this.currency.symbol_padding+this.currency.symbol_right:"";return money=negative+this.htmlDecode(t)+money+this.htmlDecode(i),money},this.numberFormat=function(e,r,t,i,n){n=void 0===n;e=(e+"").replace(",","").replace(" ","");var o,a,l,f=isFinite(+e)?+e:0,s=isFinite(+r)?Math.abs(r):0,d=void 0===i?",":i,c=void 0===t?".":t,u="";return 3<(u="0"==r?(f+=1e-10,(""+Math.round(f)).split(".")):-1==r?(""+f).split("."):(o=f+=1e-10,a=s,l=Math.pow(10,a),""+Math.round(o*l)/l).split("."))[0].length&&(u[0]=u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,d)),n&&(u[1]||"").length<s&&(u[1]=u[1]||"",u[1]+=new Array(s-u[1].length+1).join("0")),u.join(c)},this.isNumeric=function(e){return gformIsNumber(e)},this.htmlDecode=function(e){var r,t,i=e,n=i.match(/&#[0-9]{1,5};/g);if(null!=n)for(var o=0;o<n.length;o++)i=-32768<=(r=(t=n[o]).substring(2,t.length-1))&&r<=65535?i.replace(t,String.fromCharCode(r)):i.replace(t,"");return i}}function gformCleanNumber(e,r,t,i){var n="",o="",a="",l=!1;e=(e=(e=(e+=" ").replace(/&.*?;/g,"")).replace(r,"")).replace(t,"");for(var f=0;f<e.length;f++)a=e.substr(f,1),0<=parseInt(a,10)&&parseInt(a,10)<=9||a==i?n+=a:"-"==a&&(l=!0);for(f=0;f<n.length;f++)"0"<=(a=n.substr(f,1))&&a<="9"?o+=a:a==i&&(o+=".");return l&&(o="-"+o),!!gformIsNumber(o)&&parseFloat(o)}function gformGetDecimalSeparator(e){var r;switch(e){case"currency":r=new Currency(gf_global.gf_currency_config).currency.decimal_separator;break;case"decimal_comma":r=",";break;default:r="."}return r}function gformIsNumber(e){return!isNaN(parseFloat(e))&&isFinite(e)}function gformIsNumeric(e,r){switch(r){case"decimal_dot":return new RegExp("^(-?[0-9]{1,3}(?:,?[0-9]{3})*(?:.[0-9]+)?)$").test(e);case"decimal_comma":return new RegExp("^(-?[0-9]{1,3}(?:.?[0-9]{3})*(?:,[0-9]+)?)$").test(e)}return!1}function gformDeleteUploadedFile(e,r,t){var i=jQuery("#field_"+e+"_"+r),n=jQuery(t).parent().index();i.find(".ginput_preview").eq(n).remove(),i.find('input[type="file"],.validation_message,#extensions_message_'+e+"_"+r).removeClass("gform_hidden"),i.find(".ginput_post_image_file").show(),i.find('input[type="text"]').val("");var o=jQuery("#gform_uploaded_files_"+e).val();if(o){var a=jQuery.secureEvalJSON(o);if(a){var l="input_"+r,f=i.find("#gform_multifile_upload_"+e+"_"+r);if(0<f.length){a[l].splice(n,1);var s=f.data("settings"),d=s.gf_vars.max_files;jQuery("#"+s.gf_vars.message_id).html(""),a[l].length<d&&gfMultiFileUploader.toggleDisabled(s,!1)}else a[l]=null;jQuery("#gform_uploaded_files_"+e).val(jQuery.toJSON(a))}}}void 0===jQuery.fn.prop&&(jQuery.fn.prop=jQuery.fn.attr),jQuery(document).ready(function(){jQuery(document).bind("gform_post_render",gformBindFormatPricingFields)});var _gformPriceFields=new Array,_anyProductSelected;function gformIsHidden(e){return"none"==e.parents(".gfield").not(".gfield_hidden_product").css("display")}function gformCalculateTotalPrice(e){if(_gformPriceFields[e]){var r=0;_anyProductSelected=!1;for(var t=0;t<_gformPriceFields[e].length;t++)r+=gformCalculateProductPrice(e,_gformPriceFields[e][t]);if(_anyProductSelected)r+=gformGetShippingPrice(e);window.gform_product_total&&(r=window.gform_product_total(e,r)),r=gform.applyFilters("gform_product_total",r,e);var i=jQuery(".ginput_total_"+e);if(0<i.length){var n=i.next().val(),o=gformFormatMoney(r,!0);n!=r&&i.next().val(r).change(),o!=i.first().text()&&i.html(o)}}}function gformGetShippingPrice(e){var r=jQuery(".gfield_shipping_"+e+' input[type="hidden"], .gfield_shipping_'+e+" select, .gfield_shipping_"+e+" input:checked"),t=0;return 1!=r.length||gformIsHidden(r)||(t=r.attr("type")&&"hidden"==r.attr("type").toLowerCase()?r.val():gformGetPrice(r.val())),gformToNumber(t)}function gformGetFieldId(e){var r=jQuery(e).attr("id").split("_");return r.length<=0?0:r[r.length-1]}function gformCalculateProductPrice(a,e){var r="_"+a+"_"+e;jQuery(".gfield_option"+r+", .gfield_shipping_"+a).find("select").each(function(){var e=jQuery(this),t=gformGetPrice(e.val()),i=e.attr("id").split("_")[2];e.children("option").each(function(){var e=jQuery(this),r=gformGetOptionLabel(e,e.val(),t,a,i);e.html(r)})}),jQuery(".gfield_option"+r).find(".gfield_checkbox").find("input:checkbox").each(function(){var e=jQuery(this),r=e.attr("id"),t=r.split("_")[2],i=r.replace("choice_","#label_"),n=jQuery(i),o=gformGetOptionLabel(n,e.val(),0,a,t);n.html(o)}),jQuery(".gfield_option"+r+", .gfield_shipping_"+a).find(".gfield_radio").each(function(){var n=0,e=jQuery(this),o=e.attr("id").split("_")[2],r=e.find("input:radio:checked").val();r&&(n=gformGetPrice(r)),e.find("input:radio").each(function(){var e=jQuery(this),r=e.attr("id").replace("choice_","#label_"),t=jQuery(r);if(t){var i=gformGetOptionLabel(t,e.val(),n,a,o);t.html(i)}})});var t=gformGetBasePrice(a,e),i=gformGetProductQuantity(a,e);return 0<i&&(jQuery(".gfield_option"+r).find("input:checked, select").each(function(){gformIsHidden(jQuery(this))||(t+=gformGetPrice(jQuery(this).val()))}),_anyProductSelected=!0),t=gformRoundPrice(t*=i)}function gformGetProductQuantity(e,r){if(!gformIsProductSelected(e,r))return 0;var t,i,n=jQuery("#ginput_quantity_"+e+"_"+r);if(gformIsHidden(n))return 0;0<n.length?t=n.val():(t=1,0<(n=jQuery(".gfield_quantity_"+e+"_"+r+" :input")).length&&(t=n.val(),i=gf_get_field_number_format(gf_get_input_id_by_html_id(n.attr("id")),e,"value")));return i||(i="currency"),(t=gformCleanNumber(t,"","",gformGetDecimalSeparator(i)))||(t=0),t}function gformIsProductSelected(e,r){var t="_"+e+"_"+r,i=jQuery("#ginput_base_price"+t+", .gfield_donation"+t+' input[type="text"], .gfield_product'+t+" .ginput_amount");return!(!i.val()||gformIsHidden(i))||!(!(i=jQuery(".gfield_product"+t+" select, .gfield_product"+t+" input:checked, .gfield_donation"+t+" select, .gfield_donation"+t+" input:checked")).val()||gformIsHidden(i))}function gformGetBasePrice(e,r){var t="_"+e+"_"+r,i=0,n=jQuery("#ginput_base_price"+t+", .gfield_donation"+t+' input[type="text"], .gfield_product'+t+" .ginput_amount");if(0<n.length)i=n.val(),gformIsHidden(n)&&(i=0);else{var o=(n=jQuery(".gfield_product"+t+" select, .gfield_product"+t+" input:checked, .gfield_donation"+t+" select, .gfield_donation"+t+" input:checked")).val();o&&(i=1<(o=o.split("|")).length?o[1]:0),gformIsHidden(n)&&(i=0)}return!1===(i=new Currency(gf_global.gf_currency_config).toNumber(i))?0:i}function gformFormatMoney(e,r){return gf_global.gf_currency_config?new Currency(gf_global.gf_currency_config).toMoney(e,r):e}function gformFormatPricingField(e){if(gf_global.gf_currency_config){var r=new Currency(gf_global.gf_currency_config).toMoney(jQuery(e).val());jQuery(e).val(r)}}function gformToNumber(e){return new Currency(gf_global.gf_currency_config).toNumber(e)}function gformGetPriceDifference(e,r){var t=parseFloat(r)-parseFloat(e);return price=gformFormatMoney(t,!0),0<t&&(price="+"+price),price}function gformGetOptionLabel(e,r,t,i,n){e=jQuery(e);var o=gformGetPrice(r),a=e.attr("price"),l=e.html().replace(/<span(.*)<\/span>/i,"").replace(a,""),f=gformGetPriceDifference(t,o);f=0==gformToNumber(f)?"":" "+f,e.attr("price",f);var s="option"==e[0].tagName.toLowerCase()?" "+f:"<span class='ginput_price'>"+f+"</span>",d=l+s;return window.gform_format_option_label&&(d=gform_format_option_label(d,l,s,t,o,i,n)),d}function gformGetProductIds(e,r){for(var t=jQuery(r).hasClass(e)?jQuery(r).attr("class").split(" "):jQuery(r).parents("."+e).attr("class").split(" "),i=0;i<t.length;i++)if(t[i].substr(0,e.length)==e&&t[i]!=e)return{formId:t[i].split("_")[2],productFieldId:t[i].split("_")[3]};return{formId:0,fieldId:0}}function gformGetPrice(e){var r=e.split("|"),t=new Currency(gf_global.gf_currency_config);return 1<r.length&&!1!==t.toNumber(r[1])?t.toNumber(r[1]):0}function gformRoundPrice(e){var r=new Currency(gf_global.gf_currency_config),t=r.numberFormat(e,r.currency.decimals,".","");return parseFloat(t)}function gformRegisterPriceField(e){_gformPriceFields[e.formId]||(_gformPriceFields[e.formId]=new Array);for(var r=0;r<_gformPriceFields[e.formId].length;r++)if(_gformPriceFields[e.formId][r]==e.productFieldId)return;_gformPriceFields[e.formId].push(e.productFieldId)}function gformInitPriceFields(){for(formId in jQuery(".gfield_price").each(function(){gformRegisterPriceField(gformGetProductIds("gfield_price",this)),jQuery(this).on("change",'input[type="text"], input[type="number"], select',function(){var e=gformGetProductIds("gfield_price",this);0==e.formId&&(e=gformGetProductIds("gfield_shipping",this)),jQuery(document).trigger("gform_price_change",[e,this]),gformCalculateTotalPrice(e.formId)}),jQuery(this).on("click",'input[type="radio"], input[type="checkbox"]',function(){var e=gformGetProductIds("gfield_price",this);0==e.formId&&(e=gformGetProductIds("gfield_shipping",this)),jQuery(document).trigger("gform_price_change",[e,this]),gformCalculateTotalPrice(e.formId)})}),_gformPriceFields)_gformPriceFields.hasOwnProperty(formId)&&gformCalculateTotalPrice(formId)}function gformShowPasswordStrength(e){var r=gformPasswordStrength(document.getElementById(e).value,document.getElementById(e+"_2")?document.getElementById(e+"_2").value:""),t=window.gf_text["password_"+r],i="unknown"===r?"blank":r;jQuery("#"+e+"_strength").val(r),jQuery("#"+e+"_strength_indicator").removeClass("blank mismatch short good bad strong").addClass(i).html(t)}function gformPasswordStrength(e,r){if(e.length<=0)return"blank";switch(wp.passwordStrength.meter(e,wp.passwordStrength.userInputBlacklist(),r)){case-1:return"unknown";case 2:return"bad";case 3:return"good";case 4:return"strong";case 5:return"mismatch";default:return"short"}}function gformToggleShowPassword(e){var r=jQuery("#"+e),t=r.parent().find("button"),i=t.find("span");switch(r.attr("type")){case"password":r.attr("type","text"),t.attr("label",t.attr("data-label-hide")),i.removeClass("dashicons-hidden").addClass("dashicons-visibility");break;case"text":r.attr("type","password"),t.attr("label",t.attr("data-label-show")),i.removeClass("dashicons-visibility").addClass("dashicons-hidden")}}function gformToggleCheckboxes(e){var r=jQuery(e).parent(),t=r.find("label");$checkboxes=r.parent().find("li:not( .gchoice_select_all )"),$checkboxes.each(function(){jQuery('input[type="checkbox"]',this).prop("checked",e.checked).trigger("change"),"function"==typeof jQuery('input[type="checkbox"]',this)[0].onclick&&jQuery('input[type="checkbox"]',this)[0].onclick()}),e.checked?t.html(t.data("label-deselect")):t.html(t.data("label-select"))}function gformAddListItem(e,r){var t=jQuery(e);if(!t.hasClass("gfield_icon_disabled")){var i=t.parents(".gfield_list_group"),n=i.clone(),o=i.parents(".gfield_list_container"),a=n.find(":input:last").attr("tabindex");n.find("input, select, textarea").attr("tabindex",a).not(":checkbox, :radio").val(""),n.find(":checkbox, :radio").prop("checked",!1),n=gform.applyFilters("gform_list_item_pre_add",n,i),i.after(n),gformToggleIcons(o,r),gformAdjustClasses(o),gform.doAction("gform_list_post_item_add",n,o)}}function gformDeleteListItem(e,r){var t=jQuery(e).parents(".gfield_list_group"),i=t.parents(".gfield_list_container");t.remove(),gformToggleIcons(i,r),gformAdjustClasses(i),gform.doAction("gform_list_post_item_delete",i)}function gformAdjustClasses(e){e.find(".gfield_list_group").each(function(e){var r=(e+1)%2==0?"gfield_list_row_even":"gfield_list_row_odd";jQuery(this).removeClass("gfield_list_row_odd gfield_list_row_even").addClass(r)})}function gformToggleIcons(e,r){var t=e.find(".gfield_list_group").length,i=e.find(".add_list_item");e.find(".delete_list_item").css("visibility",1==t?"hidden":"visible"),0<r&&r<=t?(i.data("title",e.find(".add_list_item").attr("title")),i.addClass("gfield_icon_disabled").attr("title","")):0<r&&(i.removeClass("gfield_icon_disabled"),i.data("title")&&i.attr("title",i.data("title")))}function gformAddRepeaterItem(e,r){var t=jQuery(e);if(!t.hasClass("gfield_icon_disabled")){var i=t.closest(".gfield_repeater_item"),n=i.clone(),o=i.closest(".gfield_repeater_container"),a=n.find(":input:last").attr("tabindex");n.find('input[type!="hidden"], select, textarea').attr("tabindex",a).not(":checkbox, :radio").val(""),n.find(":checkbox, :radio").prop("checked",!1),n.find(".validation_message").remove(),n=gform.applyFilters("gform_repeater_item_pre_add",n,i),i.after(n),n.children(".gfield_repeater_cell").each(function(){var e=jQuery(this).find(".gfield_repeater_container").first();0<e.length&&(resetContainerItems=function(e){e.children(".gfield_repeater_items").children(".gfield_repeater_item").each(function(e){jQuery(this).children(".gfield_repeater_cell").each(function(){var e=jQuery(this).find(".gfield_repeater_container").first();0<e.length&&resetContainerItems(e)})}),e.children(".gfield_repeater_items").children(".gfield_repeater_item").not(":first").remove()},resetContainerItems(e))}),gformResetRepeaterAttributes(o),"function"==typeof gformInitDatepicker&&(o.find(".ui-datepicker-trigger").remove(),o.find(".hasDatepicker").removeClass("hasDatepicker"),gformInitDatepicker()),gformBindFormatPricingFields(),gformToggleRepeaterButtons(o,r),gform.doAction("gform_repeater_post_item_add",n,o)}}function gformDeleteRepeaterItem(e,r){var t=jQuery(e).closest(".gfield_repeater_item"),i=t.closest(".gfield_repeater_container");t.remove(),gformResetRepeaterAttributes(i),gformToggleRepeaterButtons(i,r),gform.doAction("gform_repeater_post_item_delete",i)}function gformResetRepeaterAttributes(e,p,h){var y=null;void 0===p&&(p=0),void 0===h&&(h=0),e.children(".gfield_repeater_items").children(".gfield_repeater_item").each(function(){jQuery(this).children(".gfield_repeater_cell").each(function(){var m=jQuery(this),e=jQuery(this).find(".gfield_repeater_container").first();0<e.length?gformResetRepeaterAttributes(e,p+1,h):jQuery(this).find("input, select, textarea, :checkbox, :radio").each(function(){var e=jQuery(this),r=e.attr("name");if(void 0!==r){var t=/^(input_[^\[]*)((\[[0-9]+\])+)/.exec(r);if(t){t[1];for(var i=t[2],n=/\[([0-9]+)\]/g,o=[],a=n.exec(i);null!=a;)o.push(a[1]),a=n.exec(i);for(var l=t[1],f="",s=(o=o.reverse()).length-1;0<=s;s--)s==p?(l+="["+h+"]",f+="-"+h):(l+="["+o[s]+"]",f+="-"+o[s]);var d=e.attr("id"),c=m.find("label[for='"+d+"']");if(d){var u=d.match(/((choice|input)_[0-9|_]*)-/);u&&u[2]&&(f=u[1]+f,c.attr("for",f),e.attr("id",f))}var g=r.replace(t[0],l),_=jQuery('input[name="'+g+'"]').is(":checked");e.is(":radio")&&e.is(":checked")&&r!==g&&_&&(null!==y&&y.prop("checked",!0),e.prop("checked",!1),y=e),e.attr("name",g)}}})}),0===p&&h++}),null!==y&&(y.prop("checked",!0),y=null)}function gformToggleRepeaterButtons(e){var r=e.closest(".gfield_repeater_wrapper").data("max_items"),t=e.children(".gfield_repeater_items").children(".gfield_repeater_item").length,i=e.children(".gfield_repeater_items").children(".gfield_repeater_item").children(".gfield_repeater_buttons"),n=i.children(".add_repeater_item");i.children(".remove_repeater_item").css("visibility",1==t?"hidden":"visible"),0<r&&r<=t?(n.data("title",i.children(".add_repeater_item").attr("title")),n.addClass("gfield_icon_disabled").attr("title","")):0<r&&(n.removeClass("gfield_icon_disabled"),n.data("title")&&n.attr("title",n.data("title"))),e.children(".gfield_repeater_items").children(".gfield_repeater_item").children(".gfield_repeater_cell").each(function(e){var r=jQuery(this).find(".gfield_repeater_container").first();0<r.length&&gformToggleRepeaterButtons(r)})}function gformMatchCard(e){var r=gformFindCardType(jQuery("#"+e).val()),t=jQuery("#"+e).parents(".gfield").find(".gform_card_icon_container");r?(jQuery(t).find(".gform_card_icon").removeClass("gform_card_icon_selected").addClass("gform_card_icon_inactive"),jQuery(t).find(".gform_card_icon_"+r).removeClass("gform_card_icon_inactive").addClass("gform_card_icon_selected")):jQuery(t).find(".gform_card_icon").removeClass("gform_card_icon_selected gform_card_icon_inactive")}function gformFindCardType(e){if(e.length<4)return!1;var r=window.gf_cc_rules,t=new Array;for(type in r)if(r.hasOwnProperty(type))for(i in r[type])if(r[type].hasOwnProperty(i)&&0===r[type][i].indexOf(e.substring(0,r[type][i].length))){t[t.length]=type;break}return 1==t.length&&t[0].toLowerCase()}function gformToggleCreditCard(){jQuery("#gform_payment_method_creditcard").is(":checked")?jQuery(".gform_card_fields_container").slideDown():jQuery(".gform_card_fields_container").slideUp()}function gformInitChosenFields(e,t){return jQuery(e).each(function(){var e=jQuery(this);if("rtl"==jQuery("html").attr("dir")&&e.addClass("chosen-rtl chzn-rtl"),e.is(":visible")&&0==e.siblings(".chosen-container").length){var r=gform.applyFilters("gform_chosen_options",{no_results_text:t},e);e.chosen(r)}})}function gformInitCurrencyFormatFields(e){jQuery(e).each(function(){jQuery(this).val(gformFormatMoney(jQuery(this).val()))}).change(function(e){jQuery(this).val(gformFormatMoney(jQuery(this).val()))})}var GFMergeTag=function(){GFMergeTag.getMergeTagValue=function(e,r,t){void 0===t&&(t=""),t=t.replace(":","");var i,n=parseInt(r,10),o=jQuery("#field_"+e+"_"+n),a=n==r?'input[name^="input_'+n+'"]':'input[name="input_'+r+'"]',l=o.find(a+', select[name^="input_'+r+'"], textarea[name="input_'+r+'"]');if(!(!window.gf_check_field_rule||"show"==gf_check_field_rule(e,n,!0,"")))return"";var f=gform.applyFilters("gform_value_merge_tag_"+e+"_"+n,!1,l,t);if(!1!==f)return f;switch(f="",t){case"label":return o.find(".gfield_label").text();case"qty":if(o.hasClass("gfield_price"))return!1===(i=gformGetProductQuantity(e,n))||""===i?0:i}if("checkbox"!==l.prop("type")&&"radio"!==l.prop("type")||(l=l.filter(":checked")),1===l.length){if(!l.is("select")&&"radio"!==l.prop("type")&&"checkbox"!==l.prop("type")||""!==t)void 0===i&&(i=l.val());else if((i=l.is("select")?l.find("option:selected"):l.next("label").clone()).find("span").remove(),1===i.length)i=i.text();else{for(var s=[],d=0;d<i.length;d++)s[d]=jQuery(i[d]).text();i=s}f=jQuery.isArray(i)?i.join(", "):"string"==typeof i?GFMergeTag.formatValue(i,t):""}else if(1<l.length){i=[];for(d=0;d<l.length;d++)if("checkbox"===l.prop("type")&&""===t){var c=jQuery(l[d]).next("label").clone();c.find("span").remove(),i[d]=GFMergeTag.formatValue(c.text(),t),c.remove()}else i[d]=GFMergeTag.formatValue(jQuery(l[d]).val(),t);f=i.join(", ")}return f},GFMergeTag.replaceMergeTags=function(e,r){var t=GFMergeTag.parseMergeTags(r);for(i in t)if(t.hasOwnProperty(i)){var n=t[i][1],o=(parseInt(n,10),null==t[i][3]?"":t[i][3].replace(":","")),a=GFMergeTag.getMergeTagValue(e,n,o);r=r.replace(t[i][0],a)}return r},GFMergeTag.formatValue=function(e,r){var t="";switch(t=1<(e=e.split("|")).length&&("price"===r||"currency"===r)?gformToNumber(e[1]):e[0],r){case"price":t=!1===(t=gformToNumber(t))?"":t;break;case"currency":t=!1===(t=gformFormatMoney(t,!1))?"":t;break;case"numeric":return!1===(t=gformToNumber(t))?0:t}return t},GFMergeTag.parseMergeTags=function(e,r){void 0===r&&(r=/{[^{]*?:(\d+(\.\d+)?)(:(.*?))?}/i);for(var t=[];r.test(e);){var i=t.length;t[i]=r.exec(e),e=e.replace(""+t[i][0],"")}return t}};new GFMergeTag;var GFCalc=function(formId,formulaFields){this.formId=formId,this.formulaFields=formulaFields,this.exprPatt=/^[0-9 -/*\(\)]+$/i,this.isCalculating={},this.init=function(e,r){var t=this;jQuery(document).bind("gform_post_conditional_logic",function(){t.runCalcs(e,r)});for(var i=0;i<r.length;i++){var n=jQuery.extend({},r[i]);this.runCalc(n,e),this.bindCalcEvents(n,e)}},this.runCalc=function(formulaField,formId){var calcObj=this,field=jQuery("#field_"+formId+"_"+formulaField.field_id),formulaInput=field.hasClass("gfield_price")?jQuery("#ginput_base_price_"+formId+"_"+formulaField.field_id):jQuery("#input_"+formId+"_"+formulaField.field_id),previous_val=formulaInput.val(),formula=gform.applyFilters("gform_calculation_formula",formulaField.formula,formulaField,formId,calcObj),expr=calcObj.replaceFieldTags(formId,formula,formulaField).replace(/(\r\n|\n|\r)/gm,""),result="";if(calcObj.exprPatt.test(expr))try{result=eval(expr)}catch(e){}isFinite(result)||(result=0),window.gform_calculation_result&&(result=window.gform_calculation_result(result,formulaField,formId,calcObj),window.console&&console.log('"gform_calculation_result" function is deprecated since version 1.8! Use "gform_calculation_result" JS hook instead.')),result=gform.applyFilters("gform_calculation_result",result,formulaField,formId,calcObj);var formattedResult=gform.applyFilters("gform_calculation_format_result",!1,result,formulaField,formId,calcObj),numberFormat=gf_get_field_number_format(formulaField.field_id,formId);if(!1!==formattedResult)result=formattedResult;else if(field.hasClass("gfield_price")||"currency"==numberFormat)result=gformFormatMoney(result||0,!0);else{var decimalSeparator=".",thousandSeparator=",";"decimal_comma"==numberFormat&&(decimalSeparator=",",thousandSeparator="."),result=gformFormatNumber(result,gformIsNumber(formulaField.rounding)?formulaField.rounding:-1,decimalSeparator,thousandSeparator)}result!=previous_val&&(field.hasClass("gfield_price")?(jQuery("#input_"+formId+"_"+formulaField.field_id).text(result),formulaInput.val(result).trigger("change"),gformCalculateTotalPrice(formId)):formulaInput.val(result).trigger("change"))},this.runCalcs=function(e,r){for(var t=0;t<r.length;t++){var i=jQuery.extend({},r[t]);this.runCalc(i,e)}},this.bindCalcEvents=function(e,r){var t=this,i=e.field_id,n=GFMergeTag.parseMergeTags(e.formula);for(var o in t.isCalculating[i]=!1,n)if(n.hasOwnProperty(o)){var a=n[o][1],l=parseInt(a,10),f=jQuery("#field_"+r+"_"+l).find('input[name="input_'+a+'"], select[name="input_'+a+'"]');"checkbox"==f.prop("type")||"radio"==f.prop("type")?jQuery(f).click(function(){t.bindCalcEvent(a,e,r,0)}):f.is("select")||"hidden"==f.prop("type")?jQuery(f).change(function(){t.bindCalcEvent(a,e,r,0)}):jQuery(f).keydown(function(){t.bindCalcEvent(a,e,r)}).change(function(){t.bindCalcEvent(a,e,r,0)}),gform.doAction("gform_post_calculation_events",n[o],e,r,t)}},this.bindCalcEvent=function(e,r,t,i){var n=this,o=r.field_id;i=null==i?345:i,n.isCalculating[o][e]&&clearTimeout(n.isCalculating[o][e]),n.isCalculating[o][e]=window.setTimeout(function(){n.runCalc(r,t)},i)},this.replaceFieldTags=function(e,r,t){var n=GFMergeTag.parseMergeTags(r);for(i in n)if(n.hasOwnProperty(i)){var o=n[i][1],a=parseInt(o,10),l="value";if(n[i][3])l=n[i][3];else{var f=jQuery(".gfield_price input[name=input_"+a+"]").is("input[type=radio]"),s=0<jQuery(".gfield_price select[name=input_"+a+"]").length,d=jQuery('.gfield_price input[name="input_'+o+'"]').is("input[type=checkbox]");(s||f||d)&&(l="price")}var c=!window.gf_check_field_rule||"show"==gf_check_field_rule(e,a,!0,""),u=c?GFMergeTag.getMergeTagValue(e,o,l):0;u=gform.applyFilters("gform_merge_tag_value_pre_calculation",u,n[i],c,t,e),u=this.cleanNumber(u,e,a,t),r=r.replace(n[i][0],u)}return r},this.cleanNumber=function(e,r,t,i){var n=gf_get_field_number_format(t,r);return n||(n=gf_get_field_number_format(i.field_id,r)),(e=gformCleanNumber(e,"","",gformGetDecimalSeparator(n)))||(e=0),e},this.init(formId,formulaFields)};function gformFormatNumber(e,r,t,i){void 0===t&&(t=window.gf_global?new Currency(gf_global.gf_currency_config).currency.decimal_separator:".");void 0===i&&(i=window.gf_global?new Currency(gf_global.gf_currency_config).currency.thousand_separator:",");return(new Currency).numberFormat(e,r,t,i,!1)}function gformToNumber(e){return new Currency(gf_global.gf_currency_config).toNumber(e)}function getMatchGroups(e,r){for(var t=new Array;r.test(e);){var i=t.length;t[i]=r.exec(e),e=e.replace(""+t[i][0],"")}return t}function gf_get_field_number_format(e,r,t){var i=rgars(window,"gf_global/number_formats/{0}/{1}".format(r,e)),n=!1;return""===i?n:n=void 0===t?!1!==i.price?i.price:i.value:i[t]}var gform={hooks:{action:{},filter:{}},addAction:function(e,r,t,i){gform.addHook("action",e,r,t,i)},addFilter:function(e,r,t,i){gform.addHook("filter",e,r,t,i)},doAction:function(e){gform.doHook("action",e,arguments)},applyFilters:function(e){return gform.doHook("filter",e,arguments)},removeAction:function(e,r){gform.removeHook("action",e,r)},removeFilter:function(e,r,t){gform.removeHook("filter",e,r,t)},addHook:function(e,r,t,i,n){null==gform.hooks[e][r]&&(gform.hooks[e][r]=[]);var o=gform.hooks[e][r];null==n&&(n=r+"_"+o.length),null==i&&(i=10),gform.hooks[e][r].push({tag:n,callable:t,priority:i})},doHook:function(e,r,t){if(t=Array.prototype.slice.call(t,1),null!=gform.hooks[e][r]){var i,n=gform.hooks[e][r];n.sort(function(e,r){return e.priority-r.priority});for(var o=0;o<n.length;o++)"function"!=typeof(i=n[o].callable)&&(i=window[i]),"action"==e?i.apply(null,t):t[0]=i.apply(null,t)}if("filter"==e)return t[0]},removeHook:function(e,r,t,i){if(null!=gform.hooks[e][r])for(var n=gform.hooks[e][r],o=n.length-1;0<=o;o--)null!=i&&i!=n[o].tag||null!=t&&t!=n[o].priority||n.splice(o,1)}},__gf_keyup_timeout;function renderRecaptcha(){jQuery(".ginput_recaptcha").each(function(){var r=jQuery(this),e={sitekey:r.data("sitekey"),theme:r.data("theme"),tabindex:r.data("tabindex")};if(r.is(":empty")){r.data("stoken")&&(e.stoken=r.data("stoken"));var t=!1;"invisible"==r.data("size")&&(t=function(e){e&&r.closest("form").submit()}),(t=gform.applyFilters("gform_recaptcha_callback",t,r))&&(e.callback=t),r.data("widget-id",grecaptcha.render(this.id,e)),e.tabindex&&r.find("iframe").attr("tabindex",e.tabindex),gform.doAction("gform_post_recaptcha_render",r)}})}function gformValidateFileSize(e,r){var t;if(t=0<jQuery(e).closest("div").siblings(".validation_message").length?jQuery(e).closest("div").siblings(".validation_message"):jQuery(e).siblings(".validation_message"),window.FileReader&&window.File&&window.FileList&&window.Blob){var i=e.files[0];i&&i.size>r?t.text(i.name+" - "+gform_gravityforms.strings.file_exceeds_limit):t.text("")}}function gformInitSpinner(e,r){jQuery("#gform_"+e).submit(function(){gformAddSpinner(e,r)})}function gformAddSpinner(e,r){(void 0!==r&&r||(r=gform.applyFilters("gform_spinner_url",gf_global.spinnerUrl,e)),0==jQuery("#gform_ajax_spinner_"+e).length)&&gform.applyFilters("gform_spinner_target_elem",jQuery("#gform_submit_button_"+e+", #gform_wrapper_"+e+" .gform_next_button, #gform_send_resume_link_button_"+e),e).after('<img id="gform_ajax_spinner_'+e+'"  class="gform_ajax_spinner" src="'+r+'" alt="" />')}function gf_raw_input_change(e,r){clearTimeout(__gf_keyup_timeout);var t=jQuery(r),i=t.attr("id"),n=gf_get_input_id_by_html_id(i),o=gf_get_form_id_by_html_id(i),a=gform.applyFilters("gform_field_meta_raw_input_change",{fieldId:n,formId:o},t,e);if(n=a.fieldId,o=a.formId,n){var l=t.is(":checkbox")||t.is(":radio")||t.is("select"),f=!l||t.is("textarea");("keyup"!=e.type||f)&&("change"!=e.type||l||f)&&("keyup"==e.type?__gf_keyup_timeout=setTimeout(function(){gf_input_change(this,o,n)},300):gf_input_change(this,o,n))}}function gf_get_input_id_by_html_id(e){var r=gf_get_ids_by_html_id(e),t=r[2];return r[3]&&(t+="."+r[3]),t}function gf_get_form_id_by_html_id(e){return gf_get_ids_by_html_id(e)[1]}function gf_get_ids_by_html_id(e){return!!e&&e.split("_")}function gf_input_change(e,r,t){gform.doAction("gform_input_change",e,r,t)}function gformExtractFieldId(e){var r=parseInt(e.toString().split(".")[0],10);return r||e}function gformExtractInputIndex(e){var r=parseInt(e.toString().split(".")[1],10);return r||!1}if(function(c,b){c.uploaders={};var F="undefined"!=typeof gform_gravityforms?gform_gravityforms.strings:{},j="undefined"!=typeof gform_gravityforms?gform_gravityforms.vars.images_url:"";function i(e){var m,i,r=b(e).data("settings"),t=new plupload.Uploader(r);function p(e,r){b("#"+e).prepend("<li>"+w(r)+"</li>")}function h(){var e;return e=void 0===(e=b("#gform_uploaded_files_"+m).val())||""===e?{}:b.parseJSON(e)}function y(e){var r=h(),t=v(e);return void 0===r[t]&&(r[t]=[]),r[t]}function d(e){return y(e).length}function v(e){return"input_"+e}function n(e){e.preventDefault()}m=t.settings.multipart_params.form_id,(c.uploaders[r.container]=t).bind("Init",function(e,r){e.features.dragdrop||b(".gform_drop_instructions").hide();var t=e.settings.multipart_params.field_id,i=parseInt(e.settings.gf_vars.max_files,10),n=d(t);0<i&&i<=n&&c.toggleDisabled(e.settings,!0)}),c.toggleDisabled=function(e,r){("string"==typeof e.browse_button?b("#"+e.browse_button):b(e.browse_button)).prop("disabled",r)},t.init(),t.bind("BeforeUpload",function(e,r){e.settings.multipart_params.original_filename=r.name}),t.bind("FilesAdded",function(o,e){var a,l=parseInt(o.settings.gf_vars.max_files,10),f=d(o.settings.multipart_params.field_id),s=o.settings.gf_vars.disallowed_extensions;if(0<l&&l<=f)b.each(e,function(e,r){o.removeFile(r)});else{b.each(e,function(e,r){if(a=r.name.split(".").pop(),-1<b.inArray(a,s))return p(o.settings.gf_vars.message_id,r.name+" - "+F.illegal_extension),void o.removeFile(r);if(r.status==plupload.FAILED||0<l&&l<=f)o.removeFile(r);else{var t=void 0!==r.size?plupload.formatSize(r.size):F.in_progress,i="$this=jQuery(this); var uploader = gfMultiFileUploader.uploaders."+o.settings.container.id+";uploader.stop();uploader.removeFile(uploader.getFile('"+r.id+"'));$this.after('"+F.cancelled+"'); uploader.start();$this.remove();",n='<div id="{0}" class="ginput_preview">{1} ({2}) <b></b> <a href="javascript:void(0)" title="{3}" onclick="{4}" onkeypress="{4}">{5}</a></div>';n=gform.applyFilters("gform_file_upload_status_markup",n,r,t,F,i,o).format(r.id,w(r.name),t,F.cancel_upload,i,F.cancel),b("#"+o.settings.filelist).prepend(n),f++}}),o.refresh();var r="input:hidden[name='gform_unique_id']",t=b("form#gform_"+m+" "+r);0==t.length&&(t=b(r)),""===(i=t.val())&&(i="xxxxxxxx".replace(/[xy]/g,function(e){var r=16*Math.random()|0,t="x"==e?r:3&r|8;return t.toString(16)}),t.val(i)),0<l&&l<=f&&(c.toggleDisabled(o.settings,!0),p(o.settings.gf_vars.message_id,F.max_reached)),o.settings.multipart_params.gform_unique_id=i,o.start()}}),t.bind("UploadProgress",function(e,r){var t=r.percent+"%";b("#"+r.id+" b").html(t)}),t.bind("Error",function(e,r){if(r.code===plupload.FILE_EXTENSION_ERROR){var t=void 0!==e.settings.filters.mime_types?e.settings.filters.mime_types[0].extensions:e.settings.filters[0].extensions;p(e.settings.gf_vars.message_id,r.file.name+" - "+F.invalid_file_extension+" "+t)}else if(r.code===plupload.FILE_SIZE_ERROR)p(e.settings.gf_vars.message_id,r.file.name+" - "+F.file_exceeds_limit);else{var i="Error: "+r.code+", Message: "+r.message+(r.file?", File: "+r.file.name:"");p(e.settings.gf_vars.message_id,i)}b("#"+r.file.id).html(""),e.refresh()}),t.bind("ChunkUploaded",function(e,r,t){var i=b.secureEvalJSON(t.response);"error"==i.status&&(e.removeFile(r),p(e.settings.gf_vars.message_id,r.name+" - "+i.error.message),b("#"+r.id).html(""))}),t.bind("FileUploaded",function(e,r,t){if(e.getFile(r.id)){var i=b.secureEvalJSON(t.response);if("error"==i.status)return p(e.settings.gf_vars.message_id,r.name+" - "+i.error.message),void b("#"+r.id).html("");var n,o,a,l,f,s,d,c,u="<strong>"+w(r.name)+"</strong>",g=e.settings.multipart_params.form_id,_=e.settings.multipart_params.field_id;u="<img class='gform_delete' src='"+j+"/delete.png' onclick='gformDeleteUploadedFile("+g+","+_+", this);' onkeypress='gformDeleteUploadedFile("+g+","+_+", this);' alt='"+F.delete_file+"' title='"+F.delete_file+"' /> "+u,u=gform.applyFilters("gform_file_upload_markup",u,r,e,F,j),b("#"+r.id).html(u),100==r.percent&&(i.status&&"ok"==i.status?(n=_,o=i.data,(a=y(n)).unshift(o),l=n,f=a,s=h(),d=b("#gform_uploaded_files_"+m),c=v(l),s[c]=f,d.val(b.toJSON(s))):p(e.settings.gf_vars.message_id,F.unknown_error+": "+r.name))}}),b("#"+r.drop_element).on({dragenter:n,dragover:n})}function w(e){return b("<div/>").text(e).html()}b(document).bind("gform_post_render",function(e,r){b("form#gform_"+r+" .gform_fileupload_multifile").each(function(){i(this)});var t=b("form#gform_"+r);0<t.length&&t.submit(function(){var t=!1;if(b.each(c.uploaders,function(e,r){if(0<r.total.queued)return!(t=!0)}),t)return alert(F.currently_uploading),window["gf_submitting_"+r]=!1,b("#gform_ajax_spinner_"+r).remove(),!1})}),b(document).bind("gform_post_conditional_logic",function(e,r,t,i){i||b.each(c.uploaders,function(e,r){r.refresh()})}),b(document).ready(function(){"undefined"!=typeof adminpage&&"toplevel_page_gf_edit_forms"===adminpage||"undefined"==typeof plupload?b(".gform_button_select_files").prop("disabled",!0):"undefined"!=typeof adminpage&&-1<adminpage.indexOf("_page_gf_entries")&&b(".gform_fileupload_multifile").each(function(){i(this)})}),c.setup=function(e){i(e)}}(window.gfMultiFileUploader=window.gfMultiFileUploader||{},jQuery),jQuery(document).on("change keyup",".gfield input, .gfield select, .gfield textarea",function(e){gf_raw_input_change(e,this)}),jQuery(document).on("submit.gravityforms",".gform_wrapper form",function(e){var r,t=jQuery(this).closest(".gform_wrapper"),i=t.attr("id").split("_")[2],n=0<t.find(".gform_page").length,o=parseInt(t.find('input[name^="gform_source_page_number_"]').val(),10),a=parseInt(t.find('input[name^="gform_target_page_number_"]').val(),10),l=0===a,f=!l&&o<a,s="1"===jQuery("#gform_save_"+i).val();if(n){var d=f?"next":"submit";r=t.find(".gform_page:visible").find('.gform_page_footer [id^="gform_'+d+'_button_"]')}else r=t.find("#gform_submit_button_"+i);var c=!r.is(":visible");if(!s&&(l||f)&&c)window["gf_submitting_"+i]=!1,t.find(".gform_ajax_spinner").remove(),e.preventDefault();else if(l||l){var u=t.find(".ginput_recaptcha");if(0!==u.length&&"invisible"===u.data("size")){var g=t.find('input[name="g-recaptcha-response"]');0===g.length&&(g=u.find(".g-recaptcha-response")),g.val()||(grecaptcha.execute(u.data("widget-id")),window["gf_submitting_"+i]=!1,e.preventDefault())}}}),!window.rgars)function rgars(e,r){for(var t=r.split("/"),i=e,n=0;n<t.length;n++)i=rgar(i,t[n]);return i}if(!window.rgar)function rgar(e,r){return void 0!==e[r]?e[r]:""}String.prototype.format=function(){var t=arguments;return this.replace(/{(\d+)}/g,function(e,r){return void 0!==t[r]?t[r]:e})};