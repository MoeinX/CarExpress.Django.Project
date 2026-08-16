#!/bin/sh

# If this database came from the old accounts app, transfer migration
# ownership of its compatible user table before Django builds the graph.
python - <<'PY'
import os
import psycopg2

connection = psycopg2.connect(
    dbname=os.environ["POSTGRES_DB"],
    user=os.environ["POSTGRES_USER"],
    password=os.environ["POSTGRES_PASSWORD"],
    host=os.environ["POSTGRES_HOST"],
    port=os.environ["POSTGRES_PORT"],
)
with connection, connection.cursor() as cursor:
    cursor.execute(
        """
        SELECT EXISTS(
            SELECT 1 FROM django_migrations
            WHERE app = 'accounts' AND name = '0001_initial'
        ),
        EXISTS(
            SELECT 1 FROM django_migrations
            WHERE app = 'tracking' AND name = '0001_initial'
        )
        """
    )
    old_accounts_exists, tracking_user_registered = cursor.fetchone()
    if old_accounts_exists and not tracking_user_registered:
        cursor.execute(
            """
            INSERT INTO django_migrations (app, name, applied)
            VALUES ('tracking', '0001_initial', NOW())
            """
        )
connection.close()
PY

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Build the Django admin static asset directory for WhiteNoise.
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start server
echo "Starting server..."
gunicorn CarExpress.wsgi:application --bind 0.0.0.0:8000
