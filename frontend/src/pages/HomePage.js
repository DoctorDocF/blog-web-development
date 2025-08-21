import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BlogPost from '../components/BlogPost';
import CreatePostForm from '../components/CreatePostForm';
import { usePosts } from '../hooks/usePosts';

const HomePage = () => {
  const { posts, loading, error, createPost, deletePost, searchPosts } = usePosts();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = async (postData) => {
    await createPost({
      ...postData,
      date: new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      searchPosts(query);
    } else if (query.length === 0) {
      searchPosts(''); // reset to all posts
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          🚀 Web Development Blog
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Современные технологии и лучшие практики веб-разработки
        </Typography>
      </Box>

      {/* Search and Create */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Поиск постов..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          Новый пост
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Posts List */}
      <Box>
        {posts.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary">
            {searchQuery ? 'Посты не найдены' : 'Пока нет постов'}
          </Typography>
        ) : (
          posts.map((post) => (
            <Box key={post.id} sx={{ position: 'relative' }}>
              <BlogPost
                title={post.title}
                content={post.content}
                date={post.date}
                tags={post.tags || []}
              />
              <IconButton
                onClick={() => deletePost(post.id)}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'error.light',
                  '&:hover': { backgroundColor: 'error.main' }
                }}
              >
                <DeleteIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          ))
        )}
      </Box>

      {/* Create Post Dialog */}
      <CreatePostForm
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreatePost}
      />
    </Container>
  );
};

export default HomePage;
