import { useState, useEffect, useRef } from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import { supabase } from '../lib/supabase';

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
    <path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z" />
  </svg>
);

interface NicheFilterProps {
  onNicheSelect: (selectedNicheIds: string[]) => void;
}

export default function NicheFilter({ onNicheSelect }: NicheFilterProps) {
  const [niches, setNiches] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    fetchNiches();
  }, []);
  const fetchNiches = async () => {
    const { data } = await supabase
      .from('niches')
      .select('id, name');
    if (data) setNiches(data);
  };
  const handleNicheToggle = (nicheId: string) => {
    const newSelection = selectedNiche === nicheId ? null : nicheId;
    setSelectedNiche(newSelection);
    onNicheSelect(newSelection ? [newSelection] : []);
  };
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if scrolled from left edge
      setShowLeftShadow(container.scrollLeft > 0);
      
      // Check if scrolled to right edge
      setShowRightShadow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };
 
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Initial check for shadows
      setTimeout(() => {
        handleScroll();
        
        // Check if scroll is needed (content wider than container)
        setShowRightShadow(container.scrollWidth > container.clientWidth);
      }, 100);
    }
    
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [niches]); // Re-run when niches change
  // Scroll left and right handler functions
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      mt: { xs: 2, sm: 0 },  // Reduced top margin on mobile
      px: { xs: 2, sm: 4 }
    }}>
      {/* Left blur effect */}
      {showLeftShadow && (
        <Box sx={{
          position: 'absolute',
          left: '83px',
          top: 0,
          height: '100%',
          width: '50px',
          background: 'linear-gradient(to right, #fafafa 0%, rgba(250, 250, 250, 0) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      )}
      {/* Right blur effect */}
      {showRightShadow && (
        <Box sx={{
          position: 'absolute',
          right: '16px',
          top: 0,
          height: '100%',
          width: '50px',
          background: 'linear-gradient(to left, #fafafa 0%, rgba(250, 250, 250, 0) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      )}
      {/* Filter Button */}
      <Box sx={{
        position: 'absolute',
        left: { xs: 2, sm: 6 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
      }}>
        <Box sx={{
          position: 'absolute',
          left: '-25px',  // Changed from right to left
          top: '-25px',
          height: '50px',
          width: '50px',
          background: 'linear-gradient(to right, #fafafa 0%, rgba(250, 250, 250, 0) 100%)',  // Changed gradient direction
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <IconButton 
          sx={{ 
            minWidth: { xs: 70, sm: 83 },
            height: { xs: 40, sm: 50 },
            borderRadius: 90,
            flexShrink: 0,
            backgroundColor: '#f4f4f4',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <FilterIcon />
        </IconButton>
      </Box>
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          overflowX: 'auto',
          pl: { xs: '70px', sm: '83px' },  // Adjusted padding for mobile
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          position: 'relative',
        }}
      >
        <Box sx={{
          display: 'flex',
          gap: { xs: 1, sm: 1.5 },
          flexWrap: 'nowrap',
          minWidth: 'min-content',
        }}>
          {niches.map((niche) => (  // Removed the slice() to show all niches
            <Chip
              key={niche.id}
              label={niche.name}
              onClick={() => handleNicheToggle(niche.id)}
              sx={{
                height: { xs: 40, sm: 48 },  // Smaller height on mobile
                px: { xs: 1.5, sm: 2 },      // Adjusted padding
                fontSize: { xs: '16px', sm: '18px' },  // Smaller font on mobile
                fontWeight: 400,
                borderRadius: 30,
                flexShrink: 0,
                backgroundColor: selectedNiche === niche.id ? '#000' : '#f5f5f5',
                color: selectedNiche === niche.id ? '#fff' : '#000',
                border: selectedNiche === niche.id ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
                boxShadow: selectedNiche === niche.id ? 'none' : 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: selectedNiche === niche.id ? '#000' : '#e0e0e0',
                },
                whiteSpace: 'nowrap',
                userSelect: 'none',
                maxWidth: { xs: '150px', sm: 'none' },  // Prevent text overflow on mobile
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  px: { xs: 1, sm: 2 }
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}