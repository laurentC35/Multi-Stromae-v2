import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const StyleContext = React.createContext();

const StyleProvider = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#0f417a',
          },
          secondary: {
            main: '#ffc400',
          },
          background: {},
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyleProvider;
