#!/bin/bash
DB_PATH="/var/www/html/data/cronologia.db"
SQL_FILE="/var/www/html/data/datos.sql"

# Si la base de datos NO existe, la creamos
if [ ! -f "$DB_PATH" ]; then
    echo ">>> Creando base de datos SQLite..."
    sqlite3 "$DB_PATH" < "$SQL_FILE"
    echo ">>> Base de datos creada e inicializada."
else
    echo ">>> La base de datos ya existe. No se hace nada."
fi

# Ejecutar Apache en primer plano
apache2-foreground
