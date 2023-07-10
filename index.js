const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('./models/blog');

const app = express();

app.use(bodyParser.json());

// POST a new blog post
app.post('/blogs', (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content
    });
    blog.save()
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// GET all blog posts
app.get('/blogs', (req, res) => {
    Blog.find()
        .then(blogs => res.send(blogs))
        .catch(err => console.log(err));
});

// GET a specific blog post
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(blog => res.send(blog))
        .catch(err => console.log(err));
});

// UPDATE a blog post
app.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, {
        title: req.body.title,
        content: req.body.content
    }, { new: true })
        .then(blog => res.send(blog))
        .catch(err => console.log(err));
});

// DELETE a blog post
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndRemove(id)
        .then(blog => res.send(blog))
        .catch(err => console.log(err));
});

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => console.log('Server started on port 3000'));
