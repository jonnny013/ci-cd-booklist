import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from "../queries"
import AuthorBirthYear from './AuthorBirthYear'
import Table from 'react-bootstrap/Table';
import {useTranslation} from 'react-i18next';

const Authors = props => {
  const {t} = useTranslation()
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>{t('authors-loading')}</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>{t('authors-title')}</h2>
      <Table striped bordered hover variant='light'>
        <thead>
          <tr>
            <th>{t('authors-table-header-name')}</th>
            <th>{t('authors-table-header-born')}</th>
            <th>{t('authors-table-header-books')}</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {props.token && (
        <AuthorBirthYear authors={authors} setNotification={props.setNotification} />
      )}
    </div>
  );
};


export default Authors
