(function () {
    var widget = Retina.Widget.extend({
        about: {
                title: "M5NR Sequences Widget",
                name: "m5nr_sequences",
                author: "Tobias Paczian",
                requires: [  ]
        }
    });
    
    widget.setup = function () {
	return [];
    };
        
    widget.display = function (params) {
        var widget = Retina.WidgetInstances.m5nr_sequences[1];
	
	if (params && params.main) {
	    widget.main = params.main;
	    widget.sidebar = params.sidebar;
	}
	var content = widget.main;
	widget.sidebar.parentNode.style.display = "none";

	jQuery.extend(widget, params);
	
	var html = '\
<h3>Retrieve Sequences</h3>\
<p>Not yet implemented</p>';

	content.innerHTML = html;
    };
})();
