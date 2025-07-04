#!/bin/bash
cd /home/kavia/workspace/code-generation/taskmaster-web-66502-508fc69d/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

