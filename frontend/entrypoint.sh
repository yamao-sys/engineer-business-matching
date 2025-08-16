#!/bin/bash

pnpm i

pnpm dev
pnpm gen:api-spec:watch &
pnpm playwright install --with-deps