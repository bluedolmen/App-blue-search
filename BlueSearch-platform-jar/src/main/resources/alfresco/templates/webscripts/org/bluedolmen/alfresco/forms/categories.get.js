( function() {
	
	var 
		rootPath = '/cm:categoryRoot/cm:generalclassifiable',
		path = url.templateArgs["path"] || '',
		isGetDescendants = /.*descendants$/.test(url.service),
		categories = []
	;

	// MAIN LOGIC
	
	main();
	setModel();
	
	// END MAIN
	
	function main() {
		
		categories = getCategories();
		
	}
	
	function getCategories() {
		
		var
			xpathRequest = rootPath + "/" + getEncodedPath(path),
			rootCategory
		;
		
		if (isGetDescendants) {
			
			// May be optimized (see children retrieving)
			xpathRequest += "//*";
			return search.xpathSearch(xpathRequest);
			
		}
		else {
			
			/* 
			 *  We may use also "/*" to retrieve the children but
			 *  as a side-effect, the search also retrieves all the associated
			 *  elements, which may be suboptimal (or even problematic) with
			 *  many linked documents
			 */
			
			rootCategory = search.xpathSearch(xpathRequest)[0];
			if (null == rootCategory) return [];
			
			return rootCategory.children;
			
		}
		
	}

	function getEncodedPath(path) {
		
		if (!path) return path;
		
		var
			pathSegments = path.split('/'),
			lastSegment = pathSegments[pathSegments.length - 1],
			transformedPath = [],
			i, len, pathSegment
		;
		
		for (i = 0, len = pathSegments.length; i < len; i++) {
			
			pathSegment = pathSegments[i];
			if (!pathSegment) continue;
			
			transformedPath.push('cm:' + search.ISO9075Encode(pathSegment));
			
		}

		return transformedPath.join("/");
		
	}
	
	function setModel() {
		
		var
			category, i, len, results = []
		;
		
		for (i = 0, len = categories.length; i < len; i++) {

			category = categories[i];

			// The request is able to retrieve all the elements associated to the category (as an unwanted side effect)
			// Use a basic filtering as a guard
			if ('cm:category' != category.typeShort) continue;
			
			results.push({
				item : category,
				selectable : true
			});

		}
		
		model.results = results;

	}
	
})();
