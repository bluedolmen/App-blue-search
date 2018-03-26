<@markup id="css" >
   <#-- CSS Dependencies -->
   <@link href="${url.context}/res/modules/about-share.css" group="footer"/>
   <@link href="${url.context}/res/components/footer/footer.css" group="footer"/>
   <@link href="${url.context}/res/modules/about-share.css" group="footer"/>
</@>

<@markup id="js">
   <@script src="${url.context}/res/modules/about-share.js" group="footer"/>
</@>

<@markup id="widgets">
   <@createWidgets/>
</@>

<@markup id="html">
    <@uniqueIdDiv>

<div class="footer">

	<div class="copyright">
  		<div class="col1">©2018 Ministère de la Culture</div>
  		<div class="col2">
			<a href="${url.context}/proxy/alfresco/html/mentions-legales.html">Mentions légales</a> -
			<a href="${url.context}/proxy/alfresco/html/contact.html">Contact</a>
		</div>
	</div>

</div>

    </@>
</@>
