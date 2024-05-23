const Task = require('../models/Task')

module.exports = class TaskController {
    static createTask(req, res){
        res.render('tasks/create')
    }

    static createTaskSave(req, res){

        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        Task.create(task)

        res.redirect('/tasks')
    }

    static async showTask(req, res){
        const tasks = await Task.findAll({raw:true})

        res.render('tasks/show', {tasks})
    }

    static async editTask(req, res){
        const id = req.params.id

        const task = await Task.findOne({where : {id:id}, raw : true})

        res.render('tasks/edit', {task})
    }

    static async editTaskPost(req, res){
        const id = req.body.id

        const task ={
            title: req.body.title,
            description: req.body.description
        }

        await Task.update(task, {where : {id:id}})

        res.redirect('/tasks')

    }

    static async toggleTaskStatus(req, res) {
        const id = req.body.id

        const task = await Task.findOne({where: {id:id}, raw:true})

        if(task.done === false) task.done = true
        else if(task.done === true) task.done = false

        await Task.update(task, {where: {id:id}})

        res.redirect('/tasks')
    }

    static async removeTask(req, res){
        const id = req.body.id

        await Task.destroy({where: {id:id}})

        res.redirect('/tasks')
    }
}