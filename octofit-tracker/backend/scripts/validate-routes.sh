#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://localhost:8000}"

health_response="$(curl -sS "${base_url}/api/health")"
users_response="$(curl -sS "${base_url}/api/users")"
teams_response="$(curl -sS "${base_url}/api/teams")"
activities_response="$(curl -sS "${base_url}/api/activities")"
leaderboard_response="$(curl -sS "${base_url}/api/leaderboard")"
workouts_response="$(curl -sS "${base_url}/api/workouts")"

echo "Health response: ${health_response}"
echo "Users response:  ${users_response}"
echo "Teams response:  ${teams_response}"
echo "Activities response: ${activities_response}"
echo "Leaderboard response: ${leaderboard_response}"
echo "Workouts response: ${workouts_response}"

HEALTH_RESPONSE="${health_response}" \
USERS_RESPONSE="${users_response}" \
TEAMS_RESPONSE="${teams_response}" \
ACTIVITIES_RESPONSE="${activities_response}" \
LEADERBOARD_RESPONSE="${leaderboard_response}" \
WORKOUTS_RESPONSE="${workouts_response}" \
node <<'NODE'
const checks = [
  ['users', process.env.USERS_RESPONSE],
  ['teams', process.env.TEAMS_RESPONSE],
  ['activities', process.env.ACTIVITIES_RESPONSE],
  ['leaderboard', process.env.LEADERBOARD_RESPONSE],
  ['workouts', process.env.WORKOUTS_RESPONSE],
];

const health = JSON.parse(process.env.HEALTH_RESPONSE || '{}');
if (health.status !== 'ok') {
  throw new Error('Health endpoint did not return ok');
}

for (const [name, value] of checks) {
  const parsed = JSON.parse(value || '[]');
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error(`${name} endpoint did not return seeded data`);
  }
}
NODE

if [[ $? -eq 0 ]]; then
  echo "Route validation passed"
else
  echo "Route validation failed"
  exit 1
fi
