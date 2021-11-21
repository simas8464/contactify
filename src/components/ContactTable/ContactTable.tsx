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
        <tr className='contact-table-row'>
          <th className='contact-table-cell contact-table-header'>Name</th>
          <th className='contact-table-cell contact-table-header'>City</th>
          <th className='contact-table-cell contact-table-header' />
          <th className='contact-table-cell contact-table-header'>Email</th>
          <th className='contact-table-cell contact-table-header'>Phone</th>
          <th className='contact-table-cell contact-table-header' />
          <th className='contact-table-cell contact-table-header contact-details-column' />
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
              <tr className='contact-table-row' id={id}>
                <td
                  className='contact-table-cell contact-table-data'
                  onClick={onMouseClick}
                  style={backgroundStyle}
                >
                  {name}
                </td>
                <td
                  className='contact-table-cell contact-table-data'
                  onClick={onMouseClick}
                  style={backgroundStyle}
                >
                  {city}
                </td>
                <td
                  className='contact-table-cell contact-table-data'
                  onClick={onMouseClick}
                  style={backgroundStyle}
                >
                  {Boolean(isActive).toString()}
                </td>
                <td
                  className='contact-table-cell contact-table-data'
                  onClick={onMouseClick}
                  style={backgroundStyle}
                >
                  {email}
                </td>
                <td
                  className='contact-table-cell contact-table-data'
                  onClick={onMouseClick}
                  style={backgroundStyle}
                >
                  {phone}
                </td>
                <td
                  className='contact-table-cell contact-table-data'
                  onClick={onMouseClick}
                  style={backgroundStyle}
                />
                {index === 0 ? (
                  <td className='contact-table-contact-details-row' rowSpan={length}>
                    {selectedContact !== null ? (
                      <ContactDetails
                        selectedContact={contacts[selectedContact]}
                      />
                    ) : null}
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
