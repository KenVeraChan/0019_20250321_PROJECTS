from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn

report_path = 'Sfer4D_report.docx'

def add_code_paragraph(doc, code):
    p = doc.add_paragraph()
    r = p.add_run(code)
    r.font.name = 'Courier New'
    r._element.rPr.rFonts.set(qn('w:eastAsia'), 'Courier New')
    r.font.size = Pt(9)


doc = Document()

doc.add_heading('Informe técnico: errores y correcciones (Sfer4D)', level=1)

doc.add_paragraph('Fecha: 2026-07-02')

doc.add_heading('Resumen ejecutivo', level=2)

doc.add_paragraph(
    'Este documento recoge los errores y problemas detectados durante la integración local y en Docker, '
    'junto con los cambios de código aplicados para resolverlos. Incluye ejemplos de código y la explicación de por qué algunos ficheros .sql producían errores y cómo comentarlos correctamente.'
)

# Issue 1

doc.add_heading('1) Angular: sintaxis de plantillas y shared state', level=2)

doc.add_paragraph('Problema: sintaxis obsoleta/incorrecta en plantillas y servicio compartido instanciado manualmente en lugar de inyectado.\nSolución: corregir template para usar @switch/@case y refactorizar el servicio a BehaviorSubject.\nCódigo aplicado (ejemplos):')

add_code_paragraph(doc, "// variablesCompartidas.ts (resumen)\nimport { Injectable } from '@angular/core';\nimport { BehaviorSubject } from 'rxjs';\n\n@Injectable({ providedIn: 'root' })\nexport class VariablesCompartidas {\n  private eleccion$ = new BehaviorSubject<number>(0);\n  readonly current$ = this.eleccion$.asObservable();\n  setEleccion(v: number) { this.eleccion$.next(v); }\n  getEleccion() { return this.eleccion$.getValue(); }\n}\n")

# Issue 2

doc.add_heading('2) Orden de carga de dotenv y conexión a base de datos', level=2)

doc.add_paragraph('Problema: `dotenv.config()` se ejecutaba después de importar `db.js`, lo que provocaba variables de entorno no cargadas.\nSolución: asegurar carga de dotenv al inicio de `server.js` antes de importar módulos que usan process.env.')

add_code_paragraph(doc, "// server.js (inicio)\nimport dotenv from 'dotenv';\ndotenv.config();\nimport { db } from './db.js';\n...")

# Issue 3

doc.add_heading('3) Docker Compose: montaje del directorio SQL y volumen de datos', level=2)

doc.add_paragraph('Problema: `docker-compose.yml` montaba `./sql` (vacío) en lugar de `./backend/sql`, por eso MySQL no ejecutaba los scripts. Además, si el volumen de MySQL ya existía, los scripts no se re-ejecutan.\nSolución: montar `./backend/sql` y reiniciar el stack borrando el volumen para forzar la inicialización.')

add_code_paragraph(doc, "# docker-compose.yml (fragmento)\nmysql:\n  image: mysql:8\n  environment:\n    MYSQL_ROOT_PASSWORD: 1234\n  volumes:\n    - ./backend/sql:/docker-entrypoint-initdb.d\n    - mysql_data:/var/lib/mysql\n")

# Issue 4

doc.add_heading('4) Loader manual de .sql desde `backend/sql` (opcional)', level=2)

doc.add_paragraph('Se añadió un loader en `backend/db.js` que abre y ejecuta los ficheros .sql (ordenados) si existen. Este código es útil cuando no se quiere depender exclusivamente del init de la imagen MySQL.')

add_code_paragraph(doc, "// runSqlFiles y uso en db.js (resumen)\nimport fs from 'fs/promises';\nimport path from 'path';\n\nasync function runSqlFiles(db, dir) {\n  try {\n    const items = await fs.readdir(dir);\n    const files = items.filter(f => f.endsWith('.sql')).sort();\n    for (const file of files) {\n      const sql = await fs.readFile(path.join(dir, file), 'utf8');\n      console.log(`Ejecutando SQL: ${file}`);\n      await db.query(sql);\n    }\n  } catch(err) {\n    if (err.code === 'ENOENT') {\n      console.log(`Directorio SQL no encontrado: ${dir} — omitiendo inicialización.`);\n    } else { throw err; }\n  }\n}\n\n// en connectWithRetry: const sqlDir = path.resolve('./sql'); await runSqlFiles(db, sqlDir);\n")

# Issue 5

doc.add_heading('5) Consultas a múltiples bases de datos desde el backend', level=2)

doc.add_paragraph('Problema: el backend inicialmente esperaba una única base (`DB_NAME`). Al eliminar ese valor, la conexión funciona pero no hay una base por defecto. Solución: usar consultas calificadas o seleccionar la base antes de la consulta según endpoint.')

add_code_paragraph(doc, "// server.js: mapear endpoint a esquema y tabla\nconst areaConsultada = {\n  inicio: { db: 'bbdd001_jefes_rrhh', table: 'diagrama_gannt' },\n  empleados: { db: 'bbdd002_empleados', table: 'empleados_empresa' },\n  clientes: { db: 'bbdd003_clientes', table: 'clientespedidos' }\n};\n\nconst [rows] = await db.query(`SELECT * FROM \`${entry.db}\`.\`${entry.table}\` LIMIT ? OFFSET ?`, [limit, offset]);\n")

# Issue 6

doc.add_heading('6) Error causado por líneas separadoras en dumps SQL', level=2)

doc.add_paragraph('Síntoma: durante la importación MySQL reportaba un error de sintaxis en una línea que contenía solo guiones (-----).\nCausa: esos separadores no son comentarios SQL válidos y MySQL intenta interpretarlos como sentencias SQL.\nCorrección aplicada: reemplazar o comentar esas líneas con el prefijo "--" para convertirlas en comentarios SQL.')

add_code_paragraph(doc, "-- Ejemplo de línea problemática original:\n-----------------------------------------------------------\n\n-- Corregido (comentada):\n-- -----------------------------------------------------------\n")

# Appendix: comandos útiles

doc.add_heading('Apéndice: comandos para reinicio y verificación', level=2)

doc.add_paragraph('Para forzar re-ejecución de los scripts y comprobar las bases:')
add_code_paragraph(doc, "docker compose down -v\ndocker compose up --build\ndocker compose exec mysql mysql -uroot -p1234 -e \"SHOW DATABASES;\"")

# Save

doc.save(report_path)
print(f'Report written to {report_path}')
