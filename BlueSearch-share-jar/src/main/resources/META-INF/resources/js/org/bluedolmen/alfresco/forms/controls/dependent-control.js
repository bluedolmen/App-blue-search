(function(BlueDolmen){
	
	BlueDolmen.Dependency = {};
	
    BlueDolmen.Dependency.changed = function(event, eventArr, handlerObject) {

        var changedItem = eventArr[1], dependencies;
        //changedItem is the object that was sent to the FIRE method
        //{
        //  itemId: property name that changed
        //  itemValue: new property value
        // }


        //handlerObject is the object that was fed to the ON method when we bound this event handler
        //handerObject.id is the property name that is checking if his dependsOn in the itemId
        //loop through this fields dependencies to see if we care about this change
        for (var i=0; i<handlerObject.options.dependsOn.length;i++) {
        	
        	if (handlerObject.options.dependsOn[i] === changedItem.itemId) {
        		console.log("matches my dependsOn, id" + handlerObject.id+", now querying for new values");
        		dependencies = {};
        		dependencies[changedItem.itemId] = changedItem.itemValue;
        		handlerObject.updateValues(dependencies);
        	}
        	
        }
    };
    
    BlueDolmen.Dependency.registerHandler = function(fieldId, htmlId) {
    	
    	//create a closure so we can get access to the htmlId field, since teh multiselects use a hidden field
    	(function() {
    		
        	YAHOO.util.Event.addListener(htmlId, "change", function(){
        		
        		var itemValue;
        		
        		if (htmlId.indexOf("-entry") === -1) {
        			itemValue = this.value;
        		}
        		else {
        			var actualValueElement = YAHOO.util.Dom.get(htmlId.substring(0, htmlId.indexOf("-entry")));
        			if (actualValueElement) {
        				itemValue = actualValueElement.value;
        			}
        		}
        		
        		//input value changed, fire a bubbling event with our fieldId, value
        		YAHOO.Bubbling.fire("BlueDolmen.changed", { itemId:fieldId, itemValue:itemValue });
        		
        	});
    		
    	}());
    	//fieldId = prop_cm_name or prop_shc_format, etc

    };
    	
}(window.BlueDolmen = window.BlueDolmen || {}));
