#!/bin/bash
cd "$(dirname "$0")"
pm2 serve build 3000 --name "memory-game" --spa 