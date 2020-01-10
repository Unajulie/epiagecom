jQuery(function($){jQuery(function($){var ppec_mark_fields='#woocommerce_ppec_paypal_title, #woocommerce_ppec_paypal_description';var ppec_live_fields='#woocommerce_ppec_paypal_api_username, #woocommerce_ppec_paypal_api_password, #woocommerce_ppec_paypal_api_signature, #woocommerce_ppec_paypal_api_certificate, #woocommerce_ppec_paypal_api_subject';var ppec_sandbox_fields='#woocommerce_ppec_paypal_sandbox_api_username, #woocommerce_ppec_paypal_sandbox_api_password, #woocommerce_ppec_paypal_sandbox_api_signature, #woocommerce_ppec_paypal_sandbox_api_certificate, #woocommerce_ppec_paypal_sandbox_api_subject';var enable_toggle=$('a.ppec-toggle-settings').length>0;var enable_sandbox_toggle=$('a.ppec-toggle-sandbox-settings').length>0;$('#woocommerce_ppec_paypal_environment').change(function(){$(ppec_sandbox_fields+','+ppec_live_fields).closest('tr').hide();if('live'===$(this).val()){$('#woocommerce_ppec_paypal_api_credentials, #woocommerce_ppec_paypal_api_credentials + p').show();$('#woocommerce_ppec_paypal_sandbox_api_credentials, #woocommerce_ppec_paypal_sandbox_api_credentials + p').hide();if(!enable_toggle){$(ppec_live_fields).closest('tr').show();}}else{$('#woocommerce_ppec_paypal_api_credentials, #woocommerce_ppec_paypal_api_credentials + p').hide();$('#woocommerce_ppec_paypal_sandbox_api_credentials, #woocommerce_ppec_paypal_sandbox_api_credentials + p').show();if(!enable_sandbox_toggle){$(ppec_sandbox_fields).closest('tr').show();}}}).change();$('#woocommerce_ppec_paypal_enabled').change(function(){if($(this).is(':checked')){$(ppec_mark_fields).closest('tr').show();}else{$(ppec_mark_fields).closest('tr').hide();}}).change();$('#woocommerce_ppec_paypal_paymentaction').change(function(){if('sale'===$(this).val()){$('#woocommerce_ppec_paypal_instant_payments').closest('tr').show();}else{$('#woocommerce_ppec_paypal_instant_payments').closest('tr').hide();}}).change();if(enable_toggle){$(document).off('click','.ppec-toggle-settings');$(document).on('click','.ppec-toggle-settings',function(e){$(ppec_live_fields).closest('tr').toggle('fast');e.preventDefault();});}
if(enable_sandbox_toggle){$(document).off('click','.ppec-toggle-sandbox-settings');$(document).on('click','.ppec-toggle-sandbox-settings',function(e){$(ppec_sandbox_fields).closest('tr').toggle('fast');e.preventDefault();});}
$('.woocommerce_ppec_paypal_button_layout').change(function(event){if(!$('#woocommerce_ppec_paypal_use_spb').is(':checked')){return;}
var isVertical='vertical'===$(event.target).val();var table=$(event.target).closest('table');table.find('.woocommerce_ppec_paypal_vertical').closest('tr').toggle(isVertical);table.find('.woocommerce_ppec_paypal_horizontal').closest('tr').toggle(!isVertical);var button_size=table.find('.woocommerce_ppec_paypal_button_size');var button_size_option=button_size.find('option[value="small"]');if(button_size_option.prop('disabled')!==isVertical){button_size.removeClass('enhanced');button_size_option.prop('disabled',isVertical);$(document.body).trigger('wc-enhanced-select-init');!button_size.val()&&button_size.val('responsive').change();}}).change();function showHideDefaultButtonSettings(){var display=$('#woocommerce_ppec_paypal_cart_checkout_enabled').is(':checked')||($('#woocommerce_ppec_paypal_checkout_on_single_product_enabled').is(':checked')&&!$('#woocommerce_ppec_paypal_single_product_settings_toggle').is(':checked'))||($('#woocommerce_ppec_paypal_mark_enabled').is(':checked')&&!$('#woocommerce_ppec_paypal_mark_settings_toggle').is(':checked'));$('#woocommerce_ppec_paypal_button_layout, #woocommerce_ppec_paypal_button_size, #woocommerce_ppec_paypal_hide_funding_methods, #woocommerce_ppec_paypal_credit_enabled').closest('tr').toggle(display);display&&$('#woocommerce_ppec_paypal_button_layout').change();}
$('#woocommerce_ppec_paypal_cart_checkout_enabled').change(function(event){if(!$('#woocommerce_ppec_paypal_use_spb').is(':checked')){return;}
var checked=$(event.target).is(':checked');$('#woocommerce_ppec_paypal_mini_cart_settings_toggle, .woocommerce_ppec_paypal_mini_cart').closest('tr').add('#woocommerce_ppec_paypal_mini_cart_settings').next('p').addBack().toggle(checked);checked&&$('#woocommerce_ppec_paypal_mini_cart_settings_toggle').change();showHideDefaultButtonSettings();}).change();$('#woocommerce_ppec_paypal_mini_cart_settings_toggle').change(function(event){var checked=$(event.target).is(':checked');$('.woocommerce_ppec_paypal_mini_cart').closest('tr').toggle(checked);checked&&$('#woocommerce_ppec_paypal_mini_cart_button_layout').change();showHideDefaultButtonSettings();}).change();$('#woocommerce_ppec_paypal_checkout_on_single_product_enabled, #woocommerce_ppec_paypal_single_product_settings_toggle').change(function(event){if(!$('#woocommerce_ppec_paypal_use_spb').is(':checked')){return;}
if(!$('#woocommerce_ppec_paypal_checkout_on_single_product_enabled').is(':checked')){$('#woocommerce_ppec_paypal_single_product_settings_toggle, .woocommerce_ppec_paypal_single_product').closest('tr').hide();}else if(!$('#woocommerce_ppec_paypal_single_product_settings_toggle').is(':checked')){$('#woocommerce_ppec_paypal_single_product_settings_toggle').closest('tr').show();$('.woocommerce_ppec_paypal_single_product').closest('tr').hide();}else{$('#woocommerce_ppec_paypal_single_product_settings_toggle, .woocommerce_ppec_paypal_single_product').closest('tr').show();$('#woocommerce_ppec_paypal_single_product_button_layout').change();}
showHideDefaultButtonSettings();}).change();$('#woocommerce_ppec_paypal_mark_enabled, #woocommerce_ppec_paypal_mark_settings_toggle').change(function(){if(!$('#woocommerce_ppec_paypal_use_spb').is(':checked')){return;}
if(!$('#woocommerce_ppec_paypal_mark_enabled').is(':checked')){$('#woocommerce_ppec_paypal_mark_settings_toggle, .woocommerce_ppec_paypal_mark').closest('tr').hide();}else if(!$('#woocommerce_ppec_paypal_mark_settings_toggle').is(':checked')){$('#woocommerce_ppec_paypal_mark_settings_toggle').closest('tr').show();$('.woocommerce_ppec_paypal_mark').closest('tr').hide();}else{$('#woocommerce_ppec_paypal_mark_settings_toggle, .woocommerce_ppec_paypal_mark').closest('tr').show();$('#woocommerce_ppec_paypal_mark_button_layout').change();}
showHideDefaultButtonSettings();}).change();$('#woocommerce_ppec_paypal_use_spb').off('change');$('#woocommerce_ppec_paypal_use_spb').change(function(event){var checked=$(event.target).is(':checked');$('.woocommerce_ppec_paypal_spb').not('h3 ').closest('tr').toggle(checked);$('.woocommerce_ppec_paypal_spb').filter('h3').next('p').addBack().toggle(checked);if(checked){$('.woocommerce_ppec_paypal_visibility_toggle').change();}else{$('#woocommerce_ppec_paypal_button_size, #woocommerce_ppec_paypal_credit_enabled').closest('tr').show();}
var button_size=$('#woocommerce_ppec_paypal_button_size').removeClass('enhanced');button_size.find('option[value="responsive"]').prop('disabled',!checked);!checked&&button_size.find('option[value="small"]').prop('disabled',false);$(document.body).trigger('wc-enhanced-select-init');}).change();$('#woocommerce_ppec_paypal_use_spb').change(function(event){if($(event.target).is(':checked')){$('#woocommerce_ppec_paypal_button_size').val('responsive').change();}else if(!$('#woocommerce_ppec_paypal_button_size').val()){$('#woocommerce_ppec_paypal_button_size').val('large').change();}});});});