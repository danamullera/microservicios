"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidate = exports.validate = void 0;
const nodeCache = require("node-cache");
const RestClient_1 = require("typed-rest-client/RestClient");
const env = require("../server/environment");
const error = require("../server/error");
// Este cache de sesiones en memoria va a evitar que tenga que ir a la base de datos
// para verificar que la sesión sea valida. 1 hora de cache en memoria. Luego se vuelve a leer de la db
const sessionCache = new nodeCache({ stdTTL: 3600, checkperiod: 60 });
const conf = env.getConfig(process.env);
function validate(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            /*
              Mantenemos un listado en memoria, si el token no esta en memoria, se busca en el
              servidor de seguridad.
            */
            const cachedSession = sessionCache.get(auth);
            if (cachedSession) {
                return resolve({
                    token: auth,
                    user: cachedSession
                });
            }
            const restClient = new RestClient_1.RestClient("CurrentUser", conf.securityServer);
            restClient.get("/v1/users/current", {
                additionalHeaders: { "Authorization": auth }
            }).then(data => {
                sessionCache.set(auth, data.result);
                resolve({
                    token: auth,
                    user: data.result
                });
            }).catch(exception => {
                reject(error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
            });
        });
    });
}
exports.validate = validate;
function invalidate(token) {
    if (sessionCache.get(token)) {
        sessionCache.del(token);
        console.log("RabbitMQ session invalidada " + token);
    }
}
exports.invalidate = invalidate;
//# sourceMappingURL=token.js.map