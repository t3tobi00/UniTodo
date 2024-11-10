import fs from 'fs'
import path from 'path'
import { pool } from '../helpers/db.js'
// import { sign } from 'jsonwebtoken'
// import pkg from 'jsonwebtoken';
// const { sign } = pkg;
import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt'

const __dirname = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname).substring(1))
console.log('directory name', __dirname)

const initializeTestDb = ()=>{
    const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), "utf8");
    pool.query(sql)
}

const insertTestUser = (email, password)=>{
    hash(password, 10, (error, hashedPassword)=>{
        pool.query('insert into account (email, password values ($1, $2)', [email, hashedPassword])
    })
}

const getToken = (email) => {
    return jwt.sign({ user: email }, process.env.JWT_SECRET_KEY)
}

export { getToken, initializeTestDb, insertTestUser }