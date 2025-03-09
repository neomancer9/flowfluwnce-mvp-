'use client'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {  IconButton, InputBase, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { usePathname, useRouter } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ContactPageIcon from '@mui/icons-material/ContactPage'

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const TopBar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '64px',
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #D7D8DC',
  display: 'none', // Hidden by default
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  zIndex: 1201,
  [theme.breakpoints.down('sm')]: {  // Show on mobile devices
  display: 'flex', },
}));

// Update SidebarContainer mobile styles
// Update the SidebarContainer definition
interface SidebarContainerProps {
  isOpen?: boolean;
}

const SidebarContainer = styled('div')<SidebarContainerProps>(({ theme, isOpen }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  height: '100vh',
  backgroundColor: '#F8F9FA',
  width: isOpen ? '280px' : '72px',
  transition: 'width 0.3s ease, transform 0.3s ease',
  borderRight: '1px solid #D7D8DC',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1200,
  [theme.breakpoints.down('sm')]: {
    top: '64px', // Add space for TopBar
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    width: '280px',
    height: 'calc(100vh - 64px)',
    padding: '16px 0',
    margin: '8px 0'
  },
}));


const Logo = styled('div')(({ theme }) => ({
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  height: '100px',
  '& img': {
    width: '200px',
    height: '100%',
    objectFit: 'cover'
  }, 
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const SearchBar = styled(Box)({
  margin: '8px 16px',
  position: 'relative',
  border: '1px solid #D7D8DC',
  borderRadius: '6px',
  backgroundColor: '#F1F3F4',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.03)',
  '&:hover': {
    backgroundColor: '#E8EAED',
    borderColor: '#BDBDBD',
  },
});

const Search = styled(InputBase)(({ theme }) => ({
  width: '100%',
  height: '36px',
  padding: '0 12px',
  paddingLeft: '40px',
  fontSize: '16px',
  '& .MuiInputBase-input': {
    fontSize: '18px',
  },
}));
// Find the MenuItem styled component definition and update it
// Update the MenuItem styled component
const MenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'active'
})<{ active?: boolean; isOpen?: boolean }>(({ theme, active, isOpen }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: isOpen ? 'flex-start' : 'center',
  cursor: 'pointer',
  borderRadius: '6px',
  margin: '8px 16px',
  ...(isOpen ? {
    padding: '8px 16px',
    height: '40px',
    width: 'auto',
  } : {
    padding: '0',
    height: '40px',
    width: '40px',
    minWidth: '40px',
    '& .icon': {
      margin: '0',  // Remove margin when collapsed
    }
  }),
  '& .icon': {
    color: '#3A3E46',
    fontSize: '20px',
    margin: isOpen ? '0 10px 0 0' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isOpen ? 'auto' : '100%',  // Take full width when collapsed
    height: '100%',  // Take full height
  },
  '&:hover': {
    backgroundColor: '#FFFFFF',
    border: '1px solid #D7D8DC',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    '& .icon': {
      color: '#284366',
    },
    '& .text': {
      color: '#1A1A1A',
    },
  },
  ...(active && {
    backgroundColor: '#FFFFFF',
    border: '1px solid #D7D8DC',
    '& .icon': {
      color: '#284366',
    },
  }),
}));

const CollapseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3A3E46" viewBox="0 0 256 256">
    <path d="M48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm176,80H152V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,152,200V136h72a8,8,0,0,0,0-16Z" />
  </svg>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: 'creators', icon: <PeopleOutlineRoundedIcon />, text: 'Creators & Influencers', path: '/home' },
    { id: 'mylist', icon: <FormatListBulletedOutlinedIcon />, text: 'My List', path: '/list' },
    { id: 'contact', icon: <MailOutlineRoundedIcon />, text: 'Contact', path: 'https://www.stride-social.com/contact' },
    { id: 'help', icon: <ContactSupportOutlinedIcon />, text: 'Help & Support', path: '#' },
    { id: 'terms', icon: <GavelOutlinedIcon />, text: 'Terms & Privacy', path: '#' },
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else if (path !== '#') {
      router.push(path);
    }
    setActiveItem(path);
  };

  return (
    <>
      <TopBar>
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={{ 
            height: '200px',
            width: '200px',
            objectFit: 'contain'
          }} 
        />
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          edge="start"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </TopBar>
      <SidebarContainer isOpen={isOpen}>
        <Logo onClick={() => !isOpen && setIsOpen(true)}>
          {isOpen ? (
            <img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
          ) : (
            <img src="/slogo.png" alt="Logo Icon" style={{ 
              height: '32px',
              width: '32px',
              marginLeft: '6px',
              objectFit: 'contain'
            }} />
          )}
          {isOpen && (
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              sx={{ ml: 'auto' }}
            >
              <CollapseIcon />
            </IconButton>
          )}
        </Logo>

        <SearchBar>
          <SearchIcon 
            sx={{ 
              position: 'absolute', 
              left: '12px', 
              top: '8px', 
              color: '#666666',
              fontSize: '20px'
            }} 
          />
          <Search placeholder="Search" />
        </SearchBar>

        <Box sx={{ mt: 2 }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              active={pathname === item.path || activeItem === item.id}
              isOpen={isOpen}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="icon">{item.icon}</span>
              {isOpen && (
                <span className="text" style={{ 
                  marginLeft: '12px', 
                  fontSize: '16px',
                  color: '#666666'
                }}>
                  {item.text}
                </span>
              )}
            </MenuItem>
          ))}
        </Box>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;