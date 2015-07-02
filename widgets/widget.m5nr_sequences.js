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
	var sidebar = widget.sidebar;

	jQuery.extend(widget, params);
	
	var html = '\
<h3>Retrieve Sequences</h3>\
<p>To retrieve the sequence data for identifiers or md5 checksums within the M5nr, please enter the identifier or md5sum below and press Retrieve. It is possible to retrieve sequences for multiple identifiers by entering a comma separated list of querys.</p>\
<div class="input-append">\
  <input type="text" placeholder="enter ID or md5" id="searchtext" style="border-radius: 15px 0 0 15px; width: 500px;">\
  <button class="btn" onclick="Retina.WidgetInstances.m5nr_sequences[1].queryAPI();" style="border-radius: 0 15px 15px 0;">retrieve</button>\
</div>\
<div id="result" style="margin-top: 15px;"></div>';

	content.innerHTML = html;

	var html_sidebar = '\
<h3 style="margin-left: 10px;">\
  <img style="height: 20px; position: relative; bottom: 4px; margin-right: 10px;" src="Retina/images/help.png">\
  Example Searches\
</h3>\
<div style="margin-left: 10px; margin-right: 10px;">\
  <ul>\
    <li>search for an md5:<br><a href="#" onclick="Retina.WidgetInstances.m5nr_sequences[1].queryAPI(\'068792e95e38032059ba7d9c26c1be78\');">068792e95e38032059ba7d9c26c1be78</a><br><br></li>\
    <li>search for an ID:<br><a href="#" onclick="Retina.WidgetInstances.m5nr_sequences[1].queryAPI(\'fig|768491.12.peg.226\', true);">fig|768491.12.peg.226</a><br><br></li>\
  </ul>\
</div>\
';
	
	sidebar.innerHTML = html_sidebar;
    };

    widget.showResult = function (data) {
	var widget = Retina.WidgetInstances.m5nr_sequences[1];

	document.getElementById('result').innerHTML = "<pre>"+data+"</pre>";
    };

    widget.queryAPI = function (searchstring, isId) {
	var widget = Retina.WidgetInstances.m5nr_sequences[1];
	
	document.getElementById('result').innerHTML = "<div style='text-align: center;'><img src='Retina/images/waiting.gif' style='width: 36px;'></div>";

	// check passed params
	if (searchstring) {
	    document.getElementById('searchtext').value = searchstring;
	}

	// get searchstring
	var query = document.getElementById("searchtext").value;
	var idlist = query.replace(/\s+/g, "").split(/,/);

	// check if id needs to be resolved
	if (isId) {
	    jQuery.ajax( { dataType: "json",
			   url: RetinaConfig.mgrast_api + '/m5nr/accession',
			   method: "POST",
			   data: '{"limit":10000,"data":["'+idlist.join('","')+'"],"sequence":true,"version":10}',
			   processData: false,
			   success: function(data) {
			       var md5s = [];
			       for (var i=0; i<data.data.length; i++) {
				   md5s.push(data.data[i].md5);
			       }
			       Retina.WidgetInstances.m5nr_sequences[1].queryAPI(md5s.join(", "));
			   },
			   error: function () {
			       document.getElementById('result').innerHTML = "<div class='alert alert-error' style='width: 50%;'>The query could not be completed</div>";
			   }
		     });
	    return;
	}


	var url = RetinaConfig.mgrast_api + '/m5nr/md5';
	
	jQuery.ajax( { dataType: "json",
		       url: url,
		       method: "POST",
		       data: '{"limit":10000,"data":["'+idlist.join('","')+'"],"sequence":true,"version":10}',
		       processData: false,
		       success: function(data) {
			   Retina.WidgetInstances.m5nr_sequences[1].showResult(data);
		       },
		       error: function () {
			   document.getElementById('result').innerHTML = "<div class='alert alert-error' style='width: 50%;'>The query could not be completed</div>";
		       }
		     });
	return;
    };
})();
