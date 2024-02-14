const express = require("express");
const {NoteModel} = require('../model/note.model');
const {auth} = require('../middleware/auth.middleware');

const noteRouter = express.Router();

noteRouter.post('/', auth, async (req, res) => {
    try{
        const note = new NoteModel(req.body);
        await note.save();
        res.send({"msg": "New note has been added"});
    } catch(err) {
        res.send({"msg": err});
    }
})

noteRouter.get('/', auth, async (req, res) => {
    try{
        const notes = await NoteModel.find({userId: req.body.userId});
        res.send({notes});
    } catch(err){
        res.send({"msg": err})
    }
})

noteRouter.patch('/:id', auth, async (req, res) => {
    const {id} = req.params;
    try{
        const note = await NoteModel.findOne({_id: id});
        if(note.userId === req.body.userId){
            await NoteModel.findByIdAndUpdate({_id:id}, req.body)
            res.send({"msg": "note has been updated"});
        } else{
            res.send({"msg": "You are not authorized"});
        }
        
    } catch(err){
        res.send({"msg": err})
    }
})

noteRouter.delete('/:id', auth, async (req, res) => {
    const {id} = req.params;
    try{
        const note = await NoteModel.findOne({_id: id});
        if(note.userId === req.body.userId){
            await NoteModel.findByIdAndDelete({_id:id})
            res.send({"msg": "note has been deleted"});
        } else{
            res.send({"msg": "You are not authorized"});
        }
        
    } catch(err){
        res.send({"msg": err})
    }
})

module.exports = {
    noteRouter
}