#!/bin/bash
# Copy files to raspberry
echo "Copying"
scp -r [!.]* pi@192.168.2.5:/opt/deploy/arcadebuttons
echo "Done"