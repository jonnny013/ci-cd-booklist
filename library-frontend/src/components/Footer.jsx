import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {useTranslation} from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation()
  return (
    <>
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand
            target='_blank'
            href='https://jonnny013.github.io'
            style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}
          >
            <img
              alt='logo'
              src='../../mainLogo.png'
              width='50'
              height='40'
              className='d-inline-block align-top'
            />
            {t('footer-portfolio')}
          </Navbar.Brand>
          <Navbar.Brand
            target='_blank'
            href='https://github.com/jonnny013/fullstack_part8'
            style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}
          >
            <img
              alt='logo'
              src='../../GitHub-logo.png'
              width='50'
              height='40'
              className='d-inline-block align-top'
            />
            {t('footer-source-code')}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
