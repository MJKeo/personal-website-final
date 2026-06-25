import { FaLinkedinIn, FaGithub, FaEtsy } from 'react-icons/fa';
import Navbar from './components/Navbar/Navbar';
import Button from './components/Button/Button';
import SocialLinks from './components/SocialLinks/SocialLinks';
import './App.css';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-keohane', icon: FaLinkedinIn },
  { label: 'GitHub', href: 'https://github.com/MJKeo', icon: FaGithub },
  { label: 'Etsy', href: 'https://www.etsy.com/shop/KeohanePhotography', icon: FaEtsy },
];

function App() {
  return (
    <>
      <Navbar
        links={[{ label: 'Home', href: '/' }]}
        actions={
          <Button href="/resume_summer_2026.pdf" external variant="primary">
            Resume
          </Button>
        }
      />

      <main className="hero">
        <img className="hero__avatar" src="/icon.png" alt="Michael Keohane" />

        <h1 className="hero__title">Michael Keohane</h1>

        <p className="hero__tagline">
          I&apos;m a full-stack software engineer who turns ambiguous problems into
          shipped products, combining zero-to-one product execution, large-scale
          systems, and production LLM engineering.
        </p>

        <span className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          Under active development
        </span>

        <p className="hero__note">Check back soon. In the meantime, find me here:</p>

        <SocialLinks className="hero__social" links={SOCIAL_LINKS} />
      </main>
    </>
  );
}

export default App;
