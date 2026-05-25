#!/bin/sh
echo "Running seed..."
node dist/db/seed.js
echo "Starting server..."
exec node dist/index.js