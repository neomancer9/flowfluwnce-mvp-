'use client'

import { Box, Container } from '@mui/material'
import Sidebar from '../components/Sidebar'

export default function BookCall() {
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
        height: '100vh',
        position: 'relative',
        marginTop: { xs: '64px', sm: 0 },
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}>
          <iframe
            src="https://amugv0ljkb6.typeform.com/StrideSocial"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            title="Book a Call"
          />
        </Box>
      </Box>
    </Box>
  )
}