package Babel::MyAppRights;

1;

use strict;
use warnings;

sub rights {
	return [ [ 'view','user','*' ], [ 'add','user','*' ], [ 'delete','user','*' ], [ 'edit','user','*' ], [ 'view','scope','*' ], [ 'add','scope','*' ], [ 'delete','scope','*' ], [ 'edit','scope','*' ], [ 'login','*','*' ], [ 'view','group_request_mail','*' ], [ 'view','registration_mail','*' ], ];
}
