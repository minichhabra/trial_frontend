const mongoose=require('mongoose');

const NotesSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    decription:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
    })
    
    model.export=mongoose.model('notes', NotesSchema);