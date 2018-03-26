<#include "/org/alfresco/components/form/controls/common/utils.inc.ftl" />
<#if field.control.params.size??><#assign size=field.control.params.size><#else><#assign size=5></#if>

<#if field.control.params.optionSeparator??>
   <#assign optionSeparator=field.control.params.optionSeparator>
<#else>
   <#assign optionSeparator=",">
</#if>

<#if field.control.params.labelSeparator??>
   <#assign labelSeparator=field.control.params.labelSeparator>
<#else>
   <#assign labelSeparator="|">
</#if>

<#assign fieldValue=field.value>

<#if fieldValue?string == "" && field.control.params.defaultValueContextProperty??>
   <#if context.properties[field.control.params.defaultValueContextProperty]??>
      <#assign fieldValue = context.properties[field.control.params.defaultValueContextProperty]>
   <#elseif args[field.control.params.defaultValueContextProperty]??>
      <#assign fieldValue = args[field.control.params.defaultValueContextProperty]>
   </#if>
</#if>

<#if fieldValue?string != "">
   <#assign values=fieldValue?split(",")>
<#else>
   <#assign values=[]>
</#if>

<script type="text/javascript">//<![CDATA[
(function(BlueDolmen) {

	<#if form.mode == "view">
		new BlueDolmen.LoadLabel("${fieldHtmlId}-value")
	<#else>
		new BlueDolmen.DynamicDropdown("${fieldHtmlId}")
	</#if>
		.setOptions({
			datasourceUrl: "${field.control.params['datasourceUrl']}",
			initialValue:[
			              <#list values as value>
			              "${value}"<#if value_has_next>,</#if>
			              </#list>
			],
			itemId: "${(form.arguments.itemId!"")?js_string}",
			<#if field.control.params.itemsRoot??>itemsRoot:"${field.control.params['itemsRoot']}",</#if>
			<#if field.control.params.valueField??>valueField:"${field.control.params['valueField']}",</#if>
			<#if field.control.params.labelField??>labelField:"${field.control.params['labelField']}",</#if>
			<#if field.control.params.includeBlank??>includeBlank: ${field.control.params.includeBlank}
			<#else>includeBlank: <#if field.mandatory>false<#else>true</#if></#if>
		});

})(window.BlueDolmen = window.BlueDolmen || {});
//]]></script>

<div class="form-field">
   <#if form.mode == "view">
      <div class="viewmode-field">
         <#if field.mandatory && !(fieldValue?is_number) && fieldValue?string == "">
            <span class="incomplete-warning"><img src="${url.context}/res/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <#if fieldValue?string == "">
            <#assign valueToShow=msg("form.control.novalue")>
         <#else>
            <#if field.control.params.options?? && field.control.params.options != "" &&
                 field.control.params.options?index_of(labelSeparator) != -1>
                 <#assign valueToShow="">
                 <#assign firstLabel=true>
                 <#list field.control.params.options?split(optionSeparator) as nameValue>
                    <#assign choice=nameValue?split(labelSeparator)>
                    <#if isSelected(choice[0])>
                       <#if !firstLabel>
                          <#assign valueToShow=valueToShow+",">
                       <#else>
                          <#assign firstLabel=false>
                       </#if>
                       <#assign valueToShow=valueToShow+choice[1]>
                    </#if>
                 </#list>
            <#else>
               <#assign valueToShow=fieldValue>
            </#if>
         </#if>
         <span id="${fieldHtmlId}-value" class="viewmode-value">${valueToShow?html}</span>
      </div>
   <#else>
      <label for="${fieldHtmlId}-entry">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">${msg("form.required.fields.marker")}</span></#if></label>
      <input id="${fieldHtmlId}" type="hidden" name="${field.name}" value="${fieldValue?string}" />
      <#if field.control.params.isCategory??>
      <input id="${fieldHtmlId}_isCategory" type="hidden" name="${field.name}_isCategory" value="${field.control.params.isCategory?string}" />
      </#if>
      <select id="${fieldHtmlId}-entry" name="-" multiple size="${size}" tabindex="0"
           <#if field.description??>title="${field.description}"</#if> 
           <#if field.control.params.styleClass??>class="${field.control.params.styleClass}"</#if>
           <#if field.control.params.style??>style="${field.control.params.style}"</#if>
           <#if field.disabled && !(field.control.params.forceEditable?? && field.control.params.forceEditable == "true")>disabled="true"</#if>>
     </select>
     <@formLib.renderFieldHelp field=field />
   </#if>
</div>

<#function isSelected optionValue>
   <#list values as value>
      <#if optionValue == value?string || (value?is_number && value?c == optionValue)>
         <#return true>
      </#if>
   </#list>
   <#return false>
</#function>

