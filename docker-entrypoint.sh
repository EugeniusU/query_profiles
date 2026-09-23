#!/bin/sh

set -e

echo "Running Prisma migrations"
npx prisma migrate deploy

echo "Running Prisma seed"
npx prisma db seed

echo "Starting Nestjs"
exec npm run start:prod
