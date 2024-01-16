import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from '../queries'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';


const AuthorBirthYear = ({ authors, setNotification }) => {
  const {t} = useTranslation()
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeYear, result] = useMutation(EDIT_BIRTH_YEAR, {
    onError: error => {
      setNotification(error.graphQLErrors.map(e => e.message).join('\n'))
    },
    onCompleted: () => {
      setNotification(t('notification-birthYear'));
    },
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setNotification(t('notification-author-not-found'));
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault() 
    
    changeYear({ variables: {name, born }})

    setBorn('')
    setName('')
  }
  return (
    <>
      <h2>{t('author-birthyear-title')}</h2>
      <Form onSubmit={submit}>
        <div>
          <Form.Select
            defaultValue={t('author-option-1')}
            onChange={({target}) => setName(target.value)}
          >
            <option disabled>{t('author-option-1')}</option>
            {authors.map(a => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Form.Label>{t('author-birthyear-form-title')}</Form.Label>
          <Form.Control
            placeholder={t('author-form-placeholder-1')}
            value={born}
            onChange={({target}) => setBorn(Number(target.value))}
          />
        </div>
        <br />
        <Button type='submit' variant='secondary'>
          {t('author-update-button')}
        </Button>
      </Form>
    </>
  );
}
export default AuthorBirthYear