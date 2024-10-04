import { Box, Container } from '@mui/material';

import HeaderAdmin from './components/HeaderAdmin';

import './header.css';

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
   return (
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
         <HeaderAdmin />
         <Container maxWidth="lg" sx={{ padding: '12px 0px' }}>
            {children}
         </Container>
      </Box>
   );
};

export default LayoutAdmin;
