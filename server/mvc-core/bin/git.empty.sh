#!/bin/bash

for dir in $( find . -type d ! -wholename "./.git/*"); do
	echo "> In ${dir}…"
	if [ 3 = $( ls -lsa $dir | wc -l) ]; then
		echo "touch $dir/.empty"
		touch "$dir/.empty"
	else
		[ -f "$dir/.empty" ] && \rm $dir/.empty
	fi
done
