(function(BlueDolmen) {
	
	var Dom = YAHOO.util.Dom,
	Event = YAHOO.util.Event;
	var $html = Alfresco.util.encodeHTML;

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(elt /* , from */) {
			
			var 
				len = this.length >>> 0,
				from = Number(arguments[1]) || 0
			;

			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) from += len;

			for (; from < len; from++) {
				if (from in this && this[from] === elt) return from;
			}
			
			return -1;
			
		};
	}
	
	BlueDolmen.DatasourceComponent = function(name, htmlId, components) {
		
		BlueDolmen.DatasourceComponent.superclass.constructor.call(this, name || "BlueDolmen.DatasourceComponent", htmlId, components)
		
		return this;
		
	}
	
	YAHOO.extend(BlueDolmen.DatasourceComponent, Alfresco.component.Base, {
		
		options : {
			itemId        : "",   // The item-id of the enclosing element
			initialValue  : "",   // The initial-value the element should be filled with
			includeBlank  : true, // Whether the blank value is authorized
			// Consider the value as an assoc; in this case, hidden fields added and removed are
			// set in order to be interpreted correctly by the form-processor
			asAssoc       : false, 
			// Datasource definition 
			datasourceUrl : null, // datasource URL (will be prefixed by the Alfresco Share Proxy)
			itemsRoot     : 'items', // The name of the root items element 
			valueField    : 'value', // The name of the value-field  
			labelField    : 'label'  // The name of the label field (the value actually displayed to the user)
		},
		
		onReady : function DatasourceComponent_onReady() {
			
			this._el = this.getFormField();
			this.loadValues();
			
		},
		
		loadValues : function() {
			            
            var url = Alfresco.constants.PROXY_URI + this.options.datasourceUrl;
            
            Alfresco.util.Ajax.request({
            	
               url: url,
               method: "GET",
               responseContentType : "application/json",
               
               successCallback: {
                  fn: this.onSuccess,
                  scope: this
               },
               
               failureCallback: {
                  fn: this.onFailure,
                  scope: this
               }
               
            });

		},
		
		onSuccess : function(response) {
			
			this.onLoad(response);
			
        	var
	    		json = response.json, 
	    		items = this._getItems(json)
	    	;
	    	
	    	if (!items) return;
	    	
	    	this.parseItems(items)

		},
		
		_getItems : function(json) {
			
			if (!json) return null;
			
			var 
				pathParts = this.options.itemsRoot.split("."),
				items = json, i, len
			;
			
			for (i = 0, len = pathParts.length; i < len; i++) {
				
				items = items[pathParts[i]];
				if (null == items) return null;
				
			}
			
			return items;
			
		},
		
		parseItems : function(items) {
			
        	var
	    		i, len, item, value, label
	    	;
	    	
        	if (!items) return;
        	
        	if (this.options.includeBlank) {
        		this.parseItem("","",{value : "", label : ""});
        	}
        	
        	//response is the already parsed JSON response
			for (i=0, len = items.length; i<len; i++) {
				
				item = items[i];
				label = item[this.options.labelField];
				value = item[this.options.valueField];
				
				this.parseItem(value, label, item);
				
			}
			
		},
		
		// return false to stop iterating
		parseItem : function(value, label, item) {
			// to be overloaded
		},
		
		onFailure : function(response) {
			
			this.onLoad(response);
			
        	// hide the whole field so incorrect content does not get re-submitted
        	this._hideField();
           
        	if (Alfresco.logger.isDebugEnabled()) {
        		Alfresco.logger.debug("Hidden field '" + this.id + "' as content retrieval failed");
        	}			
			
		},
		
		onLoad : function() {
			
		},
		
		_hideField : function() {
			
			if (!this._el) return;
			this._el.hidden = true;
			
		},
		
		getFormField : function() {
			
			if (null == this._el) {
				this._el = Dom.get(this.id);
			}
			
			return this._el;
			
		}
		
	});
	
    BlueDolmen.LoadLabel = function(htmlId) {

    	BlueDolmen.LoadLabel.superclass.constructor.call(this, "BlueDolmen.LoadLabel", htmlId, [])
    	return this;
		
	};
	
	YAHOO.extend(BlueDolmen.LoadLabel, BlueDolmen.DatasourceComponent, {
		
		parseItem : function(value, label, item) {
			
			var me = this;
			
			if (this.options.initialValue == value) {
				setLabel(label);
				return false;
			}
			
            function setLabel(label) {
            	me._el.innerHTML = label;
            }
            
		}
		
   });
	
	
	

	BlueDolmen.DynamicDropdown = function(htmlId) {
		
		BlueDolmen.DynamicDropdown.superclass.constructor.call(this, "BlueDolmen.DynamicDropdown", htmlId, []);
		return this;
		
	};
	
	YAHOO.extend(BlueDolmen.DynamicDropdown, BlueDolmen.DatasourceComponent, {
		
		onReady : function() {
			
			this.inputField = Dom.get(this.id); // input should be interpreted as form-input
			if (this.options.initialValue && true !== this.options.asAssoc) {
				this.inputField.value = this.options.initialValue;
			}
			
			var entryFieldId = this.id + '-entry';
			this.entryField = Dom.get(entryFieldId); // whereas entry is the actual entry (select) element
        	YAHOO.util.Event.addListener(entryFieldId, "change", this._onChange, this, true);
        	if (this.entryField.form) {
        		YAHOO.util.Event.addListener(this.entryField.form, "submit", this._onSubmit, this, true);
        	}

			if (true === this.options.asAssoc) {
				this.addedField = Dom.get(this.id + '-added');
				this.removedField = Dom.get(this.id + '-removed');
			}
			
        	return BlueDolmen.DynamicDropdown.superclass.onReady.call(this);
			
		},  
		
		onLoad : function(response) {
			
			var me = this;
			
        	clearOptions();
        	
    		function clearOptions() {
    			
    			var selectEl = me.entryField;
    			
            	//clear selected item
            	selectEl.selectedIndex = -1;
            	
            	//clear the current dropdown options
            	while (selectEl.hasChildNodes()) {
            		selectEl.removeChild(selectEl.lastChild);
            	}
            	    			
    		}
			
		},
		
		parseItems : function(items) {

			// Call the parent that will eventually build options by calling the parseItem() method
			BlueDolmen.DynamicDropdown.superclass.parseItems.apply(this, arguments);
			
			// If a value is mandatory, it is enforced by the mandatory feature of the <select>
			// which seems to set the first <option> value.
			// When setting a mandatory value by this side effect, the "change" event seems not to be fired
			// and the inputField value may not be initialized correctly. So we have to call
			// _onChange explicitely after loading the values as options.
			this._onChange.call(this);
			
		},
        
		parseItem : function(value, label, item) {
			
			var
				me = this,
				optionElement = _buildOptionElement(value, label), 
				selectEl = this.entryField
			;
			
			selectEl.appendChild(optionElement);
			
            function _buildOptionElement(value, label) {
            	
            	var optionElement = document.createElement("option");
				optionElement.innerHTML = label;
				optionElement.value = value;
				
				if (_isOptionSelected(value) ) {
					optionElement.selected = "selected";
				}
            	
				return optionElement;
				
            }
			
            function _isOptionSelected(value) {
            	
            	return ( 
            		( me.options.initialValue == value ) || 
            		( me.options.initialValue instanceof Array && me.options.initialValue.indexOf(value) !== -1 ) 
            	);
            	
            }
            
		},
		
		_onChange : function() {
			
			// Performing the work of: Alfresco.util.updateMultiSelectListValue
			
    		var 
				itemValue = this._getSelectedOptionValues().join(","),
				valueHasChanged = (this.inputField.value != itemValue)
			;
			
			if (true === this.options.asAssoc) {
				this.removedField.value = this.options.initialValue;
				this.addedField.value = itemValue;
			}
			else {
				this.inputField.value = itemValue;
			}
	
			if (valueHasChanged) {
				//input value changed, fire a bubbling event with our fieldId, value
				YAHOO.Bubbling.fire("bluedolmen.changed", { itemId : this.id, itemValue : itemValue} );
			}
			
		},
		
		_getSelectedOptionValues : function() {
			
			var
				options = this.entryField.options,
				selectedOptions = [],
				i, len, option
			;
			
			for (i = 0, len = options.length; i < len; i++) {
				option = options[i];
				
				if (true !== option.selected) continue;
				selectedOptions.push(option.value);
			}
			
			return selectedOptions;
			
		},
		
		_onSubmit : function() {
			
			this.entryField.disabled = true;
			
		}
		
   });
	
})(window.BlueDolmen = window.BlueDolmen || {});