import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER_INFO } from '../queries'
import { useState } from 'react'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import {useTranslation} from 'react-i18next';

const Recommendations = () => {
  const {t} = useTranslation();
  const [genre, setGenre] = useState(undefined);

  const result = useQuery(ALL_BOOKS, {
    variables: {genre},
  });
  const userResult = useQuery(USER_INFO);

  useEffect(() => {
    if (userResult.data) {
      if (userResult.data.me) {
        setGenre(userResult.data.me.favoriteGenre);
      }
    }
  }, [userResult.data]);

  if (result.loading) {
    return <div>{t('books-loading')}</div>;
  }
  const books = result.data.allBooks;

  return (
    <div>
      <h2>{t('recommendations-title')}</h2>
      {genre && (
        <p>
          {t('recommendations-showingGenre')} <b>{genre}</b>
        </p>
      )}
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>{t('books-table-header-name')}</th>
            <th>{t('books-table-header-author')}</th>
            <th>{t('books-table-header-published')}</th>
          </tr>
        </thead>
        <tbody>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Recommendations;