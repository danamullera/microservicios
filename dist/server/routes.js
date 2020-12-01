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
exports.init = void 0;
const token = require("../token/token");
const error = require("./error");
const schema_1 = require("../categoria/schema");
;
function init(app) {
    app.route("/v1/asignar").post(validateToken, selectCategories);
    app.route("/v1/categorias").post(validateToken, addCategory);
    app.route("/v1/categorias/:id_categoria").put(validateToken, updateCategory);
    app.route("/v1/categorias/:id_categoria").delete(validateToken, deleteCategory);
    app.route("/v1/categorias/").get(validateToken, getCategories);
    app.route("/v1/:id_categoria/productos/:id_producto").post(validateToken, addProductCategory);
    app.route("/v1/:id_categoria/productos/:id_producto").delete(validateToken, deleteProductCategory);
    app.route("/v1/:id_categoria/productos/").get(validateToken, getProductsCategory);
}
exports.init = init;
function validateToken(req, res, next) {
    const auth = req.header("Authorization");
    if (!auth) {
        return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
    }
    token.validate(auth)
        .then(user => {
        req.user = user;
        console.log(req.user);
        next();
    })
        .catch(err => error.handle(res, err));
}
function addCategory(req, res) {
    const category = new schema_1.Categoria();
    category.id_categoria = req.body.id_categoria;
    category.nombre_categoria = req.body.nombre_categoria;
    category.descripcion_categoria = req.body.descripcion_categoria;
    category.save(function (err) {
        if (err) {
            error.handle(res, err);
        }
        else {
            res.json(category);
        }
    });
}
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let categoria = yield schema_1.Categoria.findOne({ "id_categoria": req.params.id_categoria }).exec();
            console.log(categoria);
            if (!categoria) {
                throw error.newError(error.ERROR_NOT_FOUND, "La categoria no se encontró");
            }
            categoria.nombre_categoria = req.body.nombre_categoria;
            console.log(categoria.nombre_categoria);
            categoria.descripcion_categoria = req.body.descripcion_categoria;
            console.log(categoria.descripcion_categoria);
            categoria.save(function (err) {
                if (err) {
                    error.handle(res, err);
                }
                else {
                    res.json(categoria);
                }
            });
            ;
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let borrarDoc = schema_1.Categoria.deleteOne({ "id_categoria": req.params.id_categoria }).exec(function (err) {
                if (err) {
                    error.handle(res, err);
                }
                else {
                    res.json(borrarDoc);
                    console.log("Fue eliminado exitosamente");
                }
            });
            ;
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
function selectCategories(req, res) {
    const asignacion = new schema_1.Asignacion();
    asignacion.id_categoria = req.body.id_categoria;
    asignacion.id_user = req.user.user.id;
    asignacion.save(function (err) {
        if (err) {
            error.handle(res, err);
        }
        else {
            res.json(asignacion);
        }
    });
}
function getCategories(req, res) {
    schema_1.Categoria.find({}, function (err, result) {
        if (err) {
            error.handle(res, err);
        }
        else {
            res.json(result);
        }
    });
}
function addProductCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productoCategoria = new schema_1.ProductoCategoria();
        productoCategoria.id_categoria = req.params.id_categoria;
        productoCategoria.id_producto = req.params.id_producto;
        productoCategoria.save(function (err) {
            if (err) {
                error.handle(res, err);
            }
            else {
                res.json(productoCategoria);
            }
        });
    });
}
function deleteProductCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productoCategoria = schema_1.ProductoCategoria.deleteOne({ "id_producto": req.params.id_producto }).exec(function (err) {
                if (err) {
                    error.handle(res, err);
                }
                else {
                    res.json(productoCategoria);
                    console.log("Fue eliminado exitosamente");
                }
            });
            ;
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
function getProductsCategory(req, res) {
    schema_1.ProductoCategoria.find({ "id_categoria": req.params.id_categoria }, function (err, result) {
        if (err) {
            error.handle(res, err);
        }
        else {
            res.json(result);
        }
    });
}
//# sourceMappingURL=routes.js.map