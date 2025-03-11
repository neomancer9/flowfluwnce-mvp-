'use client'

import { Box, Typography, Button, Container } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function Help() {
  const [isHovered, setIsHovered] = useState(false)
  const email = 'Support@flowfluence.com'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
  }

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#fff',
    }}>
      <Sidebar />
      <Box sx={{
        flexGrow: 1,
        marginLeft: { xs: 0, sm: '72px' },
        transition: 'margin 0.3s ease',
      }}>
        <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          px: { xs: 2, sm: 4 },
          py: { xs: 8, sm: 12 },
          textAlign: 'center',
        }}>
          <Typography variant="h1" sx={{
            fontSize: { xs: '32px', sm: '40px', md: '48px' },
            fontWeight: 700,
            color: '#1E293B',
            lineHeight: 1.2,
            maxWidth: '600px',
            mb: { xs: 3, sm: 4 },
          }}>
            Need Help?
            Reach out to Support@flowfluence.com
          </Typography>

          

          <Button
            variant="contained"
            startIcon={isHovered ? <ContentCopyOutlinedIcon /> : <EmailOutlinedIcon />}
            onClick={handleCopy}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#1a1a1a',
              },
            }}
          >
            {isHovered ? 'Copy Email' : 'Message Us'}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}