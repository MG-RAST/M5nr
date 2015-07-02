(function () {
    var widget = Retina.Widget.extend({
        about: {
                title: "M5NR Search Widget",
                name: "m5nr_search",
                author: "Tobias Paczian",
                requires: [  ]
        }
    });
    
    widget.setup = function () {
	return [ Retina.load_renderer("table") ];
    };

    widget.type = "accession";
        
    widget.display = function (params) {
        var widget = Retina.WidgetInstances.m5nr_search[1];
	
	if (params && params.main) {
	    widget.main = params.main;
	    widget.sidebar = params.sidebar;
	}
	var content = widget.main;
	var sidebar = widget.sidebar;

	jQuery.extend(widget, params);
	
	var html = "\
<h3>Searching within the M5NR</h3>\
<p>Welcome to the web search of the M5nr. You can search for data associated with proteins from the following categories: source ids, functions, organisms, sequences, or md5 checksums. For function or organism annotaion, you can search for data with an exact match to your query, or for data that matches part of your query. It is possible to search for multiple types of data by entering a comma separated list of queries.</p>\
<p>Choose a search category and enter a search query. Optionally select exact or partial match.</p>\
<div id='message'></div>\
<div style='margin-top: 20px;'>";

	// option buttons
	html += "\
  <div style='width: 175px;'>\
    <div class='btn-group' data-toggle='buttons-radio'>\
      <button class='btn btn-mini active' data-toggle='button' id='accession_button' onclick='Retina.WidgetInstances.m5nr_search[1].type=\"accession\";'>source ID</button>\
      <button class='btn btn-mini' data-toggle='button' id='function_button' onclick='Retina.WidgetInstances.m5nr_search[1].type=\"function\";'>function</button>\
      <button class='btn btn-mini' data-toggle='button' id='organism_button' onclick='Retina.WidgetInstances.m5nr_search[1].type=\"organism\";'>organism</button>\
      <button class='btn btn-mini' data-toggle='button' id='sequence_button' onclick='Retina.WidgetInstances.m5nr_search[1].type=\"sequence\";'>sequence</button>\
      <button class='btn btn-mini' data-toggle='button' id='md5_button' onclick='Retina.WidgetInstances.m5nr_search[1].type=\"md5\";'>MD5</button>\
    </div>\
  </div>";

	// searchbox
	html += "\
  <div style='margin-top: 15px; margin-bottom: 25px;'>\
    <div class='input-append'>\
      <input type='text' id='searchtext' style='border-radius: 15px 0 0 15px; width: 500px;' placeholder='enter search term'>\
      <button class='btn' onclick='Retina.WidgetInstances.m5nr_search[1].queryAPI();' style='border-radius: 0 15px 15px 0;'>search</button>\
    </div>\
  </div>";


	// result text
	html += "\
</div>";
	
	// result section
	html += "<div id='result' style='clear: both;'></div>";
	
	content.innerHTML = html;

	widget.message = document.getElementById('message');

	document.getElementById('searchtext').addEventListener('keypress', function (event) {
	    event = event || window.event;
	    
	    if (event.keyCode == 13) {
		Retina.WidgetInstances.m5nr_search[1].queryAPI();
	    }
	});

	// create the sidebar
	var html_sidebar = '\
<h3 style="margin-left: 10px;">\
  <img style="height: 20px; position: relative; bottom: 4px; margin-right: 10px;" src="Retina/images/help.png">\
  Example Searches\
</h3>\
<div style="margin-left: 10px; margin-right: 10px;">\
  <ul>\
    <li>search for a SEED id:<br><a href="#" onclick="Retina.WidgetInstances.m5nr_search[1].queryAPI(\'accession\', \'fig|171101.1.peg.262\');">fig|171101.1.peg.262</a><br><br></li>\
    <li>search for a KEGG id:<br><a href="#" onclick="Retina.WidgetInstances.m5nr_search[1].queryAPI(\'accession\', \'spv:SPH_0401\');">spv:SPH_0401</a><br><br></li>\
    <li>search for multiple ids:<br><a href="#" onclick="Retina.WidgetInstances.m5nr_search[1].queryAPI(\'accession\', \'fig|171101.1.peg.262, spv:SPH_0401\');">fig|171101.1.peg.262, spv:SPH_0401</a><br><br></li>\
    <li>retrieve the sequence for an id:<br><a href="#" onclick="Retina.WidgetInstances.m5nr_search[1].queryAPI(\'accession\', \'NP_357856.1\');">NP_357856.1</a></li>\
  </ul>\
</div>\
';
	
	sidebar.innerHTML = html_sidebar;
	// check if a search got passed
	if (Retina.cgiParam("search")) {
	    document.getElementById('searchtext').value = Retina.cgiParam("search");
	}
    };
    
    widget.resultTable = function (data) {
	var widget = Retina.WidgetInstances.m5nr_search[1];

	var tableData = [];
	for (var i=0; i<data.data.length; i++) {
	    var d = data.data[i];
	    tableData.push([d.source, d.function, d.ncbi_tax_id, d.accession, d.type, d.organism, d.md5, d.alias ? d.alias.join(", ") : "-" ]);
	}
	delete Retina.RendererInstances.table[1];
	Retina.Renderer.create("table", {
	    target: document.getElementById('result'),
	    rows_per_page: 20,
	    filter_autodetect: true,
	    sort_autodetect: true,
	    minwidths: [85,100,120,105,70,100,1,70],
	    invisible_columns: { 6: true },
	    data: { data: tableData, header: [ "source", "function", "NCBI tax ID", "accession", "type", "organism", "md5", "alias" ] },
	}).render();
    };

    widget.queryAPI = function (type, searchstring) {
	var widget = Retina.WidgetInstances.m5nr_search[1];
	
	document.getElementById('result').innerHTML = "<div style='text-align: center;'><img src='Retina/images/waiting.gif' style='width: 36px;'></div>";

	// check passed params
	if (type) {
	    document.getElementById(type+'_button').click();
	}

	if (searchstring) {
	    document.getElementById('searchtext').value = searchstring;
	}

	// get searchstring
	var query = document.getElementById("searchtext").value;
	var idlist = query.replace(/\s+/g, "").split(/,/);

	var api_url = RetinaConfig.mgrast_api + '/m5nr/';
	var query_str = widget.type + '/';

	var url = api_url + query_str;
	
	jQuery.ajax( { dataType: "json",
		       url: url,
		       method: "POST",
		       data: '{"limit":10000,"data":["'+idlist.join('","')+'"]}',
		       processData: false,
		       success: function(data) {
			   Retina.WidgetInstances.m5nr_search[1].resultTable(data);
		       },
		       error: function () {
			   widget.message.innerHTML = "<div class='alert alert-error' style='width: 50%;'>The query could not be completed</div>";
		       }
		     });
	return;
    };
})();
