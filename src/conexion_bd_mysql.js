import {createPool} from 'mysql2/promise';

import { DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE,DB_PORT } from './routes/config.js'

export const conexion=createPool({
    host:DB_HOST,//IP en la nube
    user:DB_USER,
    password:DB_PASSWORD,
    port:DB_PORT,
    database:DB_DATABASE
});