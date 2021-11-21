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
      <img src={userpic} alt='User' />
      <table cellPadding='0' cellSpacing='0'>
        <tbody>
          <tr>
            <th>Name:</th>
            <td className='contact-details-data'>
              <p>{name}</p>
            </td>
          </tr>
          <tr>
            <th>City:</th>
            <td className='contact-details-data'>
              <p>{city}</p>
            </td>
          </tr>
          <tr>
            <th>Email:</th>
            <td className='contact-details-data'>
              <address>
                <a href={`mailto: ${email}`}>{email}</a>
              </address>
            </td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td className='contact-details-data'>
              <p>{phone}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
