import { useState, useEffect } from 'react';

// Mock данные для постов
const mockPosts = [
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

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Имитация загрузки данных
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки постов');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Имитация создания поста
  const createPost = async (postData) => {
    try {
      const newPost = {
        id: Math.max(...mockPosts.map(p => p.id)) + 1,
        ...postData,
        date: new Date().toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        author: "Admin"
      };
      
      mockPosts.unshift(newPost);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError('Ошибка создания поста');
      throw err;
    }
  };

  // Имитация удаления поста
  const deletePost = async (id) => {
    try {
      const index = mockPosts.findIndex(post => post.id === id);
      if (index !== -1) {
        mockPosts.splice(index, 1);
      }
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError('Ошибка удаления поста');
      throw err;
    }
  };

  // Имитация поиска
  const searchPosts = async (query) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!query) {
        setPosts(mockPosts);
        return;
      }

      const filteredPosts = mockPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setPosts(filteredPosts);
    } catch (err) {
      setError('Ошибка поиска');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost, 
    deletePost,
    searchPosts,
    refetch: fetchPosts
  };
};
