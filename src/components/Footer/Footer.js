import SocialLinks from '../SocialLinks/SocialLinks';
import './Footer.css';

/**
 * Site footer — a deep-fern brand band split into two sections:
 *   1. "Get in touch"  → a visible, selectable email that is also a mailto link
 *      (the recommended pattern: works for native-mail and webmail users alike).
 *   2. "Find me online" → the social / store icon links.
 *
 * @param {object} props
 * @param {string} props.email
 * @param {Array<{label: string, href: string, icon: React.ComponentType}>} props.socialLinks
 */
function Footer({ email, socialLinks = [] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__section">
          <h2 className="site-footer__heading">Get in touch</h2>
          <a className="site-footer__email" href={`mailto:${email}`}>
            {email}
          </a>
        </section>

        <section className="site-footer__section">
          <h2 className="site-footer__heading">Find me online</h2>
          <SocialLinks className="site-footer__social" links={socialLinks} />
        </section>
      </div>

      <p className="site-footer__copyright">© {year} Michael Keohane</p>
    </footer>
  );
}

export default Footer;
