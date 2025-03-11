'use client'

import { Box, Typography, Container, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

export default function PrivacyAndTerms() {
  const [view, setView] = useState('privacy')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newView: string) => {
    if (newView !== null) {
      setView(newView)
    }
  }

  const renderPrivacyContent = () => (
    <>
      <Typography variant="h1" sx={{
        fontSize: { xs: '32px', sm: '40px' },
        fontWeight: 700,
        color: '#1E293B',
        mb: 4,
      }}>
        Privacy Policy
      </Typography>
      
      <Typography sx={{ color: '#475569', mb: 4 }}>
        Effective Date: 10/3/2025
      </Typography>

      <Typography sx={{ mb: 4 }}>
        Welcome to Flowfluence. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our influencer discovery platform.
      </Typography>

      {[
        {
          title: '1. Information We Collect',
          content: (
            <>
              <Typography>We collect the following types of information:</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                <li>
                  <Typography component="span" sx={{ fontWeight: 600 }}>Personal Information:</Typography>
                  {" "}Name, email address, phone number, payment details, and social media profiles when you register.
                </li>
                <li>
                  <Typography component="span" sx={{ fontWeight: 600 }}>Usage Data:</Typography>
                  {" "}Information about your interactions with our platform, including page visits and search queries.
                </li>
                <li>
                  <Typography component="span" sx={{ fontWeight: 600 }}>Cookies and Tracking Technologies:</Typography>
                  {" "}We use cookies to enhance your experience and analyze platform usage.
                </li>
              </Box>
            </>
          )
        },
        {
          title: '2. How We Use Your Information',
          content: (
            <>
              <Typography>We use your information to:</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                <li>Provide and improve our services.</li>
                <li>Facilitate connections between brands and influencers.</li>
                <li>Process payments and manage accounts.</li>
                <li>Send platform updates, promotional offers, and customer support communications.</li>
                <li>Ensure compliance with legal and regulatory requirements.</li>
              </Box>
            </>
          )
        },
        {
          title: '3. Data Sharing and Disclosure',
          content: (
            <>
              <Typography>We do not sell or rent your personal information. However, we may share data with:</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                <li>
                  <Typography component="span" sx={{ fontWeight: 600 }}>Brands and influencers</Typography>
                  {" "}to facilitate business transactions.
                </li>
                <li>
                  <Typography component="span" sx={{ fontWeight: 600 }}>Service providers</Typography>
                  {" "}that help us operate our platform.
                </li>
                <li>
                  <Typography component="span" sx={{ fontWeight: 600 }}>Legal authorities</Typography>
                  {" "}if required to comply with legal obligations.
                </li>
              </Box>
            </>
          )
        },
        {
          title: '4. Data Security',
          content: 'We implement security measures to protect your data. However, no method of transmission over the internet is 100% secure.'
        },
        {
          title: '5. Your Rights',
          content: (
            <>
              <Typography>You have the right to:</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt-out of marketing communications.</li>
                <li>Request data portability, where applicable.</li>
              </Box>
            </>
          )
        },
        {
          title: '6. Changes to This Policy',
          content: 'We may update this Privacy Policy. Any changes will be posted on this page with an updated effective date.'
        },
        {
          title: '7. Contact Us',
          content: 'For questions about this Privacy Policy, contact us at contact@flowfluence.com'
        }
      ].map((section, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 600, mb: 3 }}>
            {section.title}
          </Typography>
          {section.content}
        </Box>
      ))}
    </>
  )

  const renderTermsContent = () => (
    <>
      <Typography variant="h1" sx={{
        fontSize: { xs: '32px', sm: '40px' },
        fontWeight: 700,
        color: '#1E293B',
        mb: 4,
      }}>
        Terms of Service
      </Typography>

      <Typography sx={{ color: '#475569', mb: 4 }}>
        Effective Date: 10/3/2025
      </Typography>

      <Typography sx={{ mb: 4 }}>
        Welcome to Flowfluence! By using our creator discovery platform, you agree to these Terms of Service.
      </Typography>

      {[
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing or using our platform, you agree to abide by these terms. If you do not agree, do not use our services.'
        },
        {
          title: '2. User Accounts',
          content: (
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate our policies.</li>
            </Box>
          )
        },
        {
          title: '3. Platform Usage',
          content: (
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              <li>Brands and creators must comply with all applicable laws when using our services.</li>
              <li>We do not guarantee the success of influencer partnerships or brand collaborations.</li>
              <li>Misuse, fraud, or spamming is strictly prohibited.</li>
            </Box>
          )
        },
        {
          title: '4. Payment and Subscription',
          content: (
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              <li>Creators may choose a paid subscription for premium features.</li>
              <li>Payments are non-refundable unless otherwise stated.</li>
              <li>We use third-party payment processors to handle transactions securely.</li>
            </Box>
          )
        },
        {
          title: '5. Intellectual Property',
          content: (
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              <li>All content, trademarks, and branding on the platform belong to Flowfluence or its licensors.</li>
              <li>Users may not copy, distribute, or modify platform content without permission.</li>
            </Box>
          )
        },
        {
          title: '6. Limitation of Liability',
          content: 'We are not responsible for any disputes, losses, or damages arising from brand-creators interactions. Use the platform at your own risk.'
        },
        {
          title: '7. Termination',
          content: 'We reserve the right to terminate or suspend access to our platform for users who violate these terms.'
        },
        {
          title: '8. Changes to Terms',
          content: 'We may update these Terms of Service. Continued use of the platform constitutes acceptance of any changes.'
        },
        {
          title: '9. Contact Us',
          content: 'For questions about these terms, contact us at contact@flowfluence.com'
        }
      ].map((section, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 600, mb: 3 }}>
            {section.title}
          </Typography>
          <Typography component="div">{section.content}</Typography>
        </Box>
      ))}
    </>
  )

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
        overflowY: 'auto',
        marginTop: { xs: '64px', sm: 0 }, // Add top margin on mobile
      }}>
        <Container maxWidth="lg" sx={{
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 4 },
          mt: { xs: 2, sm: 4 }, // Add additional top margin to Container
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleChange}
              aria-label="text alignment"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 4,
                  py: 1,
                  color: '#64748B',
                  '&.Mui-selected': {
                    color: '#1E293B',
                    backgroundColor: '#F1F5F9',
                  },
                },
              }}
            >
              <ToggleButton value="privacy" aria-label="privacy">
                Privacy Policy
              </ToggleButton>
              <ToggleButton value="terms" aria-label="terms">
                Terms of Service
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {view === 'privacy' ? renderPrivacyContent() : renderTermsContent()}

          <Box sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#64748B' }}>
              Flowfluence - Connecting Brands and Creators
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}