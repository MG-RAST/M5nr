use strict;
use warnings;

use DBMaster;
use WebApplication;
use WebMenu;
use WebLayout;

my $menu = WebMenu->new();
$menu->add_category('Search', 'babel.cgi');
$menu->add_category('Sequence Retrieval', 'babel.cgi?page=Sequence');
$menu->add_category('Sources', 'babel.cgi?page=ViewSources');
$menu->add_category('Download', 'babel.cgi?page=Download');

$menu->add_category('Admin', 'babel.cgi?page=admin', undef, ['monitor']);
$menu->add_entry('Admin', 'Curate Organism Mapping', 'babel.cgi?page=MapOrgs', undef, ['view','organism']);
$menu->add_entry('Admin', 'View duplicates for current mapping', 'babel.cgi?page=MapOrgs&duplicates=1', undef, ['view','organism']);
$menu->add_entry('Admin', 'View current mapping', 'babel.cgi?page=ViewMappedOrgs', undef, ['view','organism']);
$menu->add_entry('Admin', 'ACH Test', 'babel.cgi?page=achtest');

my $WebApp = WebApplication->new( { id       => 'Babel',
                                    dbmaster => DBMaster->new(-database => 'WebAppBackend' ,
							      -backend  => 'MySQL',
							      -host     => 'bio-app-authdb.mcs.anl.gov' ,
							      -user     => 'mgrast',
							      ),
                                    menu     =>  $menu,
                                    layout   =>  WebLayout->new('./Html/WebLayoutBabel.tmpl'),
                                    default  => 'Search',
                                  } );

$WebApp->layout->add_css('./Html/default.css');
$WebApp->layout->add_css('./Html/babel.css');
$WebApp->run();
