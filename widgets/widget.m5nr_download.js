(function () {
    var widget = Retina.Widget.extend({
        about: {
                title: "M5NR Download Widget",
                name: "m5nr_download",
                author: "Tobias Paczian",
                requires: [  ]
        }
    });
    
    widget.setup = function () {
	return [];
    };
        
    widget.display = function (params) {
        var widget = Retina.WidgetInstances.m5nr_download[1];
	
	if (params && params.main) {
	    widget.main = params.main;
	    widget.sidebar = params.sidebar;
	}
	var content = widget.main;
	widget.sidebar.parentNode.style.display = "none";

	jQuery.extend(widget, params);
	
	var html = '\
<h3>Download source data and code for the M5nr</h3>\
<ul>\
  <li><a href="ftp://ftp.metagenomics.anl.gov/data/M5nr" target="_blank">M5nr FTP site</a></li>\
  <li><a href="ftp://ftp.metagenomics.anl.gov/data/M5nr/current/M5nr.gz" target="_blank">Current M5nr FASTA</a></li>\
  <li><a href="ftp://ftp.metagenomics.anl.gov/data/M5nr/current/M5nr_blast.tar.gz" target="_blank">Current M5nr NCBI-BLAST db</a></li>\
  <li><a href="ftp://ftp.metagenomics.anl.gov/data/M5nr/sources" target="_blank">M5nr Source Data</a></li>\
</ul>\
<h3>Access M5nr Tools and API</h3>\
<ul>\
  <li><a href="https://raw.github.com/MG-RAST/MG-RAST-Tools/master/tools/bin/m5nr-tools.pl" target="_blank">M5nr Tools Script</a></li>\
  <li><a href="http://api.metagenomics.anl.gov/1/api.html#m5nr" target="_blank">M5nr API Documentation</a></li>\
  <li><a href="http://api.metagenomics.anl.gov/1/m5nr" target="_blank">M5nr API</a></li>\
</ul>';

	content.innerHTML = html;
    };
})();
