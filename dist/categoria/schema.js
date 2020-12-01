"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoCategoria = exports.Asignacion = exports.Categoria = void 0;
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const env = require("../server/environment");
const conf = env.getConfig(process.env);
const CategoriaSchema = new mongoose.Schema({
    id_categoria: {
        type: Number,
        trim: true,
        default: "",
        unique: true,
        required: true
    },
    nombre_categoria: {
        type: String,
        required: true,
        trim: true
    },
    descripcion_categoria: {
        type: String,
        required: true,
        trim: true
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { collection: "categorias" });
const AsignacionSchema = new mongoose.Schema({
    id_categoria: {
        type: Number,
        trim: true,
        default: "",
        unique: true,
        required: true
    },
    id_user: {
        type: String,
        required: true,
        trim: true
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    }
}, { collection: "asignaciones" });
const ProductoCategoriaSchema = new mongoose.Schema({
    id_categoria: {
        type: Number,
        trim: true,
        default: "",
        unique: true,
        required: true
    },
    id_producto: {
        type: String,
        required: true,
        trim: true
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    }
}, { collection: "productoCategoria" });
exports.Categoria = mongoose_1.model("Categoria", CategoriaSchema);
exports.Asignacion = mongoose_1.model("Asignacion", AsignacionSchema);
exports.ProductoCategoria = mongoose_1.model("ProductoCategoria", ProductoCategoriaSchema);
//# sourceMappingURL=schema.js.map