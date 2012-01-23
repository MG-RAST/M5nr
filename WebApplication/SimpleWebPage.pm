package SimpleWebPage;

use base qw( WebPage );

use strict;
use warnings;
use Devel::StackTrace::AsHTML;

1;

=pod

=head1 NAME

SimpleWebPage

=head1 DESCRIPTION


=head1 METHODS

=over 4

=item * B<init> ()

Called when the web page is instanciated.

=cut

sub init {
  my ($self) = @_;
  
  $self->title($self->page_title());

  return 1;
}

=item * B<output> ()

Returns the html output of the Annotation page.

=cut

sub output {
    my ($self) = @_;
    
    my $output;

    my $application = $self->application;
    my $cgi = $application->cgi;
    my $page = $cgi->param('page');

    eval {
	
	my $fig = $application->data_handle('FIG');
	
	my $user = $application->session->user;
	
	my $url = $application->url."?page=".$page;
	
	my $username = ref($user) ? $user->login : "";
	
	$output = $self->page_content($fig, $cgi, $username, $url);
    };
    if ($@)
    {
	$output = "<h1>Error during execution of page $page:</h1>" . $@;
    }

    return $output;
}


1;
