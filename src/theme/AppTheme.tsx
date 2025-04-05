import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions['components'];
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    surface?: string;
    highlight?: string;
  }

  interface SimplePaletteColorOptions {
    surface?: string;
    highlight?: string;
  }
}

export default function AppTheme(props: AppThemeProps) {
  const { children } = props;
  return (
    <ThemeProvider
      theme={createTheme({
        cssVariables: {
          colorSchemeSelector: 'data-mui-color-scheme',
        },
        typography: {
          fontFamily: 'Fredoka',
        },
        palette: {
          mode: 'dark',
          primary: {
            main: '#fff',
            surface: 'rgba(255,191,191,1)',
            highlight: 'rgba(139,0,60,0.7)',
          },
          secondary: {
            main: 'rgba(139,0,60,1)',
            surface: 'rgba(255,131,141,1)',
            highlight: 'rgba(219,34,74,1)',
          },
          background: {
            default: 'black',
            paper: 'rgba(17,2,17,1)',
          },
          divider: 'rgba(255,191,191,0.2)',
        },
        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                borderRadius: 4,
                '&.Mui-disabled': {
                  backgroundColor: '#8b003c',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      })}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
