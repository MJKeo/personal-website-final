import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_EMAIL, RESUME } from './content/site';
import Home from './screens/Home/Home';
import Projects from './screens/Projects/Projects';
import Experience from './screens/Experience/Experience';
import Games from './screens/Games/Games';
import WorkDetail from './screens/WorkDetail/WorkDetail';
import NotFound from './screens/NotFound/NotFound';
import './App.css';

/** Reset scroll on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {
      /* jsdom / SSR: scrollTo may be unavailable */
    }
  }, [pathname]);
  return null;
}

/** Shared chrome: navbar + routed screen (<Outlet>) + footer. */
function Layout() {
  return (
    <>
      <Navbar
        links={NAV_LINKS}
        actions={
          <Button href={RESUME.href} external variant="primary">
            {RESUME.label}
          </Button>
        }
      />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer email={CONTACT_EMAIL} socialLinks={SOCIAL_LINKS} />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<WorkDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/experience/:slug" element={<WorkDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
