const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../db/config.db");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRoutePath = '/api/usuarios';

        // rutas para autenticación (token)
        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a la base de datos:
        this.conectarDB();

        // Middlewares:
        this.middleware();

        // Rutas:
        this.router();
    }

    async conectarDB() {
        await dbConnection();
    }


    middleware() {
        // cors:
        this.app.use(cors() )

        // lectura y parseo del body: (cualquier info que venga lo va a convertir en json)
        this.app.use(express.json());

        // directorio público:
        this.app.use(express.static('public'));
    }

    router() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuarioRoutePath, require('../routes/user.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto " + this.port);
        });
    }
}

module.exports = Server;
