'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Container, Avatar, Chip, IconButton } from '@mui/material'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EastIcon from '@mui/icons-material/East'
import { useRouter } from 'next/navigation'

interface Creator {
  id: string
  name: string
  image_url: string
  price_range: string
  niches: Array<{ id: string; name: string }>
}

export default function ListPage() {
  const router = useRouter()
  const [bookmarkedCreators, setBookmarkedCreators] = useState<Creator[]>([])
  const [anonUserId, setAnonUserId] = useState<string | null>(null)

  useEffect(() => {
    const getBookmarkedCreators = async () => {
      const userId = localStorage.getItem('anonUserId')
      if (!userId) return
      setAnonUserId(userId)

      const { data: bookmarks } = await supabase
        .from('user_bookmarks')
        .select('creator_id')
        .eq('user_id', userId)

      if (bookmarks) {
        const creatorIds = bookmarks.map(b => b.creator_id)
        const { data: creators } = await supabase
          .from('creators')
          .select(`
            id,
            name,
            image_url,
            price_range,
            niches:creator_niches(
              niche:niches(id, name)
            )
          `)
          .in('id', creatorIds)

        if (creators) {
          setBookmarkedCreators(creators.map(creator => ({
            ...creator,
            niches: creator.niches.map((n: any) => n.niche)
          })))
        }
      }
    }

    getBookmarkedCreators()
  }, [])

  const handleBookmark = async (creatorId: string) => {
    if (!anonUserId) return

    try {
      await supabase
        .from('user_bookmarks')
        .delete()
        .eq('user_id', anonUserId)
        .eq('creator_id', creatorId)

      setBookmarkedCreators(prev => prev.filter(c => c.id !== creatorId))
    } catch (error) {
      console.error('Error removing bookmark:', error)
    }
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
        overflow: 'auto',
        backgroundColor: '#fff',
      }}>
        <Container maxWidth="xl" sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ 
            pt: { xs: 3, sm: 4 },
            pb: { xs: 2, sm: 3 },
            marginLeft: { xs: 0, sm: '100px' },
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 6,
              pt: { xs: 10, sm: 10 },
            }}>
              <Typography variant="h1" sx={{
                fontSize: '28px',
                fontWeight: 600,
                color: '#3E5978',
                lineHeight: 1.2,
              }}>
                Bookmarked Creators
              </Typography>
              
              <Box
                onClick={() => router.push('/brandonboarding')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: '#000',
                  color: '#fff',
                  py: 1,
                  px: 3,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    bgcolor: '#1c1c1c',
                    boxShadow: '0 4px 6px rgba(75, 75, 75, 0.12)',
                  },
                }}
              >
                <Typography sx={{ 
                  fontSize: '14px',
                  fontWeight: 500,
                }}>
                  GET A QUOTE
                </Typography>
                <EastIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>

            <Box sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid #EAEAEA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              {/* Table Header */}
              
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '48px minmax(120px, 1fr) minmax(100px, 1fr) 48px',
                  sm: '48px minmax(150px, 200px) 1fr minmax(120px, 150px) 48px'
                },
                borderBottom: '1px solid #EAEAEA',
                backgroundColor: '#FAFAFA',
                position: 'sticky',
                top: 0,
                zIndex: 10,
              }}>
                <Box sx={{ p: 2 }} />
                <Box sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderRight: '1px solid #EAEAEA',
                }}>
                  <Typography sx={{ 
                    fontSize: { xs: '12px', sm: '14px' },
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Name</Typography>
                </Box>
                <Box sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderRight: '1px solid #EAEAEA',
                }}>
                  <Typography sx={{ 
                    fontSize: { xs: '12px', sm: '14px' },
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Categories</Typography>
                </Box>
                <Box sx={{
                  p: 2,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  borderRight: '1px solid #EAEAEA',
                }}>
                  <Typography sx={{ 
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>Price Range</Typography>
                </Box>
                <Box sx={{ p: 2 }} />
              </Box>
              {/* Table Body */}
              {bookmarkedCreators.map((creator) => (
                <Box
                  key={creator.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '48px 1fr 48px',
                      sm: '48px 150px 1fr 48px',
                      md: '48px 200px 1fr 150px 48px'
                    },
                    borderBottom: '1px solid #EAEAEA',
                    transition: 'background-color 0.2s',
                    
                  }}
                >
                  <Box sx={{ 
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={creator.image_url}
                        sx={{ 
                          width: { xs: 20, sm: 25 },
                          height: { xs: 20, sm: 25 },
                          cursor: 'pointer',
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{
                    p: 2,
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    borderRight: '1px solid #EAEAEA',
                  }}>
                    <Typography sx={{ 
                      fontSize: { xs: '14px', sm: '16px' },
                      color: '#37352F',
                      fontWeight: 500,
                    }}>
                      {creator.name}
                    </Typography>
                  </Box>
                  <Box sx={{
                    p: { xs: 1, sm: 2 },
                    display: 'flex',
                    gap: { xs: 0.5, sm: 1 },
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    borderRight: '1px solid #EAEAEA',
                  }}>
                    {creator.niches.map((niche) => (
                      <Chip
                        key={niche.id}
                        label={niche.name}
                        size="small"
                        sx={{
                          height: { xs: '20px', sm: '24px' },
                          backgroundColor: '#EBF5FF',
                          color: '#1E40AF',
                          fontWeight: 500,
                          fontSize: { xs: '10px', sm: '12px' },
                          border: '1px dashed #93C5FD',
                          borderRadius: '4px',
                          '& .MuiChip-label': {
                            px: { xs: 1, sm: 1.5 },
                            py: { xs: 0.25, sm: 0.5 },
                          },
                          '&:hover': {
                            backgroundColor: '#DBEAFE',
                            opacity: 0.9,
                          }
                        }}
                      />
                    ))}
                  </Box>
                  <Box sx={{
                    p: 2,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    borderRight: '1px solid #EAEAEA',
                  }}>
                    <Typography sx={{ 
                      fontSize: { xs: '12px', sm: '14px' },
                      color: '#37352F',
                    }}>
                      {creator.price_range}
                    </Typography>
                  </Box>
                  <Box sx={{
                    p: { xs: 1, sm: 2 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <IconButton
                      size="small"
                      onClick={() => handleBookmark(creator.id)}
                      sx={{
                        width: { xs: 24, sm: 28 },
                        height: { xs: 24, sm: 28 },
                        color: '#37352F',
                        backgroundColor: '#F5F5F5',
                      }}
                    >
                      <BookmarkIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              {bookmarkedCreators.length === 0 && (
                <Box sx={{ 
                  p: 6,
                  textAlign: 'center',
                  color: '#6B7280',
                  borderTop: '1px solid #EAEAEA',
                }}>
                  <Typography sx={{ fontSize: '14px' }}>
                    No bookmarked creators yet
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}