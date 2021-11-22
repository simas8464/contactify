import React, { useEffect, useState } from 'react';
import fetchContacts from './fetchContacts';
import { Contact } from './types/contacts';
import ContactTable from './components/ContactTable/ContactTable';
import './App.css';
import './colors.css';

export default function App(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts()
      .then((newContacts) => setContacts(newContacts))
      .catch((reason) => {
        let message: string | undefined;
        if (reason instanceof Error) {
          message = reason.message;
        } else if (typeof reason === 'string') {
          message = reason;
        }
        console.error(
          `Could not fetch contacts${
            message !== undefined ? `: ${message}` : ''
          }.`
        );
      });
  }, []);

  return (
    <div className='app'>
      <div className='content'>
        <ContactTable contacts={contacts} />
      </div>
    </div>
  );
}
