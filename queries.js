const Pool = require('pg').Pool
const pool = new Pool({
    user: 'moewtnlmectroy',
    host: 'ec2-52-86-25-51.compute-1.amazonaws.com',
    database: 'df8lsbnap80alm',
    password: 'be9f362db9b8b0bb1ebd00307e22eb8cdd190e467d5ee6363f16ee42db65987d',
    port: 5432,
    operatorsAliases: false,
    logging: false,
    ssl: { rejectUnauthorized: false }

})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users_data ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    // const userid = parseInt(request.body.userid)
    // const password = parseInt(request.body.password)
    const { userid, password } = request.body
    pool.query('SELECT * FROM users_data WHERE userid = $1 AND password =  $2', [userid, password], (error, results) => {
        if (error) {
           
            response.status(500).json({ error: 'Invalid Credentials' })
        }
        if (results.rows.length == 0) {
            response.status(500).json({ error: 'Invalid Credentials' })
        }
        else {
            response.status(200).json({ "data": results.rows, "message": 'Login successful' });
        }

    })
}

const createUser = (request, response) => {
    const { id, userid, password } = request.body

    pool.query('INSERT INTO users_data (userid, password) VALUES ($1,$2)', [userid, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}