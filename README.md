# AÉREA — Landing Page para GitHub Pages

Landing page estática para fotografía, video y servicios con dron.

## Estructura

- `index.html` — página
- `styles.css` — diseño y animaciones
- `script.js` — formulario y animaciones
- `Code.gs` — backend de Google Apps Script
- `README.md` — instrucciones

## Configuración de Google Sheets + correo

### 1. Crea la hoja

Crea una Google Sheet nueva.

### 2. Apps Script

En la hoja:

`Extensiones > Apps Script`

Borra el código existente y pega `Code.gs`.

En esta línea:

`const DESTINATION_EMAIL = "TU_CORREO_PERSONAL_AQUI";`

coloca tu correo personal.

Ese correo queda únicamente dentro de Apps Script y NO se publica en GitHub.

### 3. Ejecuta setup()

En el editor de Apps Script selecciona `setup` y pulsa Ejecutar.

Autoriza el proyecto.

Esto crea la hoja `Solicitudes` con:

- fecha_hora
- nombre
- correo
- telefono
- servicio
- mensaje
- ip_no_disponible
- estado

### 4. Publica Apps Script

En Apps Script:

`Implementar > Nueva implementación`

Tipo:

`Aplicación web`

Configura:

- Ejecutar como: tú
- Quién tiene acceso: cualquier persona

Implementa y copia la URL que termina en `/exec`.

### 5. Conecta GitHub Pages

Abre `script.js` y cambia:

`const APPS_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";`

por la URL `/exec`.

### 6. Sube a GitHub

Sube:

- index.html
- styles.css
- script.js

El `Code.gs` NO necesita estar en GitHub.

## Privacidad del correo

La dirección personal no aparece en:

- HTML
- CSS
- JavaScript
- formulario
- URL pública

Solo existe en Apps Script.

El visitante envía el formulario a Apps Script; Apps Script lo guarda en Sheets y envía el correo.

## Importante sobre el correo

El campo `replyTo` permite que, desde tu cliente de correo, puedas responder al correo del visitante directamente.

Google Apps Script aplica cuotas de envío de correo. Para un formulario de una landing personal, normalmente es suficiente, pero no está pensado para campañas masivas.

## Imágenes

La plantilla usa imágenes de demostración de Unsplash mediante URL. Para una página comercial real, conviene sustituirlas por fotografías propias de tus vuelos, equipo Canon y trabajos.

Puedes crear una carpeta:

`assets/`

y cambiar las URLs de fondo por:

`assets/drone-01.jpg`
`assets/canon-01.jpg`
etc.

## Dominio

Puedes usar el dominio `usuario.github.io/repositorio` de GitHub Pages o conectar posteriormente un dominio propio.
