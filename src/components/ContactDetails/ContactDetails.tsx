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
      <img className='photo' src={userpic} alt='User picture' />
      <table className='children' cellPadding='0' cellSpacing='0'>
        <tr>
          <th>Name:</th>
          <tr>{name}</tr>
        </tr>
        <tr>
          <th>City:</th>
          <tr>{city}</tr>
        </tr>
        <tr>
          <th>Email:</th>
          <tr>{email}</tr>
        </tr>
        <tr>
          <th>Phone:</th>
          <tr>{phone}</tr>
        </tr>
      </table>
    </div>
  );
}
