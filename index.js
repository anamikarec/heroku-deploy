const express = require('express');
const app = express();

const Post = require('./src/models/post.model')
require('dotenv').config();

const mongoose = require('mongoose');
const port = process.env.PORT || 4000;

const url = process.env.DB_URL

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(url,connectionParams)
.then(()=>{
    console.log(`successfully connected`)
})
.catch((e)=>{
console.log(`error connecting : ${e}`);
})

app.get('/', (req, res) => {
    res.send("Hello World!2")
})

app.get('/posts',(req,res) => {
    var post = new Post();
    post.title = "Learn js"
    post.content = "hello js"

    post.save((err,data)=>{
        if(err) console.log(err);
        res.status(200).send(data);
    })
})


app.get('/read', (req, res)=>{
    Post.find((err, data)=>{
        if(err) 
         return res.status(500).send({"message": "Something went wrong!!"});
         else
         return res.status(200).send(data);

    })
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});