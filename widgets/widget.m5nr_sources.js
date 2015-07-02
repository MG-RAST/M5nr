(function () {
    var widget = Retina.Widget.extend({
        about: {
                title: "M5NR Sources Widget",
                name: "m5nr_sources",
                author: "Tobias Paczian",
                requires: [  ]
        }
    });
    
    widget.setup = function () {
	return [];
    };
        
    widget.display = function (params) {
        var widget = Retina.WidgetInstances.m5nr_sources[1];
	
	if (params && params.main) {
	    widget.main = params.main;
	    widget.sidebar = params.sidebar;
	}
	var content = widget.main;
	widget.sidebar.parentNode.style.display = "none";

	jQuery.extend(widget, params);
	
	var html = '\
<h3>M5nr Data Sources</h3>\
<p>Not yet implemented</p>';

	content.innerHTML = html;
    };
})();
