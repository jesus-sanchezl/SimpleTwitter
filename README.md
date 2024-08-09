# SimpleTwitter

SimpleTwitter es una API básica que simula algunas de las funcionalidades principales de la aplicación 'X', aunque con un conjunto reducido de características. 
Aunque su funcionalidad es más limitada en comparación con plataformas más grandes, proporciona las herramientas esenciales para gestionar y visualizar publicaciones. 


## Requisitos
Es necesario tener Node.js, npm, PostMan para hacer las pruebas con la API y MySQL instalado en tu entorno de desarrollo. Si prefieres una interfaz gráfica para interactuar con la base de datos, también puedes instalar MySQL Workbench (opcional).


## Instalación

      1. Clona el repositorio

             *******************************************

      2. Instala las dependencias

            `npm install`

      3. Inicia el servidor:

            `npm run dev`



## Configuracón
Para configurar correctamente tu entorno de desarrollo, necesitarás crear un archivo `.env` en la raíz del proyecto. Este archivo contiene variables de entorno cruciales, como las credenciales de la base de datos y las claves secretas para JWT.

Puedes utilizar el archivo `template.env` como base. Aquí hay una descripción de algunas de las variables que necesitas configurar:

- `DATABASE_HOST`: La dirección del servidor MySQL.
- `DATABASE_USER`: El nombre de usuario de tu base de datos MySQL.
- `DATABASE_PASSWORD`: La contraseña para tu usuario de MySQL.
- `DATABASE_NAME`: El nombre de la base de datos que utilizará la aplicación.
- `JWT_SECRET`: Una cadena secreta utilizada para firmar los tokens JWT.


Asegúrate de configurar estas variables de acuerdo a tu entorno local.



## Funcionalidades

* **Registro de usuario**:
      Permite a los nuevos usuarios crear una cuenta proporcionando los datos necesarios, como nombre de usuario y 
      contraseña.

* **Login**:
      Ofrece una opción de inicio de sesión para que los usuarios registrados accedan a su cuenta utilizando sus 
      credenciales.

* **Obtener usuarios**:
      Facilita la visualización de todos los usuarios registrados en la plataforma, lo que permite a los usuarios conocer 
      quién más está en la red.

* **Crear publicación**:
      Los usuarios pueden crear y publicar mensajes de texto en la plataforma, que se almacenan y se hacen visibles     
      para otros usuarios.

* **Obtener todas las publicaciones**:
      Permite visualizar una lista completa de todas las publicaciones realizadas en la plataforma

* **Obtener una publicación por su ID**:
      Ofrece la posibilidad de recuperar una publicación específica utilizando su identificador único

* **Borrar publicación**:
      Permite a los usuarios eliminar sus publicaciones si así lo desean, asegurando que solo se mantengan en la 
       lataforma las publicaciones que desean conservar.


## Autenticación
La autenticación en SimpleTwitter se basa en JWT (JSON Web Tokens), que garantiza un acceso seguro a la API.

### Como funciona
1. **Generación del Token**: Al iniciar sesión, se genera un JWT con información del usuario.
2. **Envío del Token**: El JWT se envía al cliente y se guarda para futuras solicitudes.
3. **Verificación**: En solicitudes posteriores, el cliente envía el token en la cabecera de autorización. El servidor valida el token para acceder a recursos protegidos.

Esto asegura que solo los usuarios autenticados puedan acceder a ciertas partes de la API.


## Conclusión
SimpleTwitter proporciona una implementación básica de las funcionalidades clave de una red social, como la gestión de usuarios y publicaciones, con una capa de seguridad basada en JWT. Aunque es una plataforma simplificada, ofrece una base sólida para entender y experimentar con la autenticación y la gestión de datos en APIs.