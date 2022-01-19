import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from 'components/auth';
import { Router } from 'components/router';
import { StyleProvider } from 'components/style';
import { ErrorFallback } from 'components/shared/error';
import './App.css';

export const AppContext = React.createContext();

const App = () => {
  const [configuration, setConfiguration] = useState(null);
  const [apps, setApps] = useState(null);

  useEffect(() => {
    if (!configuration && !apps) {
      fetch(`${process.env.PUBLIC_URL}/configuration.json`)
        .then(r => r.json())
        .then(r => {
          setConfiguration(r);
        });
      fetch(`${process.env.PUBLIC_URL}/build-configuration.json`)
        .then(r => r.json())
        .then(r => {
          setConfiguration(r);
        });
      fetch(`${process.env.PUBLIC_URL}/apps.json`)
        .then(r => r.json())
        .then(r => {
          setApps(r);
        });
    }
  }, [configuration, apps]);

  return (
    <StyleProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setConfiguration(null)}
        resetKeys={[configuration, apps]}
      >
        {configuration && apps && (
          <AppContext.Provider value={{ ...configuration, ...apps }}>
            <AuthProvider authType={configuration.authenticationType}>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Router />
              </BrowserRouter>
            </AuthProvider>
          </AppContext.Provider>
        )}
      </ErrorBoundary>
    </StyleProvider>
  );
};

export default App;
