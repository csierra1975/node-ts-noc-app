# Need JSON Server
Go to D:\CURSOS\NODE\Seccion_08\06-JSON-SERVER and excecute npm start to run the JSON server

# dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las base de datos con el comando
    ```
    docker compose up -d
    ```
5. Ejecutar comando ```
                        npx prisma migrate dev -> para generar la base de datos en postgres
                        npx prisma migrate pool -> para cargar los modelos acorde a la base de datos en postgres
                        ```


6. Ejecutar comando ```npm install```
7. Ejecutar ```npm run dev``

Esto es para el fichero DEV ```
    PORT=3000

    MAILER_EMAIL= 
    MAILER_SECRET_KEY= 
    MAILER_SERVICE=gmail
    PROD=false

```


