export interface Contact {
  id: string;
  name: string;
  surname: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export type SortableContactProperty = keyof Omit<Contact, 'isActive'>;
