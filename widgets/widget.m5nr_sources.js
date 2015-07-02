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
<p>The protein databases listed below were used to create the M5nr database.</p><div id="result" style="margin-top: 15px; text-align: center;"><img src="Retina/images/waiting.gif" style="width: 36px;"></div>';

	jQuery.ajax( { dataType: "json",
		       url: RetinaConfig.mgrast_api + '/m5nr/sources',
		       method: "GET",
		       success: function(data) {
			   var html = '<table class="table table-striped table-hover table-condensed"><thead><tr><th>database</th><th>type</th><th>date</th></tr></thead><tbody>'
			   for (var i=0; i<data.data.length; i++) {
			       html += "<tr><td>"+data.data[i].source+"</td><td>"+data.data[i].type+"</td><td>"+data.data[i].download_date+"</td></tr>";
			   }
			   html += "</tbody></table>";

			   document.getElementById('result').innerHTML = html;
		       },
		       error: function () {
			   document.getElementById('result').innerHTML = "<div class='alert alert-error' style='width: 50%;'>The query could not be completed</div>";
		       }
		     });
	
	content.innerHTML = html;
    };
})();
