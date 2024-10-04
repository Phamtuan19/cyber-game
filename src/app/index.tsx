import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient, focusManager } from '@tanstack/react-query';

import Routers from '~/app/routes';
import theme from '~/Theme';
import { InitApp } from '@helpers';

const queryClient = new QueryClient();
focusManager.setFocused(false);

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <ThemeProvider theme={theme}>
            <BrowserRouter>
               <InitApp>
                  <Routers />
               </InitApp>
            </BrowserRouter>
         </ThemeProvider>
      </QueryClientProvider>
   );
};

export default App;
