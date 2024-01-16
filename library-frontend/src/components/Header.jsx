import Button from 'react-bootstrap/Button';
import {useTranslation} from 'react-i18next';

const Header = ({ logout, token, setShowLogin, showLogin}) => {
  const {i18n, t} = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zw' : 'en';
    i18n.changeLanguage(newLang);
  };
  return (
    <div style={{display: 'flex', gap: 10, margin: 10}}>
      <Button variant='light' onClick={changeLanguage}>{t('languageButton')}</Button>

      {token ? (
        <Button variant='secondary' onClick={logout}>
          {t('nav-Logout')}
        </Button>
      ) : (
        <Button variant='secondary' onClick={() => setShowLogin(!showLogin)}>
          {t('nav-Login')}
        </Button>
      )}
    </div>
  );
};

export default Header;
