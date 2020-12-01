"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const path = require("path");
const error = require("../server/error");
const routes = require("../server/routes");
function init(appConfig) {
    const app = express();
    app.set("port", appConfig.port);
    // Habilitar Cors
    app.use(cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true
    }));
    // Configuramos el server para que tome los json correctamente
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
    app.use(bodyParser.json({ limit: "5mb" }));
    // Configurar express para comprimir contenidos de text en http
    app.use(compression());
    // helmet le da seguridad al sistema para prevenir hacks
    app.disable("x-powered-by");
    // Esta es la ruta de contenidos estáticos, no deberían haber muchos pero algo de documentación
    // vendría bien como contenido estático.
    app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));
    app.get("/", (req, res, next) => { res.redirect("index.html"); });
    // Iniciamos las rutas del directorio
    // mas sobre rutas http://expressjs.com/es/guide/routing.html
    routes.init(app);
    // Para el manejo de errores, para que los loguee en la consola
    app.use(error.logErrors);
    // Responder con JSON cuando hay un error 404, sino responde con un html
    // Esto tiene que ir al final porque sino nos sobreescribe las otras rutas
    app.use(error.handle404);
    return app;
}
exports.init = init;
//# sourceMappingURL=express.js.map