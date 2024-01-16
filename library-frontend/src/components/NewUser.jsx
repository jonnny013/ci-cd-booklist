import { useState, useEffect } from "react"
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import {useTranslation} from 'react-i18next';

const NewUser = ({setNewUser, newUser, setNotification, login, setShowLogin}) => {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [genre, setGenre] = useState('');

  const [createUser, result] = useMutation(CREATE_USER, {
    onError: error => {
      setNotification(error.graphQLErrors[0].message);
    },
    onCompleted: () => {
      setNotification(t('notification-userCreated', {username: username}));
      login(username, password);
    },
  });

  useEffect(() => {
    if (result.data) {
      setPassword('');
      setUsername('');
      setGenre('');
    }
  }, [result.data]);

  const onFormSubmit = async event => {
    event.preventDefault();
    createUser({variables: {password, username, favoriteGenre: genre}});
  };

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
        <Form onSubmit={onFormSubmit}>
          <div>
            <Form.Label>{t('newUser-username-label')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('newUser-username-placeholder')}
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            <Form.Label>{t('newUser-password-label')}</Form.Label>
            <Form.Control
              type='password'
              placeholder={t('newUser-password-placeholder')}
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <div>
            <Form.Label>{t('newUser-favoriteGenre-label')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('newUser-favoriteGenre-placeholder')}
              value={genre}
              onChange={({target}) => setGenre(target.value)}
            />
          </div>
          <div style={{margin: 10, display: 'flex', gap: 10}}>
            <Button variant='secondary' type='submit'>
              {t('newUser-createUser-button')}
            </Button>
            <Button
              variant='secondary'
              type='button'
              onClick={() => setNewUser(!newUser)}
            >
              {t('newUser-login-button')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;