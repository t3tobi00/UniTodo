import {pool} from '../helpers/db.js';

const selectAllTasks = async () =>{
    return await pool.query('SELECT * FROM task');
}

const insertTask = async (description) => {
    return await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description]);
}

const deleteTask = async (id) => {
    return await pool.query('DELETE FROM task WHERE id = $1', [id]);
}

export {selectAllTasks, insertTask, deleteTask};