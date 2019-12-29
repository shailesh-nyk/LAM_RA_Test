#!/bin/bash
echo "STOPPING THE SERVER"
lsof -i tcp:$2 | awk 'NR!=1 {print $2}' | xargs kill