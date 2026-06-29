#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://localhost:8000}"

health_response="$(curl -sS "${base_url}/api/health")"
users_response="$(curl -sS "${base_url}/api/users")"

echo "Health response: ${health_response}"
echo "Users response:  ${users_response}"

if [[ "${health_response}" == '{"status":"ok"}' ]] && [[ "${users_response}" == '{"message":"Users API working!"}' ]]; then
  echo "Route validation passed"
else
  echo "Route validation failed"
  exit 1
fi
