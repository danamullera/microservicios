"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle404 = exports.logErrors = exports.handle = exports.newError = exports.newArgumentError = exports.ValidationErrorMessage = exports.ValidationErrorItem = exports.ERROR_INTERNAL_ERROR = exports.ERROR_BAD_REQUEST = exports.ERROR_NOT_FOUND = exports.ERROR_UNAUTHORIZED = void 0;
exports.ERROR_UNAUTHORIZED = 401;
exports.ERROR_NOT_FOUND = 404;
exports.ERROR_BAD_REQUEST = 400;
exports.ERROR_INTERNAL_ERROR = 500;
class ValidationErrorItem {
}
exports.ValidationErrorItem = ValidationErrorItem;
class ValidationErrorMessage {
}
exports.ValidationErrorMessage = ValidationErrorMessage;
function newArgumentError(argument, err) {
    return {
        messages: [{
                path: argument,
                message: err
            }]
    };
}
exports.newArgumentError = newArgumentError;
function newError(code, err) {
    return { code: code, error: err };
}
exports.newError = newError;
function handle(res, err) {
    if (err instanceof ValidationErrorMessage) {
        // ValidationErrorMessage
        if (err.code) {
            res.status(err.code);
        }
        return res.send({ error: err.error, messages: err.messages });
    }
    else if (err.code) {
        // Error de Mongo
        return res.send(sendMongoose(res, err));
    }
    else {
        return res.send(sendUnknown(res, err));
    }
}
exports.handle = handle;
// Error desconocido
function sendUnknown(res, err) {
    res.status(exports.ERROR_INTERNAL_ERROR);
    return { error: err };
}
// Obtiene un error adecuando cuando hay errores de db
function sendMongoose(res, err) {
    res.status(exports.ERROR_BAD_REQUEST);
    try {
        switch (err.code) {
            case 11000:
            case 11001:
                const fieldName = err.errmsg.substring(err.errmsg.lastIndexOf("index:") + 7, err.errmsg.lastIndexOf("_1"));
                return {
                    messages: [{
                            path: fieldName,
                            message: "Este registro ya existe."
                        }]
                };
            default:
                res.status(exports.ERROR_BAD_REQUEST);
                return { error: err };
        }
    }
    catch (ex) {
        res.status(exports.ERROR_INTERNAL_ERROR);
        return { error: err };
    }
}
function logErrors(err, req, res, next) {
    if (!err)
        return next();
    console.error(err.message);
    res.status(err.status || exports.ERROR_INTERNAL_ERROR);
    res.json({
        error: err.message
    });
}
exports.logErrors = logErrors;
function handle404(req, res) {
    res.status(exports.ERROR_NOT_FOUND);
    res.json({
        url: req.originalUrl,
        error: "Not Found"
    });
}
exports.handle404 = handle404;
//# sourceMappingURL=error.js.map