import React, { useEffect, useState } from 'react';
import fetchContacts from './fetchContacts';
import { Contact } from './types/contacts';
import ContactTable from './components/ContactTable/ContactTable';
import ContactDetails from './components/ContactDetails/ContactDetails';
import './App.css';

export default function App(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts().then((newContacts) => setContacts(newContacts));
  }, []);

  return (
    <div className='app'>
      <div className='content'>
        <ContactTable contacts={contacts} />
      </div>
    </div>
  );
}
