import express, { application } from 'express';
//import {conexion} from "./conexion_bd_mysql.js";
import routerEmpleados from "./routes/empleados.routes.js";
import routerPing from "./routes/ping.routes.js";

import {PORT} from './routes/config.js';

const app=express();
//para que el servidor sepa que le estamos pasando un json tenemos que indicárselo al servidor
//utilizando el método json() de express. Este método toma la información que se recibe del
//cliente y la transforma en un objeto JSON.
app.use(express.json());


app.use(routerEmpleados);
app.use(routerPing);
app.use((req,res,next)=>{
    res.status(404).json({
        mensaje:"Endpoint no encontrado"
    })
});

app.listen(PORT,()=>{
    console.log("Server running on port "+PORT);
});