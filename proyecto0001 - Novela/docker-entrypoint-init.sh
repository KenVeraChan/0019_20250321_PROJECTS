#!/bin/bash
set -e

echo ">>> Ajustando permisos de las bases de datos SQLite..."
chown -R www-data:www-data /var/www/html/data

echo ">>> Inicializando bases de datos SQLite..."
php /var/www/html/inicializarBasesDatos.php

echo ">>> Inicialización completada; iniciando Apache."
exec apache2-foreground
