#!/bin/bash
npm set log-file npm-debug.log && npm update && npm install && npm run production
test -e npm-debug.log && curl -X POST -H 'Content-type: application/json' --data "{\"text\": \"$(cat npm-debug.log | sed "s/\"/'/g")\"}" https://hooks.slack.com/services/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 || echo npm-debug.log doesnt exists
