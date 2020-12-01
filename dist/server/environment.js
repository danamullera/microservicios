"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const dotenv = require("dotenv");
let config;
/*
Todas las configuraciones del servidor se encuentran en este modulo, si se quien
acceder desde cualquier parte del sistema, se deben acceder llamando a este método.
*/
function getConfig(environment) {
    if (!config) {
        // El archivo .env es un archivo que si esta presente se leen las propiedades
        // desde ese archivo, sino se toman estas de aca para entorno dev.
        // .env es un archivo que no se debería subir al repo y cada server debería tener el suyo
        dotenv.config({ path: ".env" });
        config = {
            port: process.env.SERVER_PORT || "5000",
            logLevel: process.env.LOG_LEVEL || "debug",
            mongoDb: process.env.MONGO_URL || "mongodb://localhost:27017/categorias",
            jwtSecret: process.env.JWT_SECRET || "+b59WQF+kUDr0TGxevzpRV3ixMvyIQuD1O",
            passwordSalt: process.env.PASSWORD_SALT || "DP3whK1fL7kKvhWm6pZomM/y8tZ92mkEBtj29A4M+b8",
            securityServer: process.env.AUTH_SERVICE_URL || "http://localhost:3000"
        };
    }
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=environment.js.map