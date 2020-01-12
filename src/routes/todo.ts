import { Router } from 'express';
import todoControllers from '../controllers/todo';

const todoRouter = Router();

todoRouter.get('/', todoControllers.readAllTodos);
todoRouter.post('/create', todoControllers.createTodo);
todoRouter.put('/update', todoControllers.updateTodo);
todoRouter.delete('/delete', todoControllers.deleteTodo);

export default todoRouter;