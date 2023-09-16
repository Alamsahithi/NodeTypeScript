"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos = [];
var router = (0, express_1.Router)();
router.get('/', function (req, res, next) {
    res.status(200).json({ todos: todos });
});
router.post('/todo', function (req, res, next) {
    var newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});
router.put('/todo/:todoid', function (req, res, next) {
    var tid = req.params.todoid;
    var todoIndex = todos.findIndex(function (todoItem) { return todoItem.id === tid; });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: "updated todo", todos: todos });
    }
    res.status(404).json({ message: "couldn't find todo for this id" });
});
router.delete('/todo/:todoid', function (req, res, next) {
    todos = todos.filter(function (todoItem) { return todoItem.id !== req.params.todoid; });
    res.status(200).json({ message: 'deleted todo', todos: todos });
});
exports.default = router;
