import {useTranslation} from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Authors from './Authors';
import Books from './Books';
import NewBook from './NewBook';
import Recommendations from './Recommendations';
import { useState } from 'react';

const NavBar = ({ token, setNotification}) => {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('authors');
  return (
    <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
      <Tab eventKey='authors' title={t('nav-Authors')}>
        <Authors
          token={token}
          setNotification={setNotification}
        />
      </Tab>
      <Tab eventKey='books' title={t('nav-Books')}>
        <Books  />
      </Tab>
      {token && (
        <Tab
          eventKey='addbooks'
          title={t('nav-Add-Books')}
        >
          <NewBook
            setNotification={setNotification}
            setActiveTab={setActiveTab}
          />
        </Tab>
      )}
      {token && (
        <Tab
          eventKey='recom'
          title={t('nav-Recom')}
        >
          <Recommendations  />
        </Tab>
      )}
    </Tabs>
  );
};

export default NavBar;
