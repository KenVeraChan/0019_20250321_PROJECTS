export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:3000/api',
  //Para el desarrollo no usar localhost, sino 127.0.0.1 que una vez compilado el proyecto, no se puede acceder a localhost desde el navegador, pero sí a 127.0.0.1
  cookieExpirtyDays: 365, // Número de días que se considera válido el consentimiento antes de requerir una nueva aceptación.
  // Otras variables de entorno específicas para el desarrollo
};
