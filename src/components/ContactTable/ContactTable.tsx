import React from 'react';
import { Contact } from '../../types/contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import './ContactTable.css';

export interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactTable({
  contacts,
}: ContactsTableProps): JSX.Element {
  return (
    <table cellPadding='0' cellSpacing='0' className='contact-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th></th>
          <th>Email</th>
          <th>Phone</th>
          <th className='contact-details-column'></th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(
          ({ id, name, city, isActive, email, phone }, index, { length }) => (
            <tr id={id}>
              <td>{name}</td>
              <td>{city}</td>
              <td>{Boolean(isActive).toString()}</td>
              <td>{email}</td>
              <td>{phone}</td>
              {index === 0 ? (
                <td rowSpan={length}>
                  <ContactDetails />
                </td>
              ) : null}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
