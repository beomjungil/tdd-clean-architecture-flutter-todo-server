import { RequestHandler } from 'express';
import Todo from '../models/todo';

const todoControllers: { [key: string]: RequestHandler } = {
    readAllTodos: (_, res) => {
        Todo.find()
            .then((todos) => {
                if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
                res.json(todos);
            })
            .catch(err => res.status(500).send(err));
    },
    createTodo: (req, res) => {
        Todo.create(req.body)
            .then(todo => res.json(todo))
            .catch(err => res.status(500).send(err));
    },
    updateTodo: (req, res) => {
        Todo.findOneAndUpdate({ _id: req.body.id }, { $set: { ...req.body } }, { new: true })
            .then(todo => res.json(todo))
            .catch(err => res.status(500).send(err));
    },
    deleteTodo: (req, res) => {
        Todo.findOneAndDelete({ _id: req.body.id })
            .then(todo => res.json(todo))
            .catch(err => res.status(500).send(err));
    }
}
export default todoControllers;