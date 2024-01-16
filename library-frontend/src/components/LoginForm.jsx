import {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {LOGIN} from '../queries';
import NewUser from './NewUser';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import {useTranslation} from 'react-i18next';

const LoginForm = ({setToken, setNotification, setShowLogin}) => {
  const {t} = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(false);

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setNotification(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setNotification(`${t('notification-welcomeMessage')} ${username}`);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      setPassword('');
      setUsername('');
      setShowLogin(false);
    }
  }, [result.data]);

  const newUserLogin = (newUsername, newPassword) => {
    login({variables: {username: newUsername, password: newPassword}});
  };

  const submit = async event => {
    event.preventDefault();

    login({variables: {username, password}});
  };

  if (newUser) {
    return (
      <NewUser
        setNewUser={setNewUser}
        newUser={newUser}
        setNotification={setNotification}
        login={newUserLogin}
        setShowLogin={setShowLogin}
      />
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '5px'}}>
        <CloseButton onClick={() => setShowLogin(false)} />
        <Form onSubmit={submit}>
          <div>
            <Form.Label>{t('login-enterUsername')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('login-enterUsername')}
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            <Form.Label>{t('login-enterPassword')}</Form.Label>
            <Form.Control
              type='password'
              placeholder={t('login-enterPassword')}
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <div style={{margin: 10, display: 'flex', gap: 10}}>
            <Button variant='secondary' type='submit'>
              {t('login-loginButton')}
            </Button>
            <Button
              variant='secondary'
              type='button'
              onClick={() => setNewUser(!newUser)}
            >
              {t('login-newUserButton')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
