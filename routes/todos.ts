import { Router} from 'express'
import  { Todo } from '../models/todo'
const todos: Todo[] =[]

const router =Router()
router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{
    const newTodo: Todo = {
        id:new Date().toISOString(),
        text:req.body.text
    }
    todos.push(newTodo)
    res.status(201).json({message:"Added todo",todo:newTodo,todos:todos})
    
})
router.put('/todo/:todoid',(req,res,next)=>{
    const tid = req.params.todoid
    const todoIndex= todos.findIndex(todoItem=>todoItem.id===tid)
    if(todoIndex>=0){
      todos[todoIndex]={id: todos[todoIndex].id,text: req.body.text}
      return res.status(200).json({message:"updated todo",todos:todos})
    
    }
    res.status(404).json({message:"couldn't find todo for this id"})
})
router.delete('/todo/:todoid',(req,res,next)=>{
     todos = todos.filter((todoItem)=>todoItem.id !== req.params.todoid)
    res.status(200).json({message:'deleted todo',todos:todos})
})
export default router;