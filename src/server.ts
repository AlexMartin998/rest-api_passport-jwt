/** Typescript Nodejs Mongodb REST API con Passport
 * Dependencias
	npm i express cors mongoose morgan bcrypt jsonwebtoken passport passport-jwt dotenv

	npm i -D typescript tsc-watch @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/mongoose @types/morgan @types/passport-jwt @types/passport


	- Crear   src/
		tsc --init
			-  	"sourceMap": true,  
			-  	"outDir": "./dist",   
			- 	"rootDir": "./src", 
			-  	"moduleResolution": "node", 
		
	- Arqutectura (directorios)
		- app.ts		<-		Server
		- index.ts	<-		Arrancar la app
		- db.ts			<-		Conexion con la SB
		- config/		<-		Configurar (passport, etc.)

	- Script   "dev"
		- Ya no necesito 2 procesos en la terminal como con FH
			"dev": "tsc-watch --onSuccess \"nodemon ./dist/index.js\"",


 * Passport JWT Strategy - 53:35
	- Creamos el middleware  passport.ts
		- Esto lo usamos en las rutas protegidas
	- En  app.ts
		- Lo uso aqui
		- Inicio passport en los Middlewares
		- Le doy la conf  strategy  q acabamos de configurar
	- Ya solo uso el Middleware en cada   routa  protegida.
		- En cada ruta que requiera estar Autenticado/Loggeado
 */

import express from 'express';
import { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import { authRoutes, privateRoutes } from './routes';
import passportMiddleware from './middlewares/passport.middleware';


// // Initializations:
const app: Application = express();


// // Settings
app.set('port', process.env.PORT || 3000);


// // Middlewares
app.use(cors());
app.use(express.json()); // Recibir info en JSON
app.use(express.urlencoded({ extended: false })); // Recibir info de forms
app.use(express.static('public'));
app.use(morgan('dev'));

// Passport:
app.use(passport.initialize());
passport.use(passportMiddleware);


// // Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ msg: 'GET Home' });
});
app.use('/', authRoutes);
app.use('/', privateRoutes);

export default app;
