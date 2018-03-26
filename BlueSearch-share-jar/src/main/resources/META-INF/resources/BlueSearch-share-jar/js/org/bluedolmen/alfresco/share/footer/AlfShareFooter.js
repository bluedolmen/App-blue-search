define(
		[ "dojo/_base/declare", "dojo/text!./templates/AlfShareFooter.html",
				"alfresco/footer/AlfShareFooter" ],
		function(declare, template, AlfShareFooter) {
			return declare(
					[ AlfShareFooter ],
					{
						cssRequirements : [ {
							cssFile : "./css/AlfShareFooter.css"
						} ],
						i18nRequirements : [ {
							i18nFile : "./i18n/AlfShareFooter.properties"
						} ],

						postMixInProperties : function my_footer_AlfShareFooter__postMixInProperties() {
							this.inherited(arguments);
							this.templateString = template;
						}
					});
		});