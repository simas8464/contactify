import React from 'react';
import { Contact } from '../../types/contacts';
import './ContactTableStyle.css';

export interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactTable({
  contacts,
}: ContactsTableProps): JSX.Element {
  return (
    <table className='contact-table'>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th></th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
      {contacts.map(({ id, name, city, isActive, email, phone }) => (
        <tr id={id}>
          <td>{name}</td>
          <td>{city}</td>
          <td>{Boolean(isActive).toString()}</td>
          <td>{email}</td>
          <td>{phone}</td>
        </tr>
      ))}
    </table>
  );
}
