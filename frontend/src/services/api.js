const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  getPosts: async () => {
    // Заглушка для будущей реализации
    return [];
  },
  
  createPost: async (postData) => {
    // Заглушка для будущей реализации
    return postData;
  },
  
  deletePost: async (id) => {
    // Заглушка для будущей реализации
    return { message: 'Post deleted' };
  },
  
  searchPosts: async (query) => {
    // Заглушка для будущей реализации  
    return [];
  }
};
