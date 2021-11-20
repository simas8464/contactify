import React, { useEffect, useState } from 'react';
import fetchContacts from './fetchContacts';
import { Contact } from './types/contacts';
import ContactTable from './components/ContactTable/ContactTable';
import './AppStyle.css';

export default function App(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts().then((newContacts) => setContacts(newContacts));
  }, []);

  return <ContactTable contacts={contacts} />;
}
