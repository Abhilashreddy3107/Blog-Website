const express = require('express');
const app = express();
const port = 3000;

// Sample data for posts (temporary storage)
let posts = [];

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

// Route to handle post creation form submission
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  const newPost = { title, content, author };
  posts.push(newPost);
  res.redirect('/');
});

// Route to display all posts
app.get('/posts', (req, res) => {
    res.render('posts', { posts: posts });
  }); 
  
// Route to render post edit form
app.get('/posts/:id/edit', (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  res.render('edit', { post, id });
});

// Route to handle post edit form submission
app.post('/posts/:id/edit', (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  posts[id] = { title, content, author };
  res.redirect('/');
});

// Route to delete a post
app.post('/posts/:id/delete', (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect('/posts');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
