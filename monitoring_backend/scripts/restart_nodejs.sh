#!/bin/bash
echo "Running nodejs restart script"
lsof -i tcp:$2 | awk 'NR!=1 {print $2}' | xargs kill
cd $1
npm start