import { styled } from '@mui/material/styles';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


// Custom Icon Components
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" style={{ fill: 'currentColor' }}>
    <path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z" />
  </svg>
);


const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" style={{ fill: 'currentColor' }}>
    <path d="M128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM240,56H16a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H240a8,8,0,0,0,8-8V64A8,8,0,0,0,240,56ZM193.65,184H62.35A56.78,56.78,0,0,0,24,145.65v-35.3A56.78,56.78,0,0,0,62.35,72h131.3A56.78,56.78,0,0,0,232,110.35v35.3A56.78,56.78,0,0,0,193.65,184ZM232,93.37A40.81,40.81,0,0,1,210.63,72H232ZM45.37,72A40.81,40.81,0,0,1,24,93.37V72ZM24,162.63A40.81,40.81,0,0,1,45.37,184H24ZM210.63,184A40.81,40.81,0,0,1,232,162.63V184Z" />
  </svg>
);

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" style={{ fill: 'currentColor' }}>
    <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z" />
  </svg>
);

const CardWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '400px',
  width: '100%',
  position: 'relative',
  margin: '16px',
  '&:hover': {
    '& .creator-image': {
      '&::after': {
        opacity: 0.1,
      }
    },
    '& .bio-text': {
      backgroundColor: 'rgba(255, 149, 0, 0.1)',
    }
  },
  [theme.breakpoints.down('sm')]: {
    margin: '8px',
    width: 'calc(100% - 16px)',
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    borderRadius: '13px',
    pointerEvents: 'none',
  },
  '&:hover::after': {
    opacity: 0.05,
  }
});

const CreatorImage = styled('img')({
  width: '100%',
  height: '240px',
  objectFit: 'cover',
  borderRadius: '13px',
  display: 'block',
});
const BookmarkButton = styled(IconButton)({
  position: 'absolute',
  top: '12px',
  right: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

const ContentWrapper = styled(Box)({
  padding: '16px 4px', // reduced horizontal padding
});

const HeaderWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
});

const FeaturedChip = styled(Chip)({
  backgroundColor: '#FFE0B3',
  color: '#421300',
  height: '32px',
  minWidth: '190px', // changed from fixed width to minWidth
  padding: '10px',
  borderRadius: '8px',
  '& .MuiChip-label': {
    fontSize: '16px',
    fontWeight: '300',
  },
});

const InfoChip = styled(Chip)({
  backgroundColor: '#F5F5F5',
  border: '1px solid #E0E0E0',
  borderRadius: '6px',
  height: '24px',
  '& .MuiChip-label': {
    fontSize: '14px',
    color: '#666666',
  },
  '& .MuiChip-icon': {
    color: '#666666',
    fontSize: '16px',
  },
});

const MetricChip = styled(Chip)({
  backgroundColor: 'rgba(255, 149, 0, 0.05)',
  padding: '10px',
  border: '1px solid rgba(255, 149, 0, 0.2)',
  borderRadius: '8px',
  height: '32px',
  width: 'fitcontent',
  '& .MuiChip-label': {
    fontSize: '18px',
    color: '#C25E00',
  },
});
// Update the CreatorCardProps interface
interface CreatorCardProps {
  id: string
  name: string
  image_url: string
  bio: string
  location: string
  country: string
  language: string
  audience_size: string
  price_range: string
  featured_until: string | null
  isBookmarked?: boolean
  onBookmark?: (id: string) => void
}
// Remove the duplicate BookmarkButton implementation that's in the middle of the file
// (Delete the section that starts with "// Update the BookmarkButton component in the render section")

export default function CreatorCard({
  id,
  name,
  image_url,
  bio,
  location,
  country,
  language,
  audience_size,
  price_range,
  featured_until,
  isBookmarked = false,
  onBookmark
}: CreatorCardProps) {
  const router = useRouter();
  const isFeatured = featured_until ? new Date(featured_until) > new Date() : false;

  const handleCardClick = () => {
    router.push(`/creator/${id}`);
  };

  return (
    <CardWrapper
      onClick={handleCardClick}
      sx={{ 
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out',
        }
      }}
    >
      <Box position="relative">
        <ImageContainer>
          <CreatorImage
            src={image_url}
            alt={`${name}'s profile`}
          />
          <BookmarkButton 
            size="small"
            onClick={(e) => {
              e.preventDefault();
              onBookmark?.(id);
            }}
          >
            {isBookmarked ? (
              <BookmarkIcon sx={{ color: '#000' }} />
            ) : (
              <BookmarkBorderIcon sx={{ color: '#000' }} />
            )}
          </BookmarkButton>
        </ImageContainer>
      </Box>
      <ContentWrapper>
        <HeaderWrapper>
          <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 600 }}>
            {name}
          </Typography>
          {isFeatured && (
            <FeaturedChip
              icon={<StarIcon />}
              label="Monthly Featured"
            />
          )}
        </HeaderWrapper>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <InfoChip
            icon={<LocationOnIcon />}
            label={location}
          />
          <InfoChip
            icon={<LanguageIcon />}
            label={language}
          />
        </Box>

        <Typography
          className="bio-text"
          sx={{
            fontSize: '18px',
            color: '#666666',
            mb: 2,
            lineHeight: 1.5,
            transition: 'background-color 0.2s ease',
            borderRadius: '4px',
            padding: '4px',
          }}
        >
          {bio}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MetricChip
            icon={<SpeakerIcon />}
            label={audience_size}
          />
          <MetricChip
            icon={<CameraIcon />}
            label={price_range}
          />
        </Box>
      </ContentWrapper>
    </CardWrapper>
  );
};