'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Typography, Chip, Grid, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { supabase } from '../../lib/supabase'
import Image from 'next/image'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LanguageIcon from '@mui/icons-material/Language'
import Sidebar from '../../components/Sidebar'
import { useParams } from 'next/navigation'


const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/>
      <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01"/>
    </g>
  </svg>
)

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path fill="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m14 12l-3.5 2v-4z"/>
      <path d="M2 12.708v-1.416c0-2.895 0-4.343.905-5.274c.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9s2.561.027 3.912.065c2.851.081 4.277.121 5.182 1.053S22 8.398 22 11.292v1.415c0 2.896 0 4.343-.905 5.275c-.906.931-2.331.972-5.183 1.052c-1.35.039-2.73.066-3.912.066s-2.561-.027-3.912-.066c-2.851-.08-4.277-.12-5.183-1.052S2 15.602 2 12.708Z"/>
    </g>
  </svg>
)

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
    <path fill="currentColor" d="M224 74a50.06 50.06 0 0 1-50-50a6 6 0 0 0-6-6h-40a6 6 0 0 0-6 6v132a22 22 0 1 1-31.43-19.89a6 6 0 0 0 3.43-5.42V88a6 6 0 0 0-7-5.91C52.2 88.28 26 120.05 26 156a74 74 0 0 0 148 0v-43.07A101.3 101.3 0 0 0 224 126a6 6 0 0 0 6-6V80a6 6 0 0 0-6-6m-6 39.8a89.13 89.13 0 0 1-46.5-16.69A6 6 0 0 0 162 102v54a62 62 0 0 1-124 0c0-27.72 18.47-52.48 44-60.38v31.53A34 34 0 1 0 134 156V30h28.29A62.09 62.09 0 0 0 218 85.71Z"/>
  </svg>
)

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" style={{ fill: 'currentColor' }}>
    <path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z" />
  </svg>
);

// Interfaces
interface CreatorNiche {
  niche_id: string;
}

interface Creator {
  id: string;
  name: string;
  image_url: string;
  bio: string;
  long_bio: string;
  location: string;
  country: string;
  language: string;
  niche_ids: string[];
  price_range: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  services: string[];
  carousel_links: string[];
  featured_until: string | null;
  audience_size: string;
}

interface Niche {
  id: string;
  name: string;
}

// Styled components
const ProfileImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '1',
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
}));

const SocialLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
  color: '#000',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  padding: '8px 16px',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  position: 'absolute',
  top: '16px',
  left: '16px',
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
    gap: '12px',
  },
}));

const LocationChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  marginRight: '8px',
  marginBottom: '8px',
  border: '2px solid #edeff2',
  padding: '0 4px',
  height: '28px',
  '& .MuiChip-label': {
    fontWeight: 400,
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '24px',
    '& .MuiChip-label': {
      fontSize: '12px',
    },
  },
}));

const FeaturedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#FFE0B3',
  color: '#421300',
  height: '32px',
  minWidth: '190px',
  padding: '10px',
  borderRadius: '8px',
  '& .MuiChip-label': {
    fontSize: '16px',
    fontWeight: '300',
  },
  [theme.breakpoints.down('sm')]: {
    height: '28px',
    minWidth: 'auto',
    '& .MuiChip-label': {
      fontSize: '14px',
    },
  },
}));

const NicheChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '2px dashed #93c5fd',
  margin: '0 8px 8px 0',
  '& .MuiChip-label': {
    fontSize: '14px',
    color: '#1565C0',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiChip-label': {
      fontSize: '12px',
    },
  },
}));

const MetricBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '15px',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  marginBottom: '16px',
  marginTop: '32px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    marginTop: '24px',
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: '16px',
  padding: '16px',
  border: '1px solid #eee',
  borderRadius: '12px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    gap: '12px',
  },
}));

const VideoCard = styled(Box)(({ theme }) => ({
  width: '280px',
  height: '500px',
  flexShrink: 0,
  borderRadius: '8px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    height: '400px',
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    padding: 0,
  },
}));

export default function CreatorProfile() {
  const params = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [niches, setNiches] = useState<Niche[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSocialLinks, setHasSocialLinks] = useState(false);
  const [hasVideos, setHasVideos] = useState(false);

  useEffect(() => {
    async function fetchCreatorAndNiches() {
      if (!params.id) {
        console.log('No ID in params:', params);
        return;
      }
      
      try {
        // Fetch creator data
        const { data: creatorData, error: creatorError } = await supabase
          .from('creators')
          .select(`
            *,
            creator_niches (
              niche_id
            )
          `)
          .eq('id', params.id)
          .single();

        if (creatorError) {
          console.error('Error fetching creator:', creatorError);
          return;
        }

        if (!creatorData) {
          console.log('No creator found with ID:', params.id);
          return;
        }

        setCreator(creatorData);
        
        // Check if creator has social media links
        const hasSocial = !!(creatorData.instagram || creatorData.tiktok || creatorData.youtube);
        setHasSocialLinks(hasSocial);
        
        // Check if creator has videos
        const hasCarouselVideos = !!(creatorData.carousel_links && creatorData.carousel_links.length > 0 && 
          creatorData.carousel_links.some((link: string) => !!link));
        setHasVideos(hasCarouselVideos);

        // Extract niche IDs from creator_niches
        const nicheIds = creatorData.creator_niches?.map((cn: CreatorNiche) => cn.niche_id) || [];
        
        if (nicheIds.length > 0) {
          // Fetch niches data
          const { data: nichesData, error: nichesError } = await supabase
            .from('niches')
            .select('id, name')
            .in('id', nicheIds);

          if (nichesError) {
            console.error('Error fetching niches:', nichesError);
          } else {
            setNiches(nichesData || []);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCreatorAndNiches();
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Sidebar />
        <ContentContainer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </ContentContainer>
      </Box>
    );
  }

  if (!creator) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Sidebar />
        <ContentContainer sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Creator not found</Typography>
        </ContentContainer>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#FAFAFA', flexDirection: { xs: 'column', md: 'row' } }}>
      <Sidebar />
      <ContentContainer>
        <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 4, md: 8 } }}>
          {/* Main content area */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Left column - Profile image */}
            <Grid item xs={12} md={4}>
              <ProfileImage>
                <Image
                  src={creator.image_url}
                  alt={creator.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {hasSocialLinks && (
                  <SocialLinks>
                    {creator.instagram && (
                      <SocialLink href={creator.instagram} target="_blank" rel="noopener">
                        <InstagramIcon />
                      </SocialLink>
                    )}
                    {creator.tiktok && (
                      <SocialLink href={creator.tiktok} target="_blank" rel="noopener">
                        <TikTokIcon />
                      </SocialLink>
                    )}
                    {creator.youtube && (
                      <SocialLink href={creator.youtube} target="_blank" rel="noopener">
                        <YoutubeIcon />
                      </SocialLink>
                    )}
                  </SocialLinks>
                )}
              </ProfileImage>
            </Grid>
            
            {/* Right column - Profile info */}
            <Grid item xs={12} md={8}>
              {/* Creator name and featured badge */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 500, fontSize: { xs: '24px', sm: '28px', md: '36px' } }}>
                  {creator.name}
                </Typography>
                
                {creator.featured_until && new Date(creator.featured_until) > new Date() && (
                  <FeaturedChip
                    icon={<StarIcon />}
                    label="Monthly Featured"
                  />
                )}
              </Box>
              
              {/* Location and language */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
                {creator.location && (
                  <LocationChip icon={<LocationOnIcon fontSize="small" />} label={creator.location} />
                )}
                {creator.language && (
                  <LocationChip icon={<LanguageIcon fontSize="small" />} label={creator.language} />
                )}
              </Box>
              
              {/* Bio */}
              <Typography sx={{ mb: 3, color: '#333', lineHeight: 1.6, fontSize: { xs: '14px', sm: '16px' } }}>
                {creator.long_bio || creator.bio}
              </Typography>
              
              {/* Niches */}
              {niches.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  {niches.map((niche) => (
                    <NicheChip key={niche.id} label={niche.name} />
                  ))}
                </Box>
              )}
              
              {/* Services */}
              {creator.services && creator.services.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: '16px', sm: '18px' } }}>
                    Services
                  </Typography>
                  <Typography sx={{ mb: 2, fontSize: { xs: '14px', sm: '16px' } }}>
                    {creator.services.join(', ')}
                  </Typography>
                </>
              )}
              
              {/* Metrics */}
              <Grid container spacing={{ xs: 1, sm: 3 }} sx={{ mb: 3 }}>
                {creator.audience_size && (
                  <Grid item xs={12} sm={6}>
                    <MetricBox>
                      <Typography variant="h6" color="blackgray" sx={{ fontWeight: 500, fontSize: { xs: '14px', sm: '16px' } }}>
                        Audience Size
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: { xs: '18px', sm: '20px', md: '24px' } }}>
                        {creator.audience_size}
                      </Typography>
                    </MetricBox>
                  </Grid>
                )}
                {creator.price_range && (
                  <Grid item xs={12} sm={6}>
                    <MetricBox>
                      <Typography variant="h6" color="blackgray" sx={{ fontWeight: 500, fontSize: { xs: '14px', sm: '16px' } }}>
                        Price Range
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: { xs: '18px', sm: '20px', md: '24px' } }}>
                        {creator.price_range}
                      </Typography>
                    </MetricBox>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          
          {/* Video showcase section - only show if videos exist */}
          {hasVideos && (
            <>
              <SectionTitle variant="h5">
                Video Showcase
              </SectionTitle>
              <VideoContainer>
                {creator.carousel_links?.map((link, index) => {
                  if (!link) return null;
                  
                  let embedUrl = link;
                  try {
                    // Handle Wistia video URL
                    const wistiaId = link.split('/medias/')[1]?.split('?')[0];
                    embedUrl = wistiaId ? `https://fast.wistia.net/embed/iframe/${wistiaId}` : link;
                  } catch (error) {
                    console.error('Error processing video link:', error);
                    return null;
                  }
                  
                  return (
                    <VideoCard key={index}>
                      <iframe
                        src={embedUrl}
                        frameBorder="0"
                        scrolling="no"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        style={{ width: '100%', height: '100%' }}
                        title={`Creator video ${index + 1}`}
                      />
                    </VideoCard>
                  );
                })}
              </VideoContainer>
            </>
          )}
        </Container>
      </ContentContainer>
    </Box>
  );
}