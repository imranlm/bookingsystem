import { Box, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Typography
      variant="h6"
      component="footer"
      sx={{ pt: 3.75, textAlign: { xs: 'center', md: 'right' } }}
    >
      Made with{' '}
      <Box component="span" sx={{ color: 'error.main', verticalAlign: 'middle' }}>
        &#10084;
      </Box>{' '}
      by{' '}
      <Link
        href="https://github.com/imranlm"
        target="_blank"
        rel="noopener"
        aria-label="Explore"
        sx={{ color: 'neutral.dark', '&:hover': { color: 'secondary.main' } }}
      >
        imranlm
      </Link>
    </Typography>
  );
};

export default Footer;
