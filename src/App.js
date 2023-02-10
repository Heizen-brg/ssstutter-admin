import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes/routes';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop';
import { ModalProvider } from './storages/context/ModalContext';
import { NotificationProvider } from './storages/context/NotificationContext';
import { DialogProvider } from './storages/context/DialogContext';

function App() {
  return (
    <ModalProvider>
      <DialogProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <ScrollToTop />
              <Routes>
                {publicRoutes.map((route, index) => {
                  let Layout;
                  if (route.layout === null) Layout = Fragment;
                  else Layout = route.layout || DefaultLayout;
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
                {privateRoutes.map((route, index) => {
                  let Layout;
                  if (route.layout === null) Layout = Fragment;
                  else Layout = route.layout || DefaultLayout;
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
      </DialogProvider>
    </ModalProvider>
  );
}

export default App;
