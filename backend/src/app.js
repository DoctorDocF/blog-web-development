const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for blog posts
let posts = [
  {
    id: 1,
    title: "Основы React Development",
    content: "Изучаем основы React, компоненты, состояние и props. Современная веб-разработка начинается здесь...",
    date: "15 декабря 2024",
    tags: ["React", "JavaScript", "Frontend"],
    author: "Admin"
  },
  {
    id: 2,
    title: "API Integration Best Practices", 
    content: "Как правильно интегрировать REST API в ваше приложение. Error handling, loading states, и оптимизация...",
    date: "10 декабря 2024",
    tags: ["API", "Backend", "HTTP"],
    author: "Admin"
  }
];

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    tags: req.body.tags || [],
    author: "Admin"
  };
  
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  
  posts[index] = { ...posts[index], ...req.body };
  res.json(posts[index]);
});

app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  
  posts.splice(index, 1);
  res.json({ message: 'Post deleted successfully' });
});

app.get('/api/posts/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query) ||
    post.tags.some(tag => tag.toLowerCase().includes(query))
  );
  res.json(filteredPosts);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blog API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
