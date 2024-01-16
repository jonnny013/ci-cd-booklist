import { useState } from 'react'
import {useApolloClient, useSubscription} from '@apollo/client'
import Notification from './components/Notification'
import { ALL_BOOKS, BOOK_ADDED} from './queries'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useTranslation} from 'react-i18next';
import NavBar from './components/NavBar'
import Header from './components/Header'
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import './App.css';

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = a => {
    let seen = new Set()
    return a.filter(item => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}



const App = () => {
  const [token, setToken] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const client = useApolloClient()
  const [notification, setNotification] = useState(null)
  const {t} = useTranslation()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      setNotification(`${addedBook.title} ${t('notification-new-book-added')}`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })



  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setNotification(t("logoutNotification"))
  }

  return (
    <div style={{margin: 10}} className='app-container'>
      <div className='content'>
        <Notification info={notification} setNotification={setNotification} />
        <Header
          token={token}
          logout={logout}
          setShowLogin={setShowLogin}
          showLogin={showLogin}
        />
        {showLogin && (
          <LoginForm
            setToken={setToken}
            setNotification={setNotification}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
          />
        )}
        <NavBar
          logout={logout}
          token={token}
          setNotification={setNotification}
          setToken={setToken}
        />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App
