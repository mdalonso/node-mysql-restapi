"use strict";

import {check,validationResult} from 'express-validator';
//post puede recibir un array de funciones de middleware y eso es lo que contiene la constante validación.
//check es middleware proporcionado por el paquete express-validation.
//Validamos utilizando built-in validators
export const validacion=[
    check('name').exists().notEmpty.isLength({min:5,max:20})
];