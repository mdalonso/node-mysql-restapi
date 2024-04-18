import { Router } from "express";
import { getEmpleados,getEmpleado,createEmpleado,updateEmpleado,deleteEmpleado } from "../controllers/empleados.controller.js";

const router=Router();


router.get('/empleados',getEmpleados);

//con : le estamos indicando que la ruta tiene un parámetro con nombre id
//Este parámetro se recibe a través del elemento params del objeto request (ver controlador)
router.get('/empleados/:id',getEmpleado);


router.post('/empleados',createEmpleado)
//con : le estamos indicando que la ruta tiene un parámetro con nombre id
//Este parámetro se recibe a través del elemento params del objeto request (ver controlador)
router.put('/empleados/:id',updateEmpleado)

//patch: put para actualizaciones parciales.
//con : le estamos indicando que la ruta tiene un parámetro con nombre id
//Este parámetro se recibe a través del elemento params del objeto request (ver controlador)
router.patch('/empleados/:id',updateEmpleado)
//con : le estamos indicando que la ruta tiene un parámetro con nombre id
//Este parámetro se recibe a través del elemento params del objeto request (ver controlador)
router.delete('/empleados/:id',deleteEmpleado)

export default router