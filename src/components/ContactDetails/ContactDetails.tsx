import React from 'react';
import { Contact } from '../../types/contacts';
import userpic from '../../userpic.jpg';
import './ContactDetails.css';

export interface ContactDetailsProps {
  selectedContact: Contact;
}

export default function ContactDetails({
  selectedContact: { name, city, email, phone },
}: ContactDetailsProps): JSX.Element {
  return (
    <div className='contact-details'>
      <img src={userpic} alt='User picture' />
      <table cellPadding='0' cellSpacing='0'>
        <tr>
          <th>Name:</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th>City:</th>
          <td>{city}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>
            <address>
              <a href={`mailto: ${email}`}>{email}</a>
            </address>
          </td>
        </tr>
        <tr>
          <th>Phone:</th>
          <td>{phone}</td>
        </tr>
      </table>
    </div>
  );
}
