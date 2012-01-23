#############################################################################
#
# The goal is to set various path env variables to control search order
# under the release tools.
#
# USAGE:
#    o run from inside a work directory
#    o Have RTDIST, RTCURRENT defined.  Also, RTSITEOVERRIDE, if needed
#   
#    source RTPATH
#
#
# DETAILS:
#
#    We care about:
#   
#       path                 affects locating release programs, tools
#       PYTHONPATH           affects loading of built code
#       LD_LIBRARY_PATH      as for PYTHONPATH.** Not used  yet, thank heavens
#   
#    The search order is as follows, and this defines levels of overrides
#   
#       1. working directory
#       2. site overrides       not implemented yet.
#       3. base release
#   
#    Thus, anything checked out (in case its modified) wins out over 
#    everything. Anything in site-level config comes next. This allows the 
#    site to do config that is perhaps more tricky than
#    a typical user cares to know about.  Finally comes base release, allowing
#    us to ship releases with reasonable defaults (or examples).
#   
#    Site overrides work by keying off of RTSITEOVERRIDE environment variable.
#    That's just a path that points to the overrides. We look in there for
#    a subdirectory with the current release name (RTCURRENT).
#   
#    So, the end result is something like
#   
#         ${PWD}/${RTARCH}/bin:${RTSITEOVERRIDE}/${RTCURRENT}/${RTARCH}/bin:
#                         ${RTDIST}/releases/${RTCURRENT}/${RTARCH}/bin
#     
#    or with bin->lib, as needed.
#    
# HISTORY:
#    06Feb04  efrank       first version
#
# BUGS
#    o We don't want the paths to get longer and longer if RTPath is called
#      multiple times, e.g., if you change to a new working directory. We
#      have a  KLUDGE for the moment: we stick RTMARKER as a literal into
#      the path to sandwhich what we put there.  We then use that to locate
#      our stuff later when we need to modify it.  Not robust at all.
#
#############################################################################

#       PYTHONPATH           affects loading of built code
#       LD_LIBRARY_PATH      as for PYTHONPATH.** Not used  yet, thank heavens



#
# precompute a few directory names.
#

workdir=${PWD}/${RTARCH}

reldir=${RTDIST}/releases/${baserelname}/${RTARCH}

#if [ -f rtConfig ]; then
#   . rtConfig
#   reldir=${RTDIST}/releases/${baserelname}/${RTARCH}
#else
#    reldir=${RTDIST}/releases/${RTCURRENT}/${RTARCH}
#fi

if [ "" != "$RTSITEOVERRIDE" ]; then
   overridedir=${RTSITEOVERRIDE}/${RTCURRENT}/${RTARCH}
   overridedirbin=$overridedir/bin
   overridedirlib=$overridedir/lib
else
   set overridedir=""
   set overridedirbin=""
   set overridedirlib=""
fi

#
# path
#

if [ "`echo $PATH | grep RTMARKER`" != "" ]; then
   #RTMARKER sandwhich there...change out the filling
   PATH=`echo $PATH | sed "s%RTMARKER.*RTMARKER%RTMARKER:${workdir}/bin:${overridedirbin}:${reldir}/bin:RTMARKER%g"`
else
   #No MARKER...our first time, then
   PATH=`echo RTMARKER:${workdir}/bin:${overridedirbin}:${reldir}/bin:RTMARKER`:$PATH
fi

#
# PYTHONPATH
#

if [ "" = "$PYTHONPATH" ]; then
   PYTHONPATH=`echo RTMARKER:${workdir}/lib:${overridedirlib}:${reldir}/lib:RTMARKER`

elif [ "`echo $PYTHONPATH | grep RTMARKER`" != "" ]; then
   PYTHONPATH=`echo $PYTHONPATH | sed "s%RTMARKER.*RTMARKER%RTMARKER:${workdir}/lib:${overridedirlib}:${reldir}/lib:RTMARKER%g"`

else
   PYTHONPATH=`echo RTMARKER:${workdir}/lib:${overridedirlib}:${reldir}/lib:RTMARKER`:${PYTHONPATH}

fi

#
# cleanup
#

unset workdir
unset reldir
unset overridedir
unset overridedirbin
unset overridedirlib
