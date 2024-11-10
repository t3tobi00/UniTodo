import {pool} from '../helpers/db.js';
import { Router } from 'express';
import  { emptyOrRows } from '../helpers/utils.js';
import { auth } from '../helpers/auth.js';

import { getTasks, postTask, deleteTaskController } from '../controllers/TaskController.js';

const todoRouter = Router();

todoRouter.get('/', getTasks);
todoRouter.post('/create', postTask);
todoRouter.delete('/delete/:id', deleteTaskController);

// todoRouter.get('/', (req, res, next) => {
//     pool.query('SELECT * from task', (error, results) => {
//         if (error) {
//             return next(error)
//             // return res.status(500).json({ error: error.message })
//         }
//         return res.status(200).json(emptyOrRows(results))
//         // return res.status(200).json(results.rows)
//     })
// })

// todoRouter.post('/create', auth, (req, res) => {
//     pool.query('insert into task (description) values ($1) returning *',
//         [req.body.description],
//         (error, result) => {
//             if (error) {
//                 return res.status(500).json({ error: error.message })
//             }
//             return res.status(200).json({ id: result.rows[0].id })
//         }
//     )
// })

// todoRouter.delete('/delete/:id', auth, (req, res) => {
//     const id = parseInt(req.params.id)

//     pool.query('delete from task where id = $1',
//         [id],
//         (error, result) => {
//             if (error) {
//                 return res.status(500).json({ error: error.message })
//             }
//             return res.status(200).json({ id: id })
//         }
//     )
// })

export default todoRouter;