const Todo = require("../Model/todo");


const createTodo = async (req, res) => {
    const { message } = req.body;
    if (req.body.message === "") {
        return res.status(401).json({ errorMessage: "message cannot be found" })

    }
    if (!message || message.length < 4 || message.length > 20) {
        return res
            .status(400)
            .json({ errorMessage: "messege must be 4 and 0 charecters." });

    }

    try {
        const addToDo = await Todo.create({ message })
        res.status(200).json({ success: "created", data: addToDo })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
};

const getAllToDo = async (req, res) => {
    try {
        const getToDo = await Todo.find({});
        res.status(200).json({ data: getToDo });

    } catch (error) {
        console.log(error);


    }
};

const deleteToDo = async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "deleted" });

    } catch (error) {
        console.log(error)
    }
};
//findbyidanddelete(): this nis a mongose method that performs tow action in one step:
//find a document by it _id field
//delete the document file from the collection


//req.paramas.id refers to the id of the todo item that you want to delete, which is oassed in to the url.for exampel , if the rout is/ delete/:id,req paramas.id will contain the value of id 

//a clinte make a requst to an endpoint like:
//DELETE / todo/123abcdef
//where 123abcdef is the todo item of delete

//route handler
//the id (123abcdegf) get assined to req.params.id


//mongoose oprection:
//findidbyanddelete (req.params.id) runs and look for the document with_id i:123abcdef in the mongoDSb collection

const updateToDo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                message: req.body.message,
            },
            { new: true }

        );
        if (updatedTodo) {
            res.json({ message: "updated", data: updatedTodo });
        } else {
            res.status(404).json({ error: "Todo not found" });


        }
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
};
module.exports = {
    createTodo,
    getAllToDo,
    deleteToDo,
    updateToDo,
};