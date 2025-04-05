import { createContext, useMemo, useState } from 'react';
import { Container, CssBaseline, GlobalStyles, useMediaQuery, useTheme } from '@mui/material';
import { createRouter } from './routes';
import { RouterProvider } from 'react-router-dom';
import AppTheme from '@/theme/AppTheme';
import { ToastContainer } from 'react-toastify';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      body: {
        '--s': '80px',
        '--c1': '#110211',
        '--c2': 'rgba(139,0,60,0.8)',
        '--_g':
          'var(--c2) 6%  14%,var(--c1) 16% 24%,var(--c2) 26% 34%,var(--c1) 36% 44%,' +
          'var(--c2) 46% 54%,var(--c1) 56% 64%,var(--c2) 66% 74%,var(--c1) 76% 84%,var(--c2) 86% 94%',
        background: `
          radial-gradient(100% 100% at 100% 0,var(--c1) 4%,var(--_g),#0008 96%,#0000),
          radial-gradient(100% 100% at 0 100%,#0000, #0008 4%,var(--_g),var(--c1) 96%)
          var(--c1)
        `,
        backgroundSize: 'var(--s) var(--s)',
        height: '100%',
        margin: 0,
        backgroundAttachment: 'fixed',
      },
    }}
  />
);

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

export const mdContext = createContext(true);

export default function App(props: any) {
  const theme = useTheme();

  const [isMd] = useState<boolean>(useMediaQuery(theme.breakpoints.up('md')));
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {inputGlobalStyles}
      <AppTheme {...props}>
        <CssBaseline enableColorScheme>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            closeOnClick
            theme="dark"
            newestOnTop
          />
          <Container
            maxWidth="lg"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <mdContext.Provider value={isMd}>
              <AppRouter />
            </mdContext.Provider>
          </Container>
        </CssBaseline>
      </AppTheme>
    </>
  );
}
