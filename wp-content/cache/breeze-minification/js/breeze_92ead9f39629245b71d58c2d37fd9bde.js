
function um_init_datetimepicker(){jQuery(".um-datepicker:not(.picker__input)").each(function(){if(elem=jQuery(this),void 0!==elem.attr("data-disabled_weekdays")&&""!=elem.attr("data-disabled_weekdays"))var e=JSON.parse(elem.attr("data-disabled_weekdays"));else e=!1;var t=null;void 0!==elem.attr("data-years")&&(t=elem.attr("data-years"));var a=elem.attr("data-date_min"),i=elem.attr("data-date_max"),r=[],n=[];void 0!==a&&(r=a.split(",")),void 0!==i&&(n=i.split(","));var u=r.length?new Date(r):null,o=r.length?new Date(n):null;if(u&&"Invalid Date"==u.toString()&&3==r.length){var s=r[1]+"/"+r[2]+"/"+r[0];u=new Date(Date.parse(s))}if(o&&"Invalid Date"==o.toString()&&3==n.length){var d=n[1]+"/"+n[2]+"/"+n[0];o=new Date(Date.parse(d))}var l={disable:e,format:elem.attr("data-format"),formatSubmit:"yyyy/mm/dd",hiddenName:!0,onOpen:function(){elem.blur()},onClose:function(){elem.blur()}};null!==t&&(l.selectYears=t),null!==u&&(l.min=u),null!==o&&(l.max=o),elem.pickadate(l)}),jQuery(".um-timepicker:not(.picker__input)").each(function(){elem=jQuery(this),elem.pickatime({format:elem.attr("data-format"),interval:parseInt(elem.attr("data-intervals")),formatSubmit:"HH:i",hiddenName:!0,onOpen:function(){elem.blur()},onClose:function(){elem.blur()}})})}function init_tipsy(){"function"==typeof jQuery.fn.tipsy&&(jQuery(".um-tip-n").tipsy({gravity:"n",opacity:1,live:"a.live",offset:3}),jQuery(".um-tip-w").tipsy({gravity:"w",opacity:1,live:"a.live",offset:3}),jQuery(".um-tip-e").tipsy({gravity:"e",opacity:1,live:"a.live",offset:3}),jQuery(".um-tip-s").tipsy({gravity:"s",opacity:1,live:"a.live",offset:3}))}jQuery(document).ready(function(){jQuery(document.body).on("click",".um-dropdown a.real_url",function(e){window.location=jQuery(this).attr("href")}),jQuery(document.body).on("click",".um-trigger-menu-on-click",function(e){return jQuery(".um-dropdown").hide(),jQuery(this).find(".um-dropdown").show(),!1}),jQuery(document.body).on("click",".um-dropdown-hide",function(e){return UM_hide_menus(),!1}),jQuery(document.body).on("click","a.um-manual-trigger",function(){var e=jQuery(this).attr("data-child"),t=jQuery(this).attr("data-parent");return jQuery(this).parents(t).find(e).trigger("click"),UM_hide_menus(),!1}),jQuery(".um-s1,.um-s2").css({display:"block"}),"function"==typeof jQuery.fn.select2&&(jQuery(".um-s1").select2({allowClear:!0}),jQuery(".um-s2").select2({allowClear:!1,minimumResultsForSearch:10}),jQuery(".um-s3").select2({allowClear:!1,minimumResultsForSearch:-1})),init_tipsy(),"function"==typeof jQuery.fn.um_raty&&(jQuery(".um-rating").um_raty({half:!1,starType:"i",number:function(){return jQuery(this).attr("data-number")},score:function(){return jQuery(this).attr("data-score")},scoreName:function(){return jQuery(this).attr("data-key")},hints:!1,click:function(e,t){live_field=this.id,live_value=e,um_apply_conditions(jQuery(this),!1)}}),jQuery(".um-rating-readonly").um_raty({half:!1,starType:"i",number:function(){return jQuery(this).attr("data-number")},score:function(){return jQuery(this).attr("data-score")},scoreName:function(){return jQuery(this).attr("data-key")},hints:!1,readOnly:!0})),jQuery(document).on("change",'.um-field-area input[type="radio"]',function(){var e=jQuery(this).parents(".um-field-area"),t=jQuery(this).parents("label");e.find(".um-field-radio").removeClass("active"),e.find(".um-field-radio").find("i").removeAttr("class").addClass("um-icon-android-radio-button-off"),t.addClass("active"),t.find("i").removeAttr("class").addClass("um-icon-android-radio-button-on")}),jQuery(document).on("change",'.um-field-area input[type="checkbox"]',function(){jQuery(this).parents(".um-field-area");var e=jQuery(this).parents("label");e.hasClass("active")?(e.removeClass("active"),e.find("i").removeAttr("class").addClass("um-icon-android-checkbox-outline-blank")):(e.addClass("active"),e.find("i").removeAttr("class").addClass("um-icon-android-checkbox-outline"))}),um_init_datetimepicker(),jQuery(document).on("click",".um .um-single-image-preview a.cancel",function(e){e.preventDefault();var t=jQuery(this).parents(".um-field"),a=jQuery(this).parents(".um-field").find(".um-single-image-preview img").attr("src");return t.find(".um-single-image-preview img").attr("src",""),t.find(".um-single-image-preview").hide(),t.find(".um-btn-auto-width").html("Upload"),t.find("input[type=hidden]").val("empty_file"),jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_remove_file",src:a,nonce:um_scripts.nonce}}),!1}),jQuery(document).on("click",".um .um-single-file-preview a.cancel",function(e){e.preventDefault();var t=jQuery(this).parents(".um-field"),a=jQuery(this).parents(".um-field").find(".um-single-fileinfo a").attr("href");return t.find(".um-single-file-preview").hide(),t.find(".um-btn-auto-width").html("Upload"),t.find("input[type=hidden]").val("empty_file"),jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_remove_file",src:a,nonce:um_scripts.nonce}}),!1}),jQuery(document).on("click",".um-field-group-head:not(.disabled)",function(){var e=jQuery(this).parents(".um-field-group"),t=e.data("max_entries");e.find(".um-field-group-body").is(":hidden")?e.find(".um-field-group-body").show():e.find(".um-field-group-body:first").clone().appendTo(e),increase_id=0,e.find(".um-field-group-body").each(function(){increase_id++,jQuery(this).find("input").each(function(){var e=jQuery(this);e.attr("id",e.data("key")+"-"+increase_id),e.attr("name",e.data("key")+"-"+increase_id),e.parent().parent().find("label").attr("for",e.data("key")+"-"+increase_id)})}),0<t&&e.find(".um-field-group-body").length==t&&jQuery(this).addClass("disabled")}),jQuery(document).on("click",".um-field-group-cancel",function(e){e.preventDefault();var t=jQuery(this).parents(".um-field-group"),a=t.data("max_entries");return 1<t.find(".um-field-group-body").length?jQuery(this).parents(".um-field-group-body").remove():jQuery(this).parents(".um-field-group-body").hide(),0<a&&t.find(".um-field-group-body").length<a&&t.find(".um-field-group-head").removeClass("disabled"),!1}),jQuery(document.body).on("click",".um-ajax-paginate",function(e){e.preventDefault();var t=jQuery(this),a=jQuery(this).parent();a.addClass("loading");var i=jQuery(this).data("hook");if("um_load_posts"===i){var r=1*jQuery(this).data("pages"),n=1*jQuery(this).data("page")+1;jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_ajax_paginate_posts",author:jQuery(this).data("author"),page:n,nonce:um_scripts.nonce},complete:function(){a.removeClass("loading")},success:function(e){a.before(e),n===r?a.remove():t.data("page",n)}})}else if("um_load_comments"===i){r=1*jQuery(this).data("pages"),n=1*jQuery(this).data("page")+1;jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_ajax_paginate_comments",user_id:jQuery(this).data("user_id"),page:n,nonce:um_scripts.nonce},complete:function(){a.removeClass("loading")},success:function(e){a.before(e),n===r?a.remove():t.data("page",n)}})}else{var u=jQuery(this).data("args"),o=jQuery(this).parents(".um").find(".um-ajax-items");jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_ajax_paginate",hook:i,args:u,nonce:um_scripts.nonce},complete:function(){a.removeClass("loading")},success:function(e){a.remove(),o.append(e)}})}}),jQuery(document).on("click",".um-ajax-action",function(e){e.preventDefault();var t=jQuery(this).data("hook"),a=jQuery(this).data("user_id"),arguments=jQuery(this).data("arguments");return jQuery(this).data("js-remove")&&jQuery(this).parents("."+jQuery(this).data("js-remove")).fadeOut("fast"),jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_muted_action",hook:t,user_id:a,arguments:arguments,nonce:um_scripts.nonce},success:function(e){}}),!1}),jQuery(document.body).on("click","#um-search-button",function(){var e=jQuery(this).parents(".um-search-form").data("members_page"),t=[];jQuery(this).parents(".um-search-form").find('input[name="um-search-keys[]"]').each(function(){t.push(jQuery(this).val())});var a,i=jQuery(this).parents(".um-search-form").find(".um-search-field").val();if(""===i)a=e;else{for(var r="?",n=0;n<t.length;n++)r+=t[n]+"="+i,n!==t.length-1&&(r+="&");a=e+r}window.location=a}),jQuery(document.body).on("keypress",".um-search-field",function(e){if(13===e.which){var t=jQuery(this).parents(".um-search-form").data("members_page"),a=[];jQuery(this).parents(".um-search-form").find('input[name="um-search-keys[]"]').each(function(){a.push(jQuery(this).val())});var i,r=jQuery(this).val();if(""===r)i=t;else{for(var n="?",u=0;u<a.length;u++)n+=a[u]+"="+r,u!==a.length-1&&(n+="&");i=t+n}window.location=i}}),jQuery('.um-form input[class="um-button"][type="submit"]').removeAttr("disabled"),jQuery(document).one("click",'.um:not(.um-account) .um-form input[class="um-button"][type="submit"]:not(.um-has-recaptcha)',function(){jQuery(this).attr("disabled","disabled"),jQuery(this).parents("form").submit()});var d={};function s(t,e,a,i){var r=t.parents(".um-directory"),n=t.data("um-parent"),u=t.attr("name");jQuery('select[name="'+n+'"]');t.find('option[value!=""]').remove(),t.hasClass("um-child-option-disabled")||t.removeAttr("disabled");i=[];if("yes"===e.post.members_directory&&i.push({id:"",text:"",selected:1}),jQuery.each(e.items,function(e,t){i.push({id:e,text:t,selected:""===t})}),t.select2("destroy"),t.select2({data:i,allowClear:!0,minimumResultsForSearch:10}),"yes"===e.post.members_directory){t.find("option").each(function(){""!==jQuery(this).html()&&jQuery(this).data("value_label",jQuery(this).html()).attr("data-value_label",jQuery(this).html())});var o=um_get_data_for_directory(r,"filter_"+u);if(void 0!==o){o=o.split("||");var s=[];jQuery.each(o,function(e){t.find('option[value="'+o[e]+'"]').length&&s.push(o[e]),t.find('option[value="'+o[e]+'"]').prop("disabled",!0).hide(),1===t.find("option:not(:disabled)").length&&t.prop("disabled",!0),t.select2("destroy").select2(),t.val("").trigger("change")}),s=s.join("||"),o!==s&&(um_set_url_from_data(r,"filter_"+u,s),um_ajax_get_members(r))}um_change_tag(r)}"yes"!==e.post.members_directory&&(void 0===e.field.default||t.data("um-original-value")?""!=t.data("um-original-value")&&t.val(t.data("um-original-value")).trigger("change"):t.val(e.field.default).trigger("change"),0==e.field.editable&&(t.addClass("um-child-option-disabled"),t.attr("disabled","disabled"))),d[a]=e}jQuery("select[data-um-parent]").each(function(){var n=jQuery(this),u=n.data("um-parent"),o=n.data("um-ajax-source");n.val();n.attr("data-um-init-field",!0),jQuery(document).on("change",'select[name="'+u+'"]',function(){var t,e=jQuery(this),a=e.closest("form").find('input[type="hidden"][name="form_id"]').val();if("yes"===n.attr("data-member-directory")){var i=e.parents(".um-directory");void 0!==(t=um_get_data_for_directory(i,"filter_"+u))&&(t=t.split("||"))}else t=e.val();if(void 0!==t&&""!=t&&"object"!=typeof d[t]&&jQuery.ajax({url:wp.ajax.settings.url,type:"post",data:{action:"um_select_options",parent_option_name:u,parent_option:t,child_callback:o,child_name:n.attr("name"),members_directory:n.attr("data-member-directory"),form_id:a,nonce:um_scripts.nonce},success:function(e){"success"==e.status&&""!=t&&s(n,e,t),void 0!==e.debug&&console.log(e)},error:function(e){console.log(e)}}),void 0!==t&&""!=t&&"object"==typeof d[t]){var r=d[t];s(n,r,t)}void 0===t&&""!=t||(n.find('option[value!=""]').remove(),n.val("").trigger("change"))}),jQuery('select[name="'+u+'"]').trigger("change")})});