"use strict";

import * as env from "../server/environment";
const conf = env.getConfig(process.env);

export interface AddCategoria {
    id_categoria: string;
    nombre_categoria: string;
    descripcion_categoria: string;
}

 ////// Eliminar CATEGORIA/////


