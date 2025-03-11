'use client'

import { useState } from 'react'
import { Box, Typography, TextField, Container, Button } from '@mui/material'
import Image from 'next/image'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../components/Sidebar'


export default function BrandOnboarding() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if brand already exists
      const { data: existingBrand, error: checkError } = await supabase
        .from('brands')
        .select('*')
        .eq('email', formData.email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing brand:', checkError);
        throw checkError;
      }

      if (existingBrand) {
        console.log('Brand already exists:', existingBrand);
      } else {
        // Insert brand data into Supabase
        const { data: brandData, error: brandError } = await supabase
          .from('brands')
          .insert([
            {
              name: formData.brandName,
              email: formData.email,
              created_at: new Date().toISOString(),
            }
          ]);

        if (brandError) {
          console.error('Brand insertion error:', brandError);
          throw brandError;
        }
      }

      // Fetch only this brand's bookmarked creators
      const userId = localStorage.getItem('anonUserId');
      if (!userId) {
        console.log('No anonymous user ID found');
        return;
      }

      const { data: bookmarks } = await supabase
        .from('user_bookmarks')
        .select('creator_id')
        .eq('user_id', userId);

      if (bookmarks) {
        const creatorIds = bookmarks.map(b => b.creator_id);
        const { data: creators, error: creatorsError } = await supabase
          .from('creators')
          .select(`
            id,
            name,
            price_range,
            niches:creator_niches(
              niche:niches(id, name)
            )
          `)
          .in('id', creatorIds);

        if (creatorsError) {
          console.error('Creators fetch error:', creatorsError);
          throw creatorsError;
        }

        const validCreators = creators?.map(creator => ({
          ...creator,
          niches: creator.niches.map((n: any) => n.niche)
        })) || [];

        console.log('Sending email with creators:', validCreators);

        // Send welcome email through API route
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brandName: formData.brandName,
            brandEmail: formData.email,
            selectedCreators: validCreators
          }),
        });

        const emailData = await emailResponse.json();

        if (!emailResponse.ok) {
          console.error('Email error:', emailData);
          throw new Error(emailData.message || 'Failed to send email');
        }
      } // end of if(bookmarks)
      
      router.push('/workwithus');
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
    }
  }; // end of handleSubmit

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
        <Container maxWidth="xl" sx={{ 
          width: '100%',
          height: '100%',
          px: { xs: 2, sm: 3, md: 4 },
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 8 },
            alignItems: { xs: 'center', md: 'center' },
            justifyContent: 'center',
            minHeight: '100%',
            pt: { xs: 6, md: 0 },
            marginLeft: { xs: 0, sm: '100px' },
          }}>
            {/* Hero Visual */}
            <Box sx={{
              width: { xs: '100%', md: '45%' },
              height: { xs: 200, md: 440 },
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              order: { xs: 1, md: 2 },
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Image
                src="/thunderbolt.png"
                alt="Hero Visual"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Form Container */}
            <Box sx={{
              width: { xs: '100%', md: '45%' },
              maxWidth: 480,
              order: { xs: 2, md: 1 },
            }}>
              <Typography variant="h1" sx={{
                fontSize: '28px',
                fontWeight: 700,
                mb: 1.5,
                color: '#111827',
                lineHeight: 1.2,
              }}>
                Welcome to FlowFluence
              </Typography>
              <Typography sx={{
                fontSize: '15px',
                color: '#6B7280',
                mb: 5,
                lineHeight: 1.5,
              }}>
                Let's get your brand set up to discover amazing creators
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Brand Name"
                  variant="outlined"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#F1F5F9',
                      },
                      '& fieldset': {
                        borderColor: '#E2E8F0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#CBD5E1',
                        borderWidth: '1px',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#64748B',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Work Email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#F1F5F9',
                      },
                      '& fieldset': {
                        borderColor: '#E2E8F0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#CBD5E1',
                        borderWidth: '1px',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#64748B',
                    },
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#000',
                    color: '#fff',
                    py: 2,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#1a1a1a',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </form>

              {/* Social Proof */}
              <Box sx={{
                mt: 4,
                textAlign: 'center',
              }}>
                <Typography sx={{
                  fontSize: '14px',
                  color: '#6B7280',
                  mb: 3,
                  fontWeight: 500,
                }}>
                  Trusted by leading brands worldwide
                </Typography>
                
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  flexWrap: 'wrap',
                  opacity: 0.7,
                }}>
                  {[
                    { src: '/manscaped.png', alt: 'Manscaped' },
                    { src: '/nordvpn.png', alt: 'NordVPN' },
                    { src: '/tinder.png', alt: 'Tinder' },
                    { src: '/bloom.png', alt: 'Bloom' }
                  ].map((logo, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 80,
                        height: 90,  // Updated from 32px to 90px
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}



