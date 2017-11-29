#!/bin/bash

rm -rf /var/lib/tomcat9/webapps/mclm*
cp mclm.war /var/lib/tomcat9/webapps/
/var/lib/tomcat9/bin/startup.sh

dsd