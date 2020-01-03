
var arr_all_conditions=[],um_field_conditions={},um_field_default_values={};function um_get_field_default_value(e){var i="",n=um_get_field_type(e);switch(n){case"text":case"number":case"date":case"textarea":case"select":i=e.find("input:text,input[type=number],textarea,select").val();break;case"multiselect":i=e.find("select").val();break;case"radio":1<=e.find("input[type=radio]:checked").length&&(i=e.find("input[type=radio]:checked").val());break;case"checkbox":1<=e.find("input[type=checkbox]:checked").length&&(1<e.find("input[type=checkbox]:checked").length?e.find("input[type=checkbox]:checked").each(function(){i=i+jQuery(this).val()+" "}):i=e.find("input[type=checkbox]:checked").val())}return{type:n,value:i}}function um_get_field_element(e){switch(um_get_field_type(e)){case"text":case"number":case"date":case"textarea":case"select":case"multiselect":case"radio":case"checkbox":return e.find("input,textarea,select")}return""}function um_get_field_type(e){var n="",i=e.attr("class");return jQuery.each(i.split(" "),function(e,i){-1!=i.indexOf("um-field-type")&&(n=i.split("_")[1])}),n}function um_get_field_children(n){var t=[];return jQuery.each(arr_all_conditions,function(e,i){i.field.parent==n&&t.push(i.field.condition)}),t}function um_splitup_array(e,i){for(var n=e.length%i,t=n,a=Math.floor(e.length/i),u=[],o=0;o<e.length;o+=a){var r=a+o,d=!1;0!==n&&t&&(r++,t--,d=!0),u.push(e.slice(o,r)),d&&o++}var c=[];return jQuery.each(u,function(e,i){c.push({action:i[0],if_field:i[1],operator:i[2],value:i[3]})}),c}function um_get_field_data(e){return um_live_field=e.parents(".um-field").data("key"),um_live_value=e.val(),e.is(":checkbox")&&(um_live_value="",1<e.parents(".um-field").find("input:checked").length?e.parents(".um-field").find("input:checked").each(function(){um_live_value=um_live_value+jQuery(this).val()+" "}):1<=e.parents(".um-field").find("input:checked").length&&(um_live_value=e.parents(".um-field").find("input:checked").val())),e.is(":radio")&&(um_live_value=e.parents(".um-field").find("input[type=radio]:checked").val()),um_live_value}function um_in_array(e,i,n){var t,a=!1;n=!!n;for(t in i)if(n&&i[t]===e||!n&&i[t]==e){a=!0;break}return a}function um_apply_conditions(n,e){if(n.parents(".um-field[data-key]").length){var i=n.parents(".um-field[data-key]").data("key"),t=um_field_conditions[i];if(void 0!==t){var a=um_get_field_data(n),u={},o={},r={};jQuery.each(t,function(e,i){void 0===o[i.owner]&&(o[i.owner]=[],r[i.owner]={}),o[i.owner].push(i.value),r[i.owner]=i}),jQuery.each(t,function(e,i){void 0===u[i.owner]&&(u[i.owner]={}),"empty"==i.operator&&(!a||""==a&&um_in_array(a,o[i.owner])?u[i.owner][e]=!0:u[i.owner][e]=!1),"not empty"==i.operator&&(a&&""!=a&&!um_in_array(a,o[i.owner])?u[i.owner][e]=!0:u[i.owner][e]=!1),"equals to"==i.operator&&(i.value==a&&um_in_array(a,o[i.owner])?u[i.owner][e]=!0:u[i.owner][e]=!1),"not equals"==i.operator&&(jQuery.isNumeric(i.value)&&parseInt(a)!=parseInt(i.value)&&a&&!um_in_array(a,o[i.owner])?u[i.owner][e]=!0:i.value==a||um_in_array(a,o[i.owner])?u[i.owner][e]=!1:u[i.owner][e]=!0),"greater than"==i.operator&&(jQuery.isNumeric(i.value)&&parseInt(a)>parseInt(i.value)?u[i.owner][e]=!0:u[i.owner][e]=!1),"less than"==i.operator&&(jQuery.isNumeric(i.value)&&parseInt(a)<parseInt(i.value)?u[i.owner][e]=!0:u[i.owner][e]=!1),"contains"==i.operator&&("multiselect"==um_get_field_type(n.parents(".um-field[data-key]"))?a&&0<=a.indexOf(i.value)&&um_in_array(i.value,a)?u[i.owner][e]=!0:u[i.owner][e]=!1:"checkbox"==um_get_field_type(n.parents(".um-field[data-key]"))?a&&0<=a.indexOf(i.value)?u[i.owner][e]=!0:u[i.owner][e]=!1:a&&0<=a.indexOf(i.value)&&um_in_array(a,o[i.owner])?u[i.owner][e]=!0:u[i.owner][e]=!1)}),jQuery.each(u,function(e,i){um_in_array(!0,i)?um_field_apply_action(n,r[e],!0):um_field_apply_action(n,r[e],!1)}),n.trigger("um_fields_change")}}}function um_field_apply_action(e,i,n){var t=jQuery('div.um-field[data-key="'+i.owner+'"]');"show"==i.action&&n&&(t.show(),_show_in_ie(t),um_field_restore_default_value(t)),"show"!=i.action||n||(t.hide(),_hide_in_ie(t)),"hide"==i.action&&n&&(t.hide(),_hide_in_ie(t)),"hide"!=i.action||n||(t.show(),_show_in_ie(t),um_field_restore_default_value(t)),e.removeClass("um-field-has-changed")}function um_field_restore_default_value(t){var e=um_get_field_type(t),i=t.data("key"),n=um_field_default_values[i];switch(e){case"text":case"number":case"date":case"textarea":t.find("input:text,input[type=number],textareas").val(n.value);break;case"select":t.find("select").find("option").prop("selected",!1),t.find("select").val(n.value),t.find("select").trigger("change");break;case"multiselect":t.find("select").find("option").prop("selected",!1),jQuery.each(n.value,function(e,i){t.find("select").find('option[value="'+i+'"]').attr("selected",!0)}),t.find("select").trigger("change");break;case"checkbox":if(1<=t.find("input[type=checkbox]:checked").length)if(t.find("input[type=checkbox]:checked").removeAttr("checked"),t.find("span.um-field-checkbox-state i").removeClass("um-icon-android-checkbox-outline"),t.find("span.um-field-checkbox-state i").addClass("um-icon-android-checkbox-outline-blank"),t.find(".um-field-checkbox.active").removeClass("active"),jQuery.isArray(n.value))jQuery.each(n.value,function(e,i){var n=t.find('input[type=checkbox][value="'+i+'"]');n.attr("checked",!0),n.closest(".um-field-checkbox").find("i").removeClass("um-icon-android-checkbox-outline-blank"),n.closest(".um-field-checkbox").find("i").addClass("um-icon-android-checkbox-outline"),n.closest(".um-field-checkbox").addClass("active")});else{var a=t.find('input[type=checkbox][value="'+n.value+'"]');a.attr("checked",!0),a.closest(".um-field-checkbox").find("i").removeClass("um-icon-android-checkbox-outline-blank"),a.closest(".um-field-checkbox").find("i").addClass("um-icon-android-checkbox-outline"),a.closest(".um-field-checkbox").addClass("active")}break;case"radio":1<=t.find("input[type=radio]:checked").length&&setTimeout(function(){t.find("input[type=radio]:checked").removeAttr("checked"),t.find("span.um-field-radio-state i").removeClass("um-icon-android-radio-button-on"),t.find("span.um-field-radio-state i").addClass("um-icon-android-radio-button-off"),t.find(".um-field-radio.active").removeClass("active");var e=t.find("input[type=radio][value='"+n.value+"']");e.attr("checked",!0),e.closest(".um-field-radio").find("i").removeClass("um-icon-android-radio-button-off"),e.closest(".um-field-radio").find("i").addClass("um-icon-android-radio-button-on"),e.closest(".um-field-radio").addClass("active")},100)}if(!t.hasClass("um-field-has-changed")){var u=um_get_field_element(t);"radio"!=e&&"checkbox"!=e||(u=u.find(":checked")),u&&(u.trigger("change"),t.addClass("um-field-has-changed"))}}function um_field_hide_siblings(){jQuery.each(um_field_conditions,function(e,i){(1<=jQuery('.um-field[data-key="'+e+'"]:hidden').length||"none"==jQuery('.um-field[data-key="'+e+'"]').css("display"))&&jQuery.each(i,function(e,i){jQuery('.um-field[data-key="'+i.owner+'"]').hide()})})}function _hide_in_ie(e){void 0!==jQuery.browser&&jQuery.browser.msie&&e.css({visibility:"hidden"})}function _show_in_ie(e){void 0!==jQuery.browser&&jQuery.browser.msie&&e.css({visibility:"visible"})}function um_init_field_conditions(){var e=[];jQuery(".um-field[data-key]").each(function(){var t=jQuery(this).data("key");e.push(t);var u={};jQuery.each(jQuery(this)[0].attributes,function(e,i){if(-1!=i.name.indexOf("data-cond")){var n=i.name.slice(10),t=n.substring(1,0),a=n.slice(2);void 0===u[t]&&(u[t]={}),u[t][a]=i.value}}),jQuery.each(u,function(e,i){var n={field:{owner:t,action:i.action,parent:i.field,operator:i.operator,value:i.value,condition:{owner:t,action:i.action,operator:i.operator,value:i.value}}};arr_all_conditions.push(n)}),um_field_default_values[jQuery(this).data("key")]=um_get_field_default_value(jQuery(this))}),jQuery.each(e,function(e,i){um_field_conditions[i]=um_get_field_children(i)}),jQuery(".um-field[data-key]:visible").each(function(){var e=um_get_field_element(jQuery(this));void 0!==e.trigger&&e.trigger("change")})}jQuery(document).ready(function(){jQuery(document).on("change",'.um-field select, .um-field input[type="radio"], .um-field input[type="checkbox"]',function(){um_apply_conditions(jQuery(this),!1)}),jQuery(document).on("input change",'.um-field input[type="text"]',function(){um_apply_conditions(jQuery(this),!1)}),jQuery(document).on("input change",'.um-field input[type="number"]',function(){um_apply_conditions(jQuery(this),!1)}),jQuery(document).on("input change",'.um-field input[type="password"]',function(){um_apply_conditions(jQuery(this),!1)}),jQuery(document).on("um_fields_change",function(){um_field_hide_siblings(),um_field_hide_siblings()}),um_init_field_conditions()});