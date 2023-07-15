import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footer-area'>
      Developed by <a href='https://github.com/gwebsurfer' target='_blank' rel='noopener noreferrer' className='footer-link'> Gab </a> © {currentYear}
    </div>
  );
}