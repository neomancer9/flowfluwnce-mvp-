'use client'

import { useEffect, useState } from 'react'
import CreatorCard from '../components/CreatorCard'
import { Box, Typography, Container } from '@mui/material'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'
import NicheFilter from '../components/NicheFilter'

interface Creator {
  id: string
  name: string
  bio: string
  location: string
  country: string
  language: string
  price_range: string
  audience_size: string
  image_url: string
  featured_until: string | null
  created_at: string
  updated_at: string
}

export default function Home() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [selectedNiches, setSelectedNiches] = useState<string[]>([])
  const [bookmarkedCreators, setBookmarkedCreators] = useState<string[]>([])
  const [anonUserId, setAnonUserId] = useState<string | null>(null)

  // Add useEffect to get or create anonymous user ID
  useEffect(() => {
    const getAnonUser = async () => {
      let userId = localStorage.getItem('anonUserId')
      if (!userId) {
        userId = crypto.randomUUID()
        localStorage.setItem('anonUserId', userId)
      }
      setAnonUserId(userId)
      // Fetch existing bookmarks for this user
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('creator_id')
        .eq('user_id', userId)
      
      if (data && !error) {
        setBookmarkedCreators(data.map(bookmark => bookmark.creator_id))
      }
    }
    getAnonUser()
  }, [])

  // Update bookmark handler to use Supabase
  const handleBookmark = async (creatorId: string) => {
    if (!anonUserId) {
      console.error('No anonymous user ID available');
      return;
    }
  
    const isCurrentlyBookmarked = bookmarkedCreators.includes(creatorId);
    
    try {
      if (isCurrentlyBookmarked) {
        const { error } = await supabase
          .from('user_bookmarks')
          .delete()
          .eq('user_id', anonUserId)
          .eq('creator_id', creatorId);
  
        if (error) {
          console.error('Error removing bookmark:', error);
          return;
        }
  
        setBookmarkedCreators(prev => prev.filter(id => id !== creatorId));
      } else {
        const { error } = await supabase
          .from('user_bookmarks')
          .insert([{ user_id: anonUserId, creator_id: creatorId }]);
  
        if (error) {
          console.error('Error adding bookmark:', error);
          return;
        }
  
        setBookmarkedCreators(prev => [...prev, creatorId]);
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };
  const fetchCreators = async (nicheIds: string[] = []) => {
    try {
      let query = supabase.from('creators').select('*')

      if (nicheIds.length > 0) {
        const { data: creatorIds } = await supabase
          .from('creator_niches')
          .select('creator_id')
          .in('niche_id', nicheIds)

        if (creatorIds && creatorIds.length > 0) {
          query = supabase
            .from('creators')
            .select('*')
            .in('id', creatorIds.map(row => row.creator_id))
        }
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      if (data) {
        const sortedCreators = data.sort((a, b) => {
          const aFeatured = a.featured_until ? new Date(a.featured_until) > new Date() : false
          const bFeatured = b.featured_until ? new Date(b.featured_until) > new Date() : false
          
          if (aFeatured && !bFeatured) return -1
          if (!aFeatured && bFeatured) return 1
          
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
        
        setCreators(sortedCreators)
      }
    } catch (error) {
      console.error('Error fetching creators:', error)
    }
  }

  useEffect(() => {
    fetchCreators(selectedNiches)
  }, [selectedNiches])

  const handleNicheSelect = (nicheIds: string[]) => {
    setSelectedNiches(nicheIds)
  }
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#fafafa',
    }}>
      <Sidebar />
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',  // Changed from 'hidden' to 'auto'
      }}>
        <Container maxWidth="xl" sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ 
            pt: { xs: 3, sm: 4 },
            pb: { xs: 2, sm: 3 },
            marginLeft: { xs: 0, sm: '100px' },  // Updated to match grid container
            textAlign: 'left',
            maxWidth: '100%',
          }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '28px',
                fontWeight: 600,
                mb: 1,
                pb: '40px',
                pt: { xs: 10, sm: 10 },
                color: '#3E5978',
                lineHeight: 1.2,
              }}
            >
              Discover Creators and Influencers
            </Typography>
            
            
            <NicheFilter onNicheSelect={handleNicheSelect} />
          </Box>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(auto-fill, minmax(280px, 1fr))',
              sm: 'repeat(auto-fill, minmax(320px, 1fr))',
              md: 'repeat(auto-fill, minmax(340px, 1fr))',
              lg: 'repeat(auto-fill, minmax(360px, 1fr))',
              xl: 'repeat(auto-fill, minmax(400px, 1fr))',
            },
            gap: { xs: 2, sm: 3, md: 4 },
            marginLeft: { xs: 0, sm: '72px' },
            alignItems: 'start',
          }}>
            {creators.map((creator) => (
              <CreatorCard
                key={creator.id}
                {...creator}
                isBookmarked={bookmarkedCreators.includes(creator.id)}
                onBookmark={() => handleBookmark(creator.id)}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
