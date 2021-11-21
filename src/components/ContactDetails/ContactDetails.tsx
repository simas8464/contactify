import React from 'react';
import { Contact } from '../../types/contacts';
import userpic from '../../userpic.jpg';
import './ContactDetails.css';

export interface ContactDetailsProps {
  selectedContact: Contact | null;
}

export default function ContactDetails({
  selectedContact,
}: ContactDetailsProps): JSX.Element {
  return (
    <div className='contact-details'>
      <img className='children' src={userpic} alt='User picture' />
    </div>
  );
}
