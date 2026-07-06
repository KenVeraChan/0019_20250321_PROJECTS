export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:3000/api',
  // Otras variables de entorno específicas para el desarrollo
  // Para el desarrollo no usar 'localhost' sino 127.0.0.1 que una vez compilado en el navegador no reconoce localhost
  cookieExpirtyDays: 365,
  // Numero de dias que expira la cookie de sesion, para que no caduque al cerrar el navegador
};