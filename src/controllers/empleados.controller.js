"use strict";

import { request } from "express";
import {conexion} from "../conexion_bd_mysql.js";

export const getEmpleados=async(req,res)=>{
    //try{
        //throw new Error('Database error');
        //PROBARLO QUITÁNDOLE LOS CORCHETES PARA VER LO QUE DEVUELVE EL SELECT
        const [resultado]=await conexion.query("SELECT * FROM employee");
        console.log(resultado);
        res.json(resultado);
        //res.send("Obteniendo empleados");
    //}catch(error){
    //    return res.status(500).json({mensaje:'Opps,algo ha ido mal'})
        
    //}
};

export const getEmpleado=async(req,res)=>{
    try{ 
        //params contiene un objeto JSON con los parámetros que se reciben a través de la URL
        console.log(req.params);
    
        const [resultado]=await conexion.query("SELECT * FROM employee WHERE id= ?",[req.params.id]);
        console.log(resultado);
        //si no se encuentra ningún registro en la base de datos que cumpla con el criterio...
        if (resultado.length<=0){
            //...elaboramos la respuesta que queremos dar.
            //El método status del objeto response nos permite indicar el código de estado de la solicitud.
            //En este caso utilizaremos el código 404 de 'no encontrado'.
            //Además, devolveremos un objeto json el cual contiene un campo con el mensaje que se va a enviar
            //al cliente.
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        //Si por el contrario, sí que encontramos registros que cumplan con el criterio...
            //...como solo hay un elemento en la consulta, devuelvo nada más que el elemento en cuestión.
        res.json(resultado[0]);
    }catch(error){
        return res.status(500).json({mensaje:'Opps,algo ha ido mal'})

    }

    

    //res.send("Obteniendo empleado");
};
export const createEmpleado=async(req,res)=>{
    
    //Los datos se envían al servidor a través del objeto query, y más concretamente a través del 
    //elemento body.
    //Se pueden pasar datos en múltiples formatos. Nosotros pasaremos un JSON.
    //Para que el servidor entienda que está recibiendo información en formato JSON
    //es necesario indicarle que la información se va a recibir en este formato.
    //Esto se lo indicamos a la app en el index.js
    console.log(req.body);
    //Extraigo los valores de los campos del JSON por destructuring.
    //La constante nombre contendrá el elemento name y la constante salario contendrá el elemento salary
    //(hay que utilizar los mismos nombres ya que no va por posición.)
    //con las llaves le estamos indicando que estamos asignando los valores desde un objeto
    const {name,salary}=req.body;
    
    //Otra forma de extraer las constantes:
    //const name=req.body.name
    //const salary=req.body.salary
    
    try{
        //La asignación de los valores a la query también se realiza por destructuring.
        //El método query devuelve un objeto json/js que contiene información sobre la operación realizada.
        //(En realidad devuelve un array de 2 elementos. Sólo nos interesa el primero (Objeto ResultSetHeaders) que
        //objetemos por destructuring-)
        const [resultado]=await conexion.query("INSERT INTO employee (name,salary) VALUES (?,?)",[name,salary]) ;
        console.log(resultado);
        //res.send("post success");
        //res.send({resultado});
        //Vamos a elaborar una respuesta más funcional que se pueda utilizar en el cliente.
        //En nuestro caso devolveremos un objeto el cual va a acontener la información del empleado que se ha insertado
        res.send({
            id:resultado.insertId,
            name,
            salary});
    }catch(error){
        return res.status(500).json({mensaje:'Opps,algo ha ido mal'})
    }
};

export const updateEmpleado=async (req,res)=>{
    
    const id=req.params.id;
    const {name,salary}=req.body;
    
    console.log({id,name,salary});
    try{
    //La línea comentada sólo se puede usar con un put
        //const [resultado]=await conexion.query("UPDATE employee SET name=?, salary=? WHERE id=?",[name,salary,id]);
        //La siguiente línea utiliza un patch (buscar la referencia de patch)
        const [resultado]=await conexion.query("UPDATE employee SET name=IFNULL(?,name), salary=IFNULL(?,salary) WHERE id=?",[name,salary,id]);
        console.log(resultado);
        if (resultado.affectedRows==0){
            return res.status(404).json({mensaje:"empleado no encontrado"});
        }
        const [filas]=await conexion.query("SELECT * FROM employee WHERE id=?",[id]);
        res.json(filas[0]);
        
    }catch(error){
        return res.status(500).json({mensaje:'Opps,algo ha ido mal'})
    }

};

export const deleteEmpleado=async(req,res)=>{
    try{

        const [resultado]=await conexion.query("DELETE FROM employee WHERE id=?",req.params.id);
        console.log(resultado);
        //El campo affectedRows del resultado nos devuelve el número de filas que se han eliminado.
        if (resultado.affectedRows==0){
           return res.status(404).json({mensaje:"El empleado no existe"});
        }
       
        //el código 204 indica que todo ha ido bien pero no se devuelve nada
        //no es necesario devolver nada ya que lo que estamos haciendo es eliminar.
        res.sendStatus(204);
        
    }catch(error){
        return res.status(500).json({mensaje:'Opps,algo ha ido mal'})
    }
};