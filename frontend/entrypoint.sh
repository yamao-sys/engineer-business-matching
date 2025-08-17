#!/bin/bash

pnpm i

pnpm gen:api-spec:watch &
pnpm playwright install --with-deps &

pnpm dev