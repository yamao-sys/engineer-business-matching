#!/bin/bash

awslocal s3 mb s3://engineer-business-matching-dev
awslocal s3 mb s3://engineer-business-matching-test

# CORS設定を追加
aws --endpoint-url=http://localhost:4566 \
  s3api put-bucket-cors \
  --no-sign-request \
  --bucket engineer-business-matching-dev \
  --cors-configuration '{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST"],
            "AllowedOrigins": ["http://localhost:3000", "http://localhost:3001"],
            "ExposeHeaders": ["Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers"],
            "MaxAgeSeconds": 3000
        }
    ]
}'