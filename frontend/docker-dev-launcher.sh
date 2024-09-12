service ssh start

npm run dev

echo "API_URL='$API_URL'" >>/app/.env &&
	echo "ACCESS_TOKEN='$ACCESS_TOKEN'" >>/app/.env
exec "$@"

sleep infinity
