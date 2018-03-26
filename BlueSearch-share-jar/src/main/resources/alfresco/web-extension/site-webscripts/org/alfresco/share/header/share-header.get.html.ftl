<@markup id="css" >
   <@link href="${url.context}/res/BlueSearch-share-jar/css/bluesearch/proxy-home.css" group="header"/>
   <#if config.global.header?? && config.global.header.legacyMode && config.global.header.dependencies?? && config.global.header.dependencies.css??>
      <#list config.global.header.dependencies.css as cssFile>
         <@link href="${url.context}/res${cssFile}" group="header"/>
      </#list>
   </#if>

</@>

<@markup id="js">
   <#if config.global.header?? && config.global.header.legacyMode && config.global.header.dependencies?? && config.global.header.dependencies.js??>
      <#list config.global.header.dependencies.js as jsFile>
         <@script src="${url.context}/res${jsFile}" group="header"/>
      </#list>
   </#if>
</@>

<@markup id="widgets">
   <@inlineScript group="dashlets">
      <#if page.url.templateArgs.site??>
         Alfresco.constants.DASHLET_RESIZE = ${siteData.userIsSiteManager?string} && YAHOO.env.ua.mobile === null;
      <#else>
         Alfresco.constants.DASHLET_RESIZE = ${((page.url.templateArgs.userid!"-") = (user.name!""))?string} && YAHOO.env.ua.mobile === null;
      </#if>
   </@>
   <@processJsonModel group="share"/>
</@>

<@markup id="html">

<header id="masthead" class="site-header" role="banner">
		<div id="container-header" class="align-content">
			<div id="content-header">
				<div class="site-branding">
					<img src="">
					<p class="site-title">Ministère de la Culture</p>
				</div><!-- .site-branding -->
				<div id="menu-principal">
					<nav id="site-navigation" class="main-navigation" role="navigation">
						<div class="menu-menu-principal-container">
							<ul id="primary-menu" class="menu">
								<li class="menu-item-40"><a title="Accueil" href="/share">Accueil</a></li>
								<li class="menu-item-41"><a title="Recherche avancée" href="/share/page/advsearch">Recherche avancée</a></li>
								<li class="menu-item-42"><a title="Se connecter" href="">Se connecter</a></li>
							</ul>
						</div>
					</nav><!-- #site-navigation -->
				</div>
			</div>
		</div>
</header>

</@>
