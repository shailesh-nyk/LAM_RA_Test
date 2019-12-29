#!/bin/bash
echo "Running solr db restart script"
lsof -i tcp:$2 | awk 'NR!=1 {print $2}' | xargs kill
cd $1
bin/solr start -cloud -p $2 -s "example/cloud/node2/solr" -z localhost:9983