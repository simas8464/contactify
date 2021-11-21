import React, { useState } from 'react';
import { faEye, faEyeSlash, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Contact, SortableContactProperty } from '../../types/contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import './ContactTable.css';

export interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactTable({
  contacts,
}: ContactsTableProps): JSX.Element {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sortColumn, setSortColumn] = useState<SortableContactProperty | null>(
    null
  );
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  function setSortingState(columnName: SortableContactProperty): void {
    if (sortColumn !== columnName) {
      setSortColumn(columnName);
    } else {
      setSortAscending(!sortAscending);
    }
  }

  return (
    <table cellPadding='0' cellSpacing='0' className='contact-table'>
      <thead>
        <tr className='contact-table-row'>
          <th className='contact-table-cell contact-table-header'>
            <button onClick={() => setSortingState('name')}>
              <p>Name</p>
            </button>
          </th>
          <th className='contact-table-cell contact-table-header'>
            <button onClick={() => setSortingState('city')}>
              <p>City</p>
            </button>
          </th>
          <th className='contact-table-cell contact-table-header' />
          <th className='contact-table-cell contact-table-header'>
            <button onClick={() => setSortingState('email')}>
              <p>Email</p>
            </button>
          </th>
          <th className='contact-table-cell contact-table-header'>
            <button onClick={() => setSortingState('phone')}>
              <p>Phone</p>
            </button>
          </th>
          <th className='contact-table-cell contact-table-header'>
            <button>
              <FontAwesomeIcon className='list-icon-white' icon={faList} />
            </button>
          </th>
          <th className='contact-table-cell contact-table-header contact-details-column' />
        </tr>
      </thead>
      <tbody>
        {(sortColumn !== null
          ? contacts.sort((a, b) => {
              if (sortAscending) {
                return a[sortColumn].localeCompare(b[sortColumn]);
              }
              return b[sortColumn].localeCompare(a[sortColumn]);
            })
          : contacts
        ).map((contact, index, { length }) => {
          const { id, name, city, isActive, email, phone } = contact;
          const onMouseClick = () => setSelectedContact(contact);
          const backgroundStyle =
            selectedContact?.id === id
              ? { backgroundColor: 'var(--grey)' }
              : undefined;

          return (
            <tr className='contact-table-row' id={id} key={id}>
              <td className='contact-table-cell contact-table-data'>
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{name}</p>
                </button>
              </td>
              <td className='contact-table-cell contact-table-data'>
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{city}</p>
                </button>
              </td>
              <td className='contact-table-cell contact-table-data'>
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <FontAwesomeIcon icon={isActive ? faEye : faEyeSlash} />
                </button>
              </td>
              <td className='contact-table-cell contact-table-data'>
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{email}</p>
                </button>
              </td>
              <td className='contact-table-cell contact-table-data'>
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{phone}</p>
                </button>
              </td>
              <td className='contact-table-cell contact-table-data'>
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <div />
                </button>
              </td>
              {index === 0 ? (
                <td
                  className='contact-table-contact-details-row'
                  rowSpan={length}
                >
                  {selectedContact !== null ? (
                    <ContactDetails selectedContact={selectedContact} />
                  ) : null}
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
