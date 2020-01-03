"use strict";var calorie_calculator={BMR:0,activity_factor:0,persondata:{}}
var personDataUSUnit,personDataMetricUnit;var is_calcal_debug_mode=calcalpro_settings.debug_mode;function cal_dump(var_name,text=''){if(is_calcal_debug_mode){if(text){console.log(text,var_name);}else{console.log(var_name);}}}
if(!jQuery){throw new Error("jQuery isn't enabled. Calorie calculator needs jQuery to function!");}
jQuery(function($){function getParameterByName(name,url){if(!url)url=window.location.href;name=name.replace(/[\[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);if(!results)return null;if(!results[2])return'';return decodeURIComponent(results[2].replace(/\+/g," "));}
function is_calcal_admin_page(){var page=getParameterByName('page');if(page=='calorie-calculator/calorie-calculator.php'){return true;}
return false;}
if(is_calcal_admin_page()){$.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'calcalpro_check_license_validity'},success:function(response){cal_dump(response.data.license_data);},error:function(error){cal_dump(error);}});}
$(".calorie_calculator_general .calcalpro-custom-select").each(function(){var classes=$(this).attr("class"),id=$(this).attr("id"),name=$(this).attr("name");var template='<div class="'+classes+'">';template+='<span class="calcalpro-custom-select-trigger">'+$(this).attr("placeholder")+'</span>';template+='<div class="calcalpro-custom-options">';$(this).find("option").each(function(){template+='<span class="calcalpro-custom-option '+$(this).attr("class")+'" data-value="'+$(this).attr("value")+'">'+$(this).html()+'</span>';});template+='</div></div>';$(this).wrap('<div class="calcalpro-custom-select-wrapper"></div>');$(this).hide();$(this).after(template);});$(".calcalpro-custom-option:first-of-type").hover(function(){$(this).parents(".calcalpro-custom-options").addClass("option-hover");},function(){$(this).parents(".calcalpro-custom-options").removeClass("option-hover");});$(".calcalpro-custom-select-trigger").on("click",function(e){$('html').one('click',function(){$(".calcalpro-custom-select").removeClass("opened");});$(this).parents(".calcalpro-custom-select").toggleClass("opened");e.stopPropagation();});$(".calcalpro-custom-option").on("click",function(){$(this).parents(".calcalpro-custom-select-wrapper").find("select").val($(this).data("value"));$(this).parents(".calcalpro-custom-options").find(".calcalpro-custom-option").removeClass("selection");$(this).addClass("selection");$(this).parents(".calcalpro-custom-select").removeClass("opened");$(this).parents(".calcalpro-custom-select").find(".calcalpro-custom-select-trigger").text($(this).text());});$('.clear_form').click(function(){var $form=$(this).closest('form');$form.find("input[type=text], input[type=email], input[type=number], textarea").val("");$form.find("select").find('option:eq(0)').prop('selected',true);$form.find(".calcalpro-custom-options span").removeClass('selection');$('.calcalpro-custom-select-trigger').text($form.find("select").attr('placeholder'));$(document).trigger('calcalpro_form_cleared',$form);});$(document).on('calcalpro_form_cleared',function(e,form){console.log(form);$(form).closest('.calorie_calculator_general').find('.calorie_calculator_result').css({'display':'none'});});$('.calorie_calculator_general ul.tab_header_container li').on('click',function(e){var $container_id='';e.preventDefault();var $this=$(this);var $tab_container=$($this.find('a').first().attr('href'));if(!$this.hasClass('calcal_tab_active')){$this.siblings().removeClass('calcal_tab_active');$this.addClass('calcal_tab_active');$tab_container.siblings().removeClass('calcal_tab_open');$tab_container.addClass('calcal_tab_open');var switch_left_to_right=$this.parent('.tab_header_container').find('.switch-left-to-right').first();if($this.hasClass('left_tab')){switch_left_to_right.removeClass('right');}else{switch_left_to_right.addClass('right');}}});if(jQuery.isFunction(jQuery().tabs)){jQuery(".calorie_calculator_tabs").tabs({collapsible:true});}
if(jQuery.isFunction(jQuery().DataTable)){var food_calorie_table=jQuery('.calorie_calculator_food_chart_table').DataTable({"lengthMenu":[7,10,20,40,60,80],"pageLength":7,"language":{"lengthMenu":translation_array.show+" _MENU_","info":"","infoEmpty":translation_array.no_foods_to_show,"infoFiltered":"","zeroRecords":translation_array.no_foods_to_show,"search":"","searchPlaceholder":translation_array.search_food,"paginate":{"next":">>","previous":"<<"}}});var calorie_burning_table=jQuery('.calorie_calculator_burning_rate_table').DataTable({"lengthMenu":[7,10,20],"pageLength":7,"language":{"lengthMenu":translation_array.show+" _MENU_","info":"","infoEmpty":translation_array.no_exercises_to_show,"infoFiltered":"","zeroRecords":translation_array.no_exercises_to_show,"search":"","searchPlaceholder":translation_array.search_exercise,"paginate":{"next":">>","previous":"<<"}}});}
if(jQuery.isFunction(jQuery().tooltip)){jQuery('[data-toggle="tooltip"]').tooltip();}
if(jQuery('.calorie_calculator_bootstrap')&&jQuery.isFunction(jQuery().tooltip)==false){jQuery('.calorie_calculator_bootstrap').html('<span style="color: #a94442">It seems your theme doesn\'t support Twitter Bootstrap. Please disable Bootstrap styling and use default styling instead in Calorie Calculator widget setting.</span>');}
jQuery('.send_to_email_toggle_button').click(function(){var $this=jQuery(this);$this.hide();$this.parent().parent().find('.send_to_email_input, .send_to_email_submit').removeClass('hide');});jQuery('.send_to_email_form').submit(function(e){e.preventDefault();var $this=jQuery(this);$this.find('.send_to_email_submit').attr('value',translation_array.sending_email);var formdata=$this.serializeArray().reduce(function(obj,item){obj[item.name]=item.value;return obj;},{});jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'send_as_email',formdata:formdata,calculator_result:$this.parent().prev('.calorie_calculator_result').html()},success:function(data,textStatus,XMLHttpRequest){var loademailresult=$this.next('.email_sent_status');loademailresult.html('');loademailresult.append(data);loademailresult.css({'display':'block'});$this.find('.send_to_email_submit').attr('value',translation_array.send_me_an_email);},error:function(MLHttpRequest,textStatus,errorThrown){var loademailresult=$this.next('.email_sent_status');loademailresult.html('');loademailresult.append(translation_array.sorry_email_cannot_be_sent);loademailresult.css({'display':'block'});$this.find('.send_to_email_submit').attr('value',translation_array.send_me_an_email);}});});jQuery('.download_as_pdf_submit_initializer_button').click(function(e){var $this=jQuery(this);$this.hide().parent().next('form').removeClass('hide');var captcha_img_selector=$this.parent().next('.download_as_pdf').find('.calorie_calculator_captcha_img');generate_captcha(captcha_img_selector);});jQuery('.download_as_pdf').submit(function(e){e.preventDefault();var $this=jQuery(this);$this.children('.download_as_pdf_submit').attr('value',translation_array.downloading);$this.next('.download_as_pdf_status').html(translation_array.processing_download);var formdata=$this.serializeArray().reduce(function(obj,item){obj[item.name]=item.value;return obj;},{});jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'download_as_pdf',calculator_data:calorie_calculator,persondata:calorie_calculator.persondata,formdata:formdata},success:function(data,textStatus,XMLHttpRequest){var loadpdfdownloadstatus=$this.next('.download_as_pdf_status');loadpdfdownloadstatus.html('');loadpdfdownloadstatus.append(data);loadpdfdownloadstatus.css({'display':'block'});$this.children('.download_as_pdf_submit').attr('value',translation_array.download_as_pdf);$this.find('.calorie_verify_captcha').attr('value','');var captcha_img_selector=$this.find('.calorie_calculator_captcha_img');generate_captcha(captcha_img_selector);},error:function(MLHttpRequest,textStatus,errorThrown){var loadpdfdownloadstatus=$this.next('.download_as_pdf_status');loadpdfdownloadstatus.html('');loadpdfdownloadstatus.append(MLHttpRequest.responseText);$this.children('.download_as_pdf_submit').attr('value',translation_array.download_as_pdf);$this.find('.calorie_verify_captcha').attr('value','');var captcha_img_selector=$this.find('.calorie_calculator_captcha_img');generate_captcha(captcha_img_selector);}});});function generate_captcha(captcha_img_selector){var $this=captcha_img_selector;jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'generate_captcha'},success:function(data,textStatus,XMLHttpRequest){$this.attr('src',data);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});}
jQuery(".generate_another_captcha").click(function(e){e.preventDefault();var $this=jQuery(this);var captcha_img_selector=$this.parent().prev('.calorie_calculator_captcha_img');generate_captcha(captcha_img_selector);});jQuery("#food_calorie_create_new").click(function(e){var $this=jQuery(this);try{var food_calorie_data={food_name:$this.parent().parent().find('#food_calorie_food_name').attr('value'),food_amount:$this.parent().parent().find('#food_calorie_food_amount').attr('value'),food_calorie_amount:$this.parent().parent().find('#food_calorie_calorie_amount').attr('value')};if(!food_calorie_data.food_name||!food_calorie_data.food_amount||!food_calorie_data.food_calorie_amount){throw new Error('Please enter all required fields!');}
jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'create_food_calorie_post',food_calorie_data:food_calorie_data},success:function(data,textStatus,XMLHttpRequest){var row_class=$this.parent().parent().next().next().attr('class');var new_food_row='<tr role="row" class="'+row_class+' new_row_transition">';new_food_row+='<td>'+food_calorie_data.food_name+'</td>';new_food_row+='<td>'+food_calorie_data.food_amount+'</td>';new_food_row+='<td>'+food_calorie_data.food_calorie_amount+'</td>';new_food_row+='<td>';new_food_row+='<input type="button" value="Edit" id="food_calorie_edit" class="food_calorie_edit button" data-post-id="'+parseInt(data)+'" />';new_food_row+='<input type="button" value="Delete" id="delete_post" class="delete_post button" data-post-id="'+parseInt(data)+'" />';new_food_row+='</td>';new_food_row+='</tr>';$this.parent().parent().after(new_food_row);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});}catch(errorMessage){console.log(errorMessage);}});jQuery(document).on("click","#delete_post",function(e){var $this=jQuery(this);jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'delete_post',post_id:$this.attr('data-post-id')},success:function(data,textStatus,XMLHttpRequest){$this.parent().parent().remove();},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});});jQuery(document).on("click","#food_calorie_edit",function(e){var $this=jQuery(this);var food_calorie_data={food_name:$this.parent().prev().prev().prev().text(),food_amount:$this.parent().prev().prev().text(),food_calorie_amount:$this.parent().prev().text(),post_id:$this.attr('data-post-id')};var row_class=$this.parent().parent().attr('class');var new_food_row='<tr role="row" class="'+row_class+'">';new_food_row+='<td><input type="text" name="food_calorie_food_name" id="food_calorie_food_name" class="food_calorie_food_name" placeholder="Food Name" value="'+food_calorie_data.food_name+'" /></td>';new_food_row+='<td><input type="text" name="food_calorie_food_amount" id="food_calorie_food_amount" class="food_calorie_food_amount" placeholder="Amount" value="'+food_calorie_data.food_amount+'" /></td>';new_food_row+='<td><input type="text" name="food_calorie_calorie_amount" id="food_calorie_calorie_amount" class="food_calorie_calorie_amount" placeholder="Calorie Amount" value="'+food_calorie_data.food_calorie_amount+'" /></td>';new_food_row+='<td>';new_food_row+='<input type="button" value="Update" id="food_calorie_update" class="food_calorie_update button" data-post-id="'+food_calorie_data.post_id+'" />';new_food_row+='<input type="button" value="Delete" id="delete_post" class="delete_post button" data-post-id="'+food_calorie_data.post_id+'" />';new_food_row+='</td>';new_food_row+='</tr>';$this.parent().parent().replaceWith(new_food_row);});jQuery(document).on("click","#food_calorie_update",function(e){var $this=jQuery(this);var food_calorie_data={post_id:parseInt($this.attr('data-post-id')),food_name:$this.parent().parent().find('#food_calorie_food_name').attr('value'),food_amount:$this.parent().parent().find('#food_calorie_food_amount').attr('value'),food_calorie_amount:$this.parent().parent().find('#food_calorie_calorie_amount').attr('value')};jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'update_food_calorie_post',food_calorie_data:food_calorie_data},success:function(data,textStatus,XMLHttpRequest){var row_class=$this.parent().parent().attr('class');var new_food_row='<tr role="row" class="'+row_class+' new_row_transition">';new_food_row+='<td>'+food_calorie_data.food_name+'</td>';new_food_row+='<td>'+food_calorie_data.food_amount+'</td>';new_food_row+='<td>'+food_calorie_data.food_calorie_amount+'</td>';new_food_row+='<td>';new_food_row+='<input type="button" value="Edit" id="food_calorie_edit" class="food_calorie_edit button" data-post-id="'+food_calorie_data.post_id+'" />';new_food_row+='<input type="button" value="Delete" id="delete_post" class="delete_post button" data-post-id="'+food_calorie_data.post_id+'" />';new_food_row+='</td>';new_food_row+='</tr>';$this.parent().parent().replaceWith(new_food_row);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});});jQuery(document).on("click","#calorie_bunring_edit",function(e){var $this=jQuery(this);var calorie_burning_data={post_id:$this.attr('data-post-id'),activity:$this.parent().prev().prev().prev().prev().text(),person_125lbs:$this.parent().prev().prev().prev().text(),person_155lbs:$this.parent().prev().prev().text(),person_185lbs:$this.parent().prev().text()};var row_class=$this.parent().parent().attr('class');var new_calorie_burning_row='<tr role="row" class="'+row_class+'">';new_calorie_burning_row+='<td><input type="text" name="calorie_burning_activity" id="calorie_burning_activity" class="calorie_burning_activity" placeholder="Activity Name" value="'+calorie_burning_data.activity+'" /></td>';new_calorie_burning_row+='<td><input type="text" name="calorie_burning_person_125lbs" id="calorie_burning_person_125lbs" class="calorie_burning_person_125lbs" placeholder="Calorie Burning" value="'+calorie_burning_data.person_125lbs+'" /></td>';new_calorie_burning_row+='<td><input type="text" name="calorie_burning_person_155lbs" id="calorie_burning_person_155lbs" class="calorie_burning_person_155lbs" placeholder="Calorie Burning" value="'+calorie_burning_data.person_155lbs+'" /></td>';new_calorie_burning_row+='<td><input type="text" name="calorie_burning_person_185lbs" id="calorie_burning_person_185lbs" class="calorie_burning_person_185lbs" placeholder="Calorie Burning" value="'+calorie_burning_data.person_185lbs+'" /></td>';new_calorie_burning_row+='<td>';new_calorie_burning_row+='<input type="button" value="Update" id="calorie_burning_update" class="calorie_burning_update button" data-post-id="'+calorie_burning_data.post_id+'" />';new_calorie_burning_row+='<input type="button" value="Delete" id="delete_post" class="delete_post button" data-post-id="'+calorie_burning_data.post_id+'" />';new_calorie_burning_row+='</td>';new_calorie_burning_row+='</tr>';$this.parent().parent().replaceWith(new_calorie_burning_row);});jQuery("#calorie_burning_create_new").click(function(e){var $this=jQuery(this);try{var calorie_burning_data={activity:$this.parent().parent().find('#calorie_burning_activity').attr('value'),person_125lbs:$this.parent().parent().find('#calorie_burning_person_125lbs').attr('value'),person_155lbs:$this.parent().parent().find('#calorie_burning_person_155lbs').attr('value'),person_185lbs:$this.parent().parent().find('#calorie_burning_person_185lbs').attr('value')};if(!calorie_burning_data.activity||!calorie_burning_data.person_125lbs||!calorie_burning_data.person_155lbs||!calorie_burning_data.person_185lbs){throw new Error('Please enter all required fields!');}
jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'create_calorie_burning_post',calorie_burning_data:calorie_burning_data},success:function(data,textStatus,XMLHttpRequest){var row_class=$this.parent().parent().next().next().attr('class');var new_calorie_burning_row='<tr role="row" class="'+row_class+' new_row_transition">';new_calorie_burning_row+='<td>'+calorie_burning_data.activity+'</td>';new_calorie_burning_row+='<td>'+calorie_burning_data.person_125lbs+'</td>';new_calorie_burning_row+='<td>'+calorie_burning_data.person_155lbs+'</td>';new_calorie_burning_row+='<td>'+calorie_burning_data.person_185lbs+'</td>';new_calorie_burning_row+='<td>';new_calorie_burning_row+='<input type="button" value="Edit" id="calorie_bunring_edit" class="calorie_bunring_edit button" data-post-id="'+parseInt(data)+'" >';new_calorie_burning_row+='<input type="button" value="Delete" id="delete_post" class="delete_post button" data-post-id="'+parseInt(data)+'" >';new_calorie_burning_row+='</td>';new_calorie_burning_row+='</tr>';$this.parent().parent().after(new_calorie_burning_row);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});}catch(errorMessage){console.log(errorMessage);}});jQuery(document).on("click","#calorie_burning_update",function(e){var $this=jQuery(this);var calorie_burning_data={post_id:parseInt($this.attr('data-post-id')),activity:$this.parent().parent().find('#calorie_burning_activity').attr('value'),person_125lbs:$this.parent().parent().find('#calorie_burning_person_125lbs').attr('value'),person_155lbs:$this.parent().parent().find('#calorie_burning_person_155lbs').attr('value'),person_185lbs:$this.parent().parent().find('#calorie_burning_person_185lbs').attr('value')};jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'update_calorie_burning_post',calorie_burning_data:calorie_burning_data},success:function(data,textStatus,XMLHttpRequest){var row_class=$this.parent().parent().attr('class');var new_calorie_burning_row='<tr role="row" class="'+row_class+' new_row_transition">';new_calorie_burning_row+='<td>'+calorie_burning_data.activity+'</td>';new_calorie_burning_row+='<td>'+calorie_burning_data.person_125lbs+'</td>';new_calorie_burning_row+='<td>'+calorie_burning_data.person_155lbs+'</td>';new_calorie_burning_row+='<td>'+calorie_burning_data.person_185lbs+'</td>';new_calorie_burning_row+='<td>';new_calorie_burning_row+='<input type="button" value="Edit" id="calorie_bunring_edit" class="calorie_bunring_edit button" data-post-id="'+calorie_burning_data.post_id+'" >';new_calorie_burning_row+='<input type="button" value="Delete" id="delete_post" class="delete_post button" data-post-id="'+calorie_burning_data.post_id+'" >';new_calorie_burning_row+='</td>';new_calorie_burning_row+='</tr>';$this.parent().parent().replaceWith(new_calorie_burning_row);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});});jQuery(document).on('click','#delete_all_foods',function(e){var confirm_deletion=confirm("Do you really want to delete all foods?");if(confirm_deletion){jQuery(this).attr('value','Deleting...')
var $this=jQuery(this);$this.attr('value','Deleting all foods...');jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'delete_all_foods'},success:function(data,textStatus,XMLHttpRequest){$this.attr('value','Delete All Foods');var first_row=jQuery("#food_calorie_table_body tr.add_new_entry");food_calorie_table.rows().remove().draw();jQuery("#food_calorie_table_body").prepend(first_row);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});}});jQuery(document).on('click','#delete_all_activities',function(e){var confirm_deletion=confirm("Do you really want to delete all activites?");if(confirm_deletion){jQuery(this).attr('value','Deleting...')
var $this=jQuery(this);$this.attr('value','Deleting all activites...');jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{action:'delete_all_activities'},success:function(data,textStatus,XMLHttpRequest){$this.attr('value','Delete All Activities');var first_row=jQuery("#calorie_burning_table_body tr.add_new_entry");calorie_burning_table.rows().remove().draw();jQuery("#calorie_burning_table_body").prepend(first_row);},error:function(MLHttpRequest,textStatus,errorThrown){console.log(errorThrown);}});}});jQuery(document).on('click','.generate_shortcode',function(e){var shortcode='[calorie_calculator';var $this=jQuery(this);var $hide_name_field=$this.find('#hide_name_field');var $hide_lastname=$this.find('#hide_lastname');var $hide_email_field=$this.find('#hide_email_field');var $hide_send_to_email=$this.find("#hide_send_to_email_button");var $hide_download_as_pdf=$this.find("#hide_download_as_pdf_button");var $selected_unit=$this.find("#select_unit > option:selected");var $selected_styling=$this.find("#select_styling >option:selected");jQuery('#select_unit, #select_styling').change(function(){$this.click();});if($hide_name_field.prop('checked')){shortcode+=' show_name_field="false"';}
if($hide_lastname.prop('checked')){shortcode+=' show_firstname_only="true"';}
if($hide_email_field.prop('checked')){shortcode+=' show_email_field="false"';}
if($hide_send_to_email.prop('checked')){shortcode+=' send_to_email="false"';}
if($hide_download_as_pdf.prop('checked')){shortcode+=' download_as_pdf="false"';}
if($selected_unit.attr('value')=='usunit'){shortcode+=' unit="usunit"';}else if($selected_unit.attr('value')=='metricunit'){shortcode+=' unit="metricunit"';}
if($selected_styling.attr('value')!=''){shortcode+=' template="'+$selected_styling.attr('value')+'"';}
shortcode+=']';jQuery('.generated_shortcode > textarea').html(shortcode);});jQuery(".generated_shortcode_textarea").focus(function(e){jQuery(this).select();});jQuery(".calorie_calculator_form_us_units").submit(function(e){var $this=jQuery(this);e.preventDefault();var has_empty_field=false;try{var formData=$this.serializeArray().reduce(function(obj,item){var form_field=$this.find('input[name="'+item.name+'"]').first();if(item.value==''){has_empty_field=true;form_field.addClass('empty-highlight');form_field.closest('form-group').addClass('has-error');jQuery($this).on('keyup','input',function(e){if(this.value!=''){$(this).removeClass('empty-highlight');$(this).closest('form-group').addClass('has-error');}});}else{if(form_field.hasClass('empty-highlight')){form_field.removeClass('empty-highlight');form_field.closest('form-group').addClass('has-error');}}
obj[item.name]=item.value;return obj;},{});if(has_empty_field){$this.prepend('<div class="calorie_calculator_show_errors"><span class="calcal_flash_message">'+translation_array.please_fill_up_all_fields+'</span></div>');$('.calcal_flash_message').delay(500).fadeIn('normal',function(){$(this).delay(3500).fadeOut();$('.calorie_calculator_show_errors').remove();});throw new Error("Please Fill up all of the fields!");}
delete formData.calorie_calculator_form_nonce_field_action;calorie_calculator.persondata=formData;localStorage.setItem('personDataUSUnit',JSON.stringify(calorie_calculator.persondata));var BMR=0;console.log(formData);var age=formData.calorie_calculator_age,gender=formData.calorie_calculator_gender,height=(formData.calorie_calculator_height_feet*30.48)+(formData.calorie_calculator_height_inch*2.54),weight=formData.calorie_calculator_weight*0.453592,activity_factor=formData.calorie_calculator_activity,email=formData.user_email,first_name=formData.first_name,nonce=jQuery('#calorie_calculator_form_nonce_field_action').val();if(formData.calorie_calculator_gender=='male'){BMR=10*weight+6.25*height-5*age+5;}
if(formData.calorie_calculator_gender=='female'){BMR=10*weight+6.25*height-5*age-161;}
BMR=Math.round(BMR*activity_factor);calorie_calculator.BMR=BMR;calorie_calculator.activity_factor=activity_factor;if(activity_factor==1){var result='<p class="calorie_calculator_single_result green">'+translation_array.bmr+' = <span class="bmr_val">'+BMR+'</span> '+translation_array.calories_per_day+'.</p>';}else{var result='<p class="calorie_calculator_single_result green"><span>&#9755;</span> '+translation_array.you_need+' <span class="bmr_val">'+BMR+'</span> '+translation_array.calories_to_maintain_weight+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR-500)+' '+translation_array.calories_per_day_to_loose_1lb_per_week+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR-1000)+' '+translation_array.calories_per_day_to_loose_2lb_per_week+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR+500)+' '+translation_array.calories_per_day_to_gain_1lb_per_week+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR+1000)+' '+translation_array.calories_per_day_to_gain_2lb_per_week+'</p>';}
if(formData['template']=='bootstrap-general'){$this.parent().parent().parent().find(".calorie_calculator_result").css({'display':'block'}).html(result);$this.parent().parent().parent().find(".send_or_download").removeClass('hide');}else{$this.parent().parent().find(".calorie_calculator_result").css({'display':'block'}).html(result);$this.parent().parent().find(".send_or_download").removeClass('hide');}
if((email!=undefined||email!='')||(first_name!=undefined||first_name!='')){jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{'action':'create_new_form_submission_entry','formData':formData,'age':age,'gender':gender,'height':height,'weight':weight,'activity_factor':activity_factor,'user_email':formData.user_email,'BMR':BMR,'unit':'US Unit','nonce':nonce},success:function(data){console.log(data);},error:function(data){console.log(data);}});jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{'action':'subscribe_to_mailchimp_list','activity_factor':activity_factor,'email':formData.user_email,'first_name':formData.first_name,'last_name':formData.last_name,'status':'subscribed'},success:function(response){console.log(response.status);console.log(response.data);},error:function(response){console.log(response);}});}}catch(errorMessage){console.log(errorMessage);}});jQuery(".calorie_calculator_form_metric_units").submit(function(e){e.preventDefault();var $this=jQuery(this);var has_empty_field=false;try{var formData=$this.serializeArray().reduce(function(obj,item){var form_field=$this.find('input[name="'+item.name+'"]').first();if(item.value==''){has_empty_field=true;form_field.addClass('empty-highlight');form_field.closest('form-group').addClass('has-error');jQuery($this).on('keyup','input',function(e){if(this.value!=''){$(this).removeClass('empty-highlight');$(this).closest('form-group').addClass('has-error');}});}else{if(form_field.hasClass('empty-highlight')){form_field.removeClass('empty-highlight');form_field.closest('form-group').addClass('has-error');}}
obj[item.name]=item.value;return obj;},{});if(has_empty_field){$this.prepend('<div class="calorie_calculator_show_errors"><span class="calcal_flash_message">'+translation_array.please_fill_up_all_fields+'</span></div>');$('.calcal_flash_message').delay(500).fadeIn('normal',function(){$(this).delay(3500).fadeOut();$('.calorie_calculator_show_errors').remove();});throw new Error("Please Fill up all of the fields!");}
console.log(formData);delete formData.calorie_calculator_form_nonce_field_action;calorie_calculator.persondata=formData;localStorage.setItem('personDataMetricUnit',JSON.stringify(calorie_calculator.persondata));var BMR=0;var age=formData.calorie_calculator_age,gender=formData.calorie_calculator_gender,height=formData.calorie_calculator_height,weight=formData.calorie_calculator_weight,activity_factor=formData.calorie_calculator_activity,email=formData.user_email,first_name=formData.first_name,nonce=jQuery('#calorie_calculator_form_nonce_field_action').val();if(formData.calorie_calculator_gender=='male'){BMR=10*weight+6.25*height-5*age+5}
if(formData.calorie_calculator_gender=='female'){BMR=10*weight+6.25*height-5*age-161;}
BMR=Math.round(BMR*activity_factor);calorie_calculator.BMR=BMR;calorie_calculator.activity_factor=activity_factor;if(activity_factor==1){var result='<p class="calorie_calculator_single_result green">'+translation_array.bmr+' = <span class="bmr_val">'+BMR+'</span> '+translation_array.calories_per_day+'.</p>';}else{var result='<p class="calorie_calculator_single_result green"><span>&#9755;</span>  '+translation_array.you_need+' <span class="bmr_val">'+BMR+'</span> '+translation_array.calories_to_maintain_weight+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR-500)+' '+translation_array.calories_per_day_to_loose_point_5kg_per_week+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR-1000)+' '+translation_array.calories_per_day_to_loose_1kg_per_week+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR+500)+' '+translation_array.calories_per_day_to_gain_point_5kg_per_week+'</p>';result+='<p class="calorie_calculator_single_result"><span>&#9755;</span> '+translation_array.you_need+' '+(BMR+1000)+' '+translation_array.calories_per_day_to_gain_1kg_per_week+'</p>';}
if(formData['template']=='bootstrap-general'){$this.parent().parent().parent().find(".calorie_calculator_result").css({'display':'block'}).html(result);$this.parent().parent().parent().find(".send_or_download").removeClass('hide');}else{$this.parent().parent().find(".calorie_calculator_result").css({'display':'block'}).html(result);$this.parent().parent().find(".send_or_download").removeClass('hide');}
if((email!=undefined||email!='')||(first_name!=undefined||first_name!='')){jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{'action':'create_new_form_submission_entry','formData':formData,'age':age,'gender':gender,'height':height,'weight':weight,'activity_factor':activity_factor,'user_email':formData.user_email,'BMR':BMR,'unit':'Metric Unit','nonce':nonce}});}}catch(errorMessage){console.log(errorMessage);}});function create_calcalpro_options(options,initial_text,$this){var result='';jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{'action':'save_calcalpro_options','options':options},success:function(data){$this.text(initial_text);result=data
console.log(result);if(data=='success'){alert('Options saved successfully');}},error:function(data){$this.text(initial_text);}});}
jQuery("#save_calcalpro_options").on('click',function(e){e.preventDefault();var $this=jQuery(this);var initial_text=$this.text();var options={};var $form_data=jQuery('form').serializeArray();jQuery.each($form_data,function(i,field){if(field.value!=''){options[field.name]=field.value;}});if(!jQuery.isEmptyObject(options)){$this.text('Saving...');create_calcalpro_options(options,initial_text,$this);}else{alert('No data to save!');}});jQuery("#activate_calcalpro_license").on('click',function(e){e.preventDefault();var $this=jQuery(this);var initial_text=$this.text();var options={};var $form_data=jQuery('form').serializeArray();jQuery.each($form_data,function(i,field){if(field.value!=''){options[field.name]=field.value;}});var license_key=options['calcalpro_license_key'];if(license_key){$this.text('Activating your license key...');jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{'action':'calcalpro_activate_license_key','license_key':license_key},success:function(response){$this.text(initial_text);console.log(response.data.message);alert(response.data.message);},error:function(data){$this.text(initial_text);}});}else{alert('Please enter a valid License Key');}});jQuery("#deactivate_calcalpro_license").on('click',function(e){e.preventDefault();var $this=jQuery(this);var initial_text=$this.text();var options={};var $form_data=jQuery('form').serializeArray();jQuery.each($form_data,function(i,field){if(field.value!=''){options[field.name]=field.value;}});var license_key=options['calcalpro_license_key'];if(license_key){$this.text('Deactivating your license key...');jQuery.ajax({type:'POST',url:ajax_send_or_download_details.ajaxurl,data:{'action':'calcalpro_deactivate_license_key','license_key':license_key},success:function(response){$this.text(initial_text);console.log(response.data.message);alert(response.data.message);},error:function(data){$this.text(initial_text);}});}else{alert('Please enter a valid License Key');}});personDataUSUnit=JSON.parse(localStorage.getItem('personDataUSUnit'));personDataMetricUnit=JSON.parse(localStorage.getItem('personDataMetricUnit'));if(personDataUSUnit){for(var key in personDataUSUnit){if(!personDataUSUnit.hasOwnProperty(key))continue;var value=personDataUSUnit[key];if(key=='calorie_calculator_gender'){var selector='.calorie_calculator_form_us_units input[value="'+value+'"]';jQuery(selector).prop('checked',true);}else if(key=='calorie_calculator_activity'){var selector='.calorie_calculator_form_us_units option[value="'+value+'"]';jQuery(selector).prop('selected',true);jQuery(".calcalpro-custom-options span[data-value='"+value+"']").first().addClass('selection');jQuery('.calcalpro-custom-select-trigger').text(jQuery(selector).first().text());}else if(key=='template'){continue;}else if(key=='unit'){continue;}else{var selector='.calorie_calculator_form_us_units input[name="'+key+'"]';jQuery(selector).attr('value',value);}}}
if(personDataMetricUnit){for(var key in personDataMetricUnit){if(!personDataMetricUnit.hasOwnProperty(key))continue;var value=personDataMetricUnit[key];if(key=='calorie_calculator_gender'){var selector='.calorie_calculator_form_metric_units input[value="'+value+'"]';jQuery(selector).prop('checked',true);}else if(key=='calorie_calculator_activity'){var selector='.calorie_calculator_form_metric_units option[value="'+value+'"]';jQuery(selector).prop('selected',true);}else if(key=='template'){continue;}else if(key=='unit'){continue;}else{var selector='.calorie_calculator_form_metric_units input[name="'+key+'"]';jQuery(selector).attr('value',value);}}}});