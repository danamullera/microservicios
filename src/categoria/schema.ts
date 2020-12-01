"use strict";
const mongoose= require('mongoose');
import { Document, model, Schema } from "mongoose";
import * as env from "../server/environment";

const conf = env.getConfig(process.env);

export interface ISelectCategory extends Document {
  id_categoria: string;
  id_user: string;
}

export interface ICategory extends Document  {
    id_categoria: string,
    nombre_categoria: string,
    descripcion_categoria: string,
    addProduct: Function;
    removeProduct:Function;
    
}

export interface IProductoCategoria extends Document  {
  id_categoria: string,
  id_producto: string,
  newError: Function
}
 
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

  export let Categoria = model<ICategory>("Categoria", CategoriaSchema)

  export let Asignacion = model<ISelectCategory>("Asignacion", AsignacionSchema)

  export let ProductoCategoria = model<IProductoCategoria>("ProductoCategoria", ProductoCategoriaSchema)

