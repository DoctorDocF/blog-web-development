import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const BlogPost = ({ title, content, date, tags }) => {
  return (
    <Card sx={{ 
      mb: 3, 
      transition: '0.3s', 
      '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      } 
    }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          {content}
        </Typography>

        {tags && tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags.map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                size="small" 
                variant="filled"
                color="primary"
                sx={{ fontWeight: '500' }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPost;
