import { Contact } from './types/contacts';

export default function getContacts(): Promise<Contact[]> {
  return fetch('https://contactify-api.herokuapp.com/api/contacts').then(
    (response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(
        `Invalid response code from contacts API ${response.status}`
      );
    }
  );
}
