###
# env setup so must be sourced, not run
#
# This is a sample of a typical system-level configuration that users
# could source and thereafter be ready to use the ReleaseTools.  The
# key thing is the block of environment variables, RTROOT, etc. (see below).
#
###

##
# Release tools stuff
##

setenv RTCURRENT rtBoot
setenv RTROOT    ~efrank/KahRoot
setenv RTDIST    ${RTROOT}/dist
setenv RTARCH    linux-gentoo

alias rtpath 'source $RTDIST/releases/$RTCURRENT/ReleaseTools/RTPath.csh'
##
# Stuff for external dependencies.  These are software that we need, but
# do not ship.
##

setenv EXTERNAL_REL 0.0.2
set    EXTERNAL=$RTROOT/external/releases/$EXTERNAL_REL

##
# make sure they have some sort of path, but see also RTPath.csh
##

set path=(  $EXTERNAL/bin $path $EXTERNAL/AccessGrid/bin )
rtpath

##
# CVS Repo.  You can also do :ext:username@biocvs if you need to, but this
# should work in general:
##

setenv CVSROOT :ext:biocvs.mcs.anl.gov:/disks/cvs/bio
setenv CVS_RSH ssh

setenv CYTOSCAPE_HOME /homes/SysBio/external/packages/Cytoscape1.1.1/
setenv CYTOSCAPE_COMMAND $CYTOSCAPE_HOME/cytoscape.sh
if ( $?DOTFONTPATH ) then
    setenv CYTOSCAPE_DISPLAY $DISPLAY
endif



###
#  What follows are set up as appends so that earlier configs can supercede.
##

# systems dot lacks fonts.  we dumped needed fonts here:


if ( $?DOTFONTPATH ) then
   setenv DOTFONTPATH ${DOTFONTPATH}:/homes/SysBio/external/X11R6/lib/X11/fonts/truetype
else
   setenv DOTFONTPATH /homes/SysBio/external/X11R6/lib/X11/fonts/truetype
endif


if ( $?PYTHONPATH ) then
   setenv PYTHONPATH  ${PYTHONPATH}:/homes/SysBio/external/releases/${EXTERNAL_REL}/lib/python2.2/site-packages
else
   setenv PYTHONPATH /homes/SysBio/external/releases/${EXTERNAL_REL}/lib/python2.2/site-packages
endif


if ( $?LD_LIBRARY_PATH ) then
   setenv LD_LIBRARY_PATH ${LD_LIBRARY_PATH}:${EXTERNAL}/lib/:/soft/com/packages/oracle/OraHome1/lib
else
  setenv LD_LIBRARY_PATH ${EXTERNAL}/lib/:/soft/com/packages/oracle/OraHome1/lib
endif

##
# Configure shared AG installation
##

# only needed for build, not for run
#source $EXTERNAL/AccessGrid/env-init.csh

