import React, { useState } from 'react';
import { Contact } from '../../types/contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import './ContactTable.css';

export interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactTable({
  contacts,
}: ContactsTableProps): JSX.Element {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);

  return (
    <table cellPadding='0' cellSpacing='0' className='contact-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th />
          <th>Email</th>
          <th>Phone</th>
          <th />
          <th className='contact-details-column' />
        </tr>
      </thead>
      <tbody>
        {contacts.map(
          ({ id, name, city, isActive, email, phone }, index, { length }) => {
            const onMouseClick = () => setSelectedContact(index);
            const backgroundStyle =
              selectedContact === index
                ? { backgroundColor: 'var(--grey)' }
                : undefined;

            return (
              <tr id={id}>
                <td onClick={onMouseClick} style={backgroundStyle}>
                  {name}
                </td>
                <td onClick={onMouseClick} style={backgroundStyle}>
                  {city}
                </td>
                <td onClick={onMouseClick} style={backgroundStyle}>
                  {Boolean(isActive).toString()}
                </td>
                <td onClick={onMouseClick} style={backgroundStyle}>
                  {email}
                </td>
                <td onClick={onMouseClick} style={backgroundStyle}>
                  {phone}
                </td>
                <td onClick={onMouseClick} style={backgroundStyle} />
                {index === 0 ? (
                  <td rowSpan={length}>
                    <ContactDetails />
                  </td>
                ) : null}
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
