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
          <td>
            <p>{name}</p>
          </td>
        </tr>
        <tr>
          <th>City:</th>
          <td>
            <p>{city}</p>
          </td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>
            <p>
              <address>
                <a href={`mailto: ${email}`}>{email}</a>
              </address>
            </p>
          </td>
        </tr>
        <tr>
          <th>Phone:</th>
          <td>
            <p>{phone}</p>
          </td>
        </tr>
      </table>
    </div>
  );
}
