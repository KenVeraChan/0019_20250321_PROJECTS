import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const contactoJsonPath = join(browserDistFolder, 'assets/data/contacto.json');

const app = express();
const angularApp = new AngularNodeAppEngine();

/** Contenido público de contacto (mismo JSON que en assets tras el build). */
app.get('/api/contacto', (req, res) => {
  try {
    if (!existsSync(contactoJsonPath)) {
      res.status(404).json({ error: 'contacto.json no encontrado' });
      return;
    }
    const data = readFileSync(contactoJsonPath, 'utf-8');
    res.type('application/json').send(data);
    return;
  } catch {
    res.status(500).json({ error: 'No se pudo leer la información de contacto' });
    return;
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
