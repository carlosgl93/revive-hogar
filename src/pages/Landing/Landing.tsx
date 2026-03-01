import Box from '@mui/material/Box';

import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import Navbar from './sections/Navbar';
import Plans from './sections/Plans';
import Services from './sections/Services';

function Landing() {
  return (
    <Box sx={{ bgcolor: '#fff', color: '#333' }}>
      <Navbar />
      <Hero />
      <Services />
      <Plans />
      <About />
      <Contact />
      <Footer />
    </Box>
  );
}

export default Landing;
