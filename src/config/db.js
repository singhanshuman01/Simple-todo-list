const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.on('error',(err,client)=>{
    console.error(error);
    process.exit(-1);
});

pool.on('connect', (client)=>{
    console.log("connected to db");
})

module.exports = {
    query: (text,param)=>pool.query(text,param),
    pool
}