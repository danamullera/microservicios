"use strict";

import * as token from "../token/token";
import { Express } from "express";
import * as express from "express";
import * as passport from "passport";
import * as error from "./error";
import { Asignacion, Categoria, ICategory, ISelectCategory, ProductoCategoria } from "../categoria/schema";
import { NextFunction } from "express";
;

export function init(app: Express) {
  app.route("/v1/asignar").post(validateToken, selectCategories);
  app.route("/v1/categorias").post(validateToken, addCategory);
  app.route("/v1/categorias/:id_categoria").put(validateToken, updateCategory);
  app.route("/v1/categorias/:id_categoria").delete(validateToken ,deleteCategory);
  app.route("/v1/categorias/").get(validateToken, getCategories);
  app.route("/v1/:id_categoria/productos/:id_producto").post(validateToken, addProductCategory);
  app.route("/v1/:id_categoria/productos/:id_producto").delete(validateToken, deleteProductCategory);
  app.route("/v1/:id_categoria/productos/").get(validateToken, getProductsCategory);

}

interface IUserSessionRequest extends express.Request {
  user: token.ISession;
}

function validateToken(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  const auth = req.header("Authorization");
  if (!auth) {
    return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
  }

  token.validate(auth)
    .then(user => {
      req.user = user;
      console.log(req.user)
      next();
    })
    .catch(err => error.handle(res, err));
}

function addCategory(req: any, res: any) {

  const category = new Categoria();
  category.id_categoria = req.body.id_categoria;
  category.nombre_categoria = req.body.nombre_categoria;
  category.descripcion_categoria = req.body.descripcion_categoria;
  category.save(function (err: any) {
    if (err) {
      error.handle(res, err);
    } else {
      res.json(category);
    }
  }
  );
}

async function updateCategory(req: any, res: any) {

  try {
    let categoria = await Categoria.findOne({ "id_categoria": req.params.id_categoria }).exec();
    console.log(categoria)
    if (!categoria) {
      throw error.newError(error.ERROR_NOT_FOUND, "La categoria no se encontró")
    }
    categoria.nombre_categoria = req.body.nombre_categoria;
    console.log(categoria.nombre_categoria)
    categoria.descripcion_categoria = req.body.descripcion_categoria;
    console.log(categoria.descripcion_categoria)
    categoria.save(function (err: any) {
      if (err) {
        error.handle(res, err);
      } else {
        res.json(categoria);
      }
    }
    );;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function deleteCategory(req: any, res: any) {
  try {
   let borrarDoc = Categoria.deleteOne({ "id_categoria": req.params.id_categoria }).exec(function (err: any) {
      if (err) {
        error.handle(res, err);
      } else {
        res.json(borrarDoc);
        console.log("Fue eliminado exitosamente")
      }
    }
    );;
  } catch (err) {
    return Promise.reject(err);
  }
}



function selectCategories(req: any, res: any) {
  const asignacion = new Asignacion();
  asignacion.id_categoria = req.body.id_categoria;
  asignacion.id_user = req.user.user.id;
  asignacion.save(function (err: any) {
    if (err) {
      error.handle(res, err);
    } else {
      res.json(asignacion);
    }
  }
  );

}

function getCategories(req: any, res: any) {
  Categoria.find({}, function (err: any, result) {
    if (err) {
      error.handle(res, err);
    } else {
      res.json(result);
    }
  })

} 


async function addProductCategory(req: any, res: any) {
  const productoCategoria = new ProductoCategoria();
  productoCategoria.id_categoria = req.params.id_categoria;
  productoCategoria.id_producto = req.params.id_producto;
  productoCategoria.save(function (err: any) {
    if (err) {
      error.handle(res, err);
    } else {
      res.json(productoCategoria);
    }
  }
  );
  


}



async function deleteProductCategory(req: any, res: any) {
  try {
    let productoCategoria = ProductoCategoria.deleteOne({ "id_producto": req.params.id_producto }).exec(function (err: any) {
      if (err) {
        error.handle(res, err);
      } else {
        res.json(productoCategoria);
        console.log("Fue eliminado exitosamente")
      }
    }
    );;
  } catch (err) {
    return Promise.reject(err);
  }
}

function getProductsCategory(req: any, res: any) {
    ProductoCategoria.find({"id_categoria": req.params.id_categoria}, function (err: any, result) {
      if (err) {
        error.handle(res, err);
      } else {
        res.json(result);
      }
    })
  
  

}

