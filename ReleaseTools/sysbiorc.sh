###
# env setup so must be sourced, not run
# 29 June 04: translated to bash by larry sheradon
#
# nb: sysbiorc.csh is most actively used and the .sh often ends up out of
# date.  be careful.
###

##
# stuff for external dependencies.
##

export EXTERNAL_REL=0.0.2
export EXTERNAL=/homes/SysBio/external/releases/$EXTERNAL_REL

##
# Release tools stuff
##

export RTCURRENT=rtBoot
export RTROOT=/homes/SysBio
export RTDIST=$RTROOT/dist
export RTARCH=linux-rh73

alias rtpath='source $RTDIST/releases/$RTCURRENT/ReleaseTools/RTPath.sh'

# make sure they have some sort of path

export PATH=$EXTERNAL/bin:$PATH:$EXTERNAL/AccessGrid/bin
rtpath


# CVS Repo.  You can also do :ext:username@biocvs if you need to, but this
# should work in general:

export CVSROOT=:ext:biocvs.mcs.anl.gov:/disks/cvs/bio
export CVS_RSH=ssh

export CYTOSCAPE_HOME=/homes/SysBio/external/packages/Cytoscape1.1.1/
export CYTOSCAPE_COMMAND=$CYTOSCAPE_HOME/cytoscape.sh
export CYTOSCAPE_DISPLAY=$DISPLAY


##
#  What follows are set up as appends so that earlier configs can supercede.
##

# systems dot lacks fonts.  we dumped needed fonts here:
export DOTFONTPATH=$DOTFONTPATH:/homes/SysBio/external/X11R6/lib/X11/fonts/truetype

export PYTHONPATH=$PYTHONPATH:/homes/SysBio/external/releases/$EXTERNAL_REL/lib/python2.2/site-packages

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$EXTERNAL/lib/:/soft/com/packages/oracle/OraHome1/lib

# Shared AG installation
#. $EXTERNAL/AccessGrid/env-init.sh
