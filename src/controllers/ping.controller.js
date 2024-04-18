import {conexion} from "../conexion_bd_mysql.js";

export const getPing=async (req,res)=>{ 
    //con esto se comprueba que tenemos conexión con la base de datos
    const [resultado]=await conexion.query("SELECT 1+1 AS RESULT");
    res.json(resultado[0])};