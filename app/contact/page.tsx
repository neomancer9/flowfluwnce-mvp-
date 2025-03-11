'use client'

import { Box, Typography, Button, Container } from '@mui/material'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/navigation'

export default function Contact() {
  const router = useRouter()

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
            MOVE AWAY FROM BORING MARKETING & LETS WORK TOGETHER
          </Typography>

          <Typography sx={{
            fontSize: { xs: '16px', sm: '18px' },
            color: '#64748B',
            mb: { xs: 4, sm: 5 },
          }}>
            Work with us one-on-one.
          </Typography>

          <Button
            variant="contained"
            startIcon={<PhoneInTalkOutlinedIcon />}
            onClick={() => router.push('/workwithus')}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1a1a1a',
              },
            }}
          >
            Book A Call
          </Button>
        </Container>
      </Box>
    </Box>
  )
}