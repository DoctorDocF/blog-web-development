import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreatePostForm = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      await onCreate(formData);
      setFormData({ title: '', content: '', tags: [] });
      onClose();
    }
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          📝 Создать новый пост
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Заголовок поста"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              fullWidth
            />
            
            <TextField
              label="Содержание"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              multiline
              rows={6}
              fullWidth
            />

            <Box>
              <Typography variant="body2" gutterBottom>
                Теги (нажмите Enter чтобы добавить)
              </Typography>
              <TextField
                label="Добавить тег"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                fullWidth
                size="small"
              />
              
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => removeTag(tag)}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Создать пост
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreatePostForm;
