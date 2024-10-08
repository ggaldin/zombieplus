const { Pool } = require('pg')

const DbConfig = {
    user: 'kvrhrglu',
    host: 'isabelle.db.elephantsql.com',
    database: 'kvrhrglu',
    password: 'hLSVDUyOszkVGMW7mqPNfw0pj5dq6aOH',
    port: 5432
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL ' + error)
    }



}