
DEBUG = True

# Make these unique, and don't share it with anybody.
SECRET_KEY = "d6b29469-dae0-4abb-8af5-04746c457efb06311499-9b33-488e-b2c4-b3d606f4d2e4e32e3c36-f42c-4341-be96-097a28b127a2"
NEVERCACHE_KEY = "e1aa311d-9baf-4dc9-a272-044332ed311b83b8cb9a-0dab-43e7-96dd-d270a89e40256edcb0b1-56ca-4138-bdad-aef0a991f0a4"

DATABASES = {
    "default": {
        # Ends with "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.sqlite3",
        # DB name or path to database file if using sqlite3.
        "NAME": "dev.db",
        # Not used with sqlite3.
        "USER": "",
        # Not used with sqlite3.
        "PASSWORD": "",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "",
    }
}
