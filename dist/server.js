"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const env = require("./server/environment");
const express = require("./server/express");
// Variables de entorno
const conf = env.getConfig(process.env);
// Mejoramos el log de las promesas
process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
});
// Establecemos conexión con MongoDD
mongoose.connect(conf.mongoDb, {}, function (err) {
    if (err) {
        console.error("No se pudo conectar a MongoDB!");
        console.error(err.message);
        process.exit();
    }
    else {
        console.log("MongoDB conectado.");
    }
});
// Se configura e inicia express
const app = express.init(conf);
app.listen(conf.port, () => {
    console.log(`Cart Server escuchando en puerto ${conf.port}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map