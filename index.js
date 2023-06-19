const express = require("express");
const cors = require("cors");
const upload = require("./helpers/upload")
const app = express();

//Configuração
app.use(express.json());
app.use(cors());
app.use(express.static("public"))



const port = process.env.PORT || 3001;

const books = [];

app.get("/", (req, res) => {
 return  res.json("Hellow Word")
})

app.get("/books", (req, res) => {
   return res.json(books)
})

app.post("/books", (req, res) => {
    const {title, name, description, select} = req.body;
   
    const newBooks = {
        id: Math.random().toString(36),
        title,
        name,
        description,
        select,
        isCompleted: false,
    }

    books.push(newBooks);

    console.log(newBooks)
    return res.json(newBooks);
})

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;

    const index = books.findIndex((bok) => bok.id === id);
   
    if(index < 0){
        return res.status(404).json({error})
    }

    books.splice(index, 1);

    return res.status(204).json();
})

app.listen(port, () => {
    console.log("Servidor rodando na porta 3001");
})