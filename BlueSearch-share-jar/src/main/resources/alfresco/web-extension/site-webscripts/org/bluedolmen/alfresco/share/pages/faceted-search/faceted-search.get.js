
/*
 * Customizations
 */

// Delete the top menu bar
widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "SHARE_HEADER");
widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_TITLE_BAR");
widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "HEADER_SHARE_SERVICES_WARNING");
widgetUtils.deleteObjectFromArray(model.jsonModel, "id", "ALF_SHARE_FOOTER");

// handle searchResult widget customization

/*
var widget_searchResult = widgetUtils.findObject(model.jsonModel.widgets, "id", "FCTSRCH_SEARCH_RESULT");
widget_searchResult.name = "org/bluedolmen/alfresco/share/search/AlfSearchResult";

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

// handle facets customization
var widget_facets = widgetUtils.findObject(model.jsonModel.widgets, "id", "FCTSRCH_SEARCH_FACET_LIST");
if (widget_facets && widget_facets.config && widget_facets.config.widgets) {
	var facets = widget_facets.config.widgets;
	for (var index in facets) {
		var facet = facets[index];
		// Don't keep default facets...
//		if (facet.id.indexOf("filter_") == -1 && ! contains(facets, facet.id)) {
//			facets.push(facet); // default
//		}
	}
}
 */