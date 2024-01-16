import { useState } from 'react'
import {useMutation} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { updateCache } from '../App'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useTranslation} from 'react-i18next';

const NewBook = props => {
  const {t} = useTranslation();
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, 'getAllBooks'],
    onError: error => {
      props.setNotification(error.graphQLErrors.map(e => e.message).join('\n'))
      console.log(error)
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
  }) 

  const submit = async event => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres }})
    props.setActiveTab('books');
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Form onSubmit={submit}>
        <div>
          <Form.Label>{t('book-title-label')}</Form.Label>
          <Form.Control
            type='text'
            placeholder={t('book-title-placeholder')}
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          <Form.Label>{t('book-author-label')}</Form.Label>
          <Form.Control
            type='text'
            placeholder={t('book-author-placeholder')}
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Form.Label>{t('book-published-label')}</Form.Label>
          <Form.Control
            type='number'
            placeholder={t('book-published-placeholder')}
            value={published}
            onChange={({target}) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <Form.Label>{t('book-genre-label')}</Form.Label>
          <Form.Control
            type='text'
            placeholder={t('book-genre-placeholder')}
            value={genre}
            onChange={({target}) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type='button'>
            {t('book-addGenre-button')}
          </Button>
        </div>
        <div>
          {t('book-genres-label')}: {genres.join(' ')}
        </div>
        <br />
        <Button type='submit'>{t('book-createButton')}</Button>
      </Form>
    </div>
  );
}

export default NewBook
