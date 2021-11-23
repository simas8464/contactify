import React, { useRef, useState } from 'react';
import { faEye, faEyeSlash, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Contact, SortableContactProperty } from '../../types/contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import './ContactTable.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import classNames from 'classnames';

export interface ContactsTableProps {
  contacts: Contact[];
}

enum Columns {
  Name = 'Name',
  City = 'City',
  Visible = 'Visible',
  Email = 'Email',
  Phone = 'Phone',
}

export default function ContactTable({
  contacts,
}: ContactsTableProps): JSX.Element {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sortColumn, setSortColumn] = useState<SortableContactProperty | null>(
    null
  );
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [showName, setShowName] = useState<boolean>(true);
  const [showCity, setshowCity] = useState<boolean>(true);
  const [showEmail, setShowEmail] = useState<boolean>(true);
  const [showPhone, setShowPhone] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuIconRef = useRef<HTMLButtonElement>(null);

  function setSortingState(columnName: SortableContactProperty): void {
    if (sortColumn !== columnName) {
      setSortColumn(columnName);
    } else {
      setSortAscending(!sortAscending);
    }
  }

  let firstColumn: Columns;
  if (showName) {
    firstColumn = Columns.Name;
  } else if (showCity) {
    firstColumn = Columns.City;
  } else {
    firstColumn = Columns.Visible;
  }

  let lastColumn: Columns;
  if (showPhone) {
    lastColumn = Columns.Phone;
  } else if (showEmail) {
    lastColumn = Columns.Email;
  } else {
    lastColumn = Columns.Visible;
  }

  return (
    <table cellPadding='0' cellSpacing='0' className='contact-table'>
      <thead>
        <tr className='contact-table-row'>
          <th
            className={classNames(
              'contact-table-cell',
              'contact-table-header',
              { 'first-column': firstColumn === Columns.Name }
            )}
            style={{ display: showName ? undefined : 'none' }}
          >
            <button onClick={() => setSortingState('name')}>
              <p>{Columns.Name}</p>
            </button>
          </th>
          <th
            className={classNames(
              'contact-table-cell',
              'contact-table-header',
              { 'first-column': firstColumn === Columns.City }
            )}
            style={{ display: showCity ? undefined : 'none' }}
          >
            <button onClick={() => setSortingState('city')}>
              <p>{Columns.City}</p>
            </button>
          </th>
          <th
            className={classNames(
              'contact-table-cell',
              'contact-table-header',
              { 'first-column': firstColumn === Columns.Visible },
              { 'last-column': lastColumn === Columns.Visible }
            )}
          />
          <th
            className={classNames(
              'contact-table-cell',
              'contact-table-header',
              { 'last-column': lastColumn === Columns.Email }
            )}
            style={{ display: showEmail ? undefined : 'none' }}
          >
            <button onClick={() => setSortingState('email')}>
              <p>{Columns.Email}</p>
            </button>
          </th>
          <th
            className={classNames(
              'contact-table-cell',
              'contact-table-header',
              { 'last-column': lastColumn === Columns.Phone }
            )}
            style={{ display: showPhone ? undefined : 'none' }}
          >
            <button onClick={() => setSortingState('phone')}>
              <p>{Columns.Phone}</p>
            </button>
          </th>
          <th className='contact-table-cell contact-table-header table cell'>
            <button
              ref={menuIconRef}
              onClick={() => {
                if (!showMenu) {
                  setShowMenu(true);
                } else {
                  setShowMenu(false);
                }
              }}
            >
              <FontAwesomeIcon className='list-icon-white' icon={faList} />
            </button>
            <DropdownMenu
              showCity={showCity}
              showEmail={showEmail}
              showName={showName}
              showPhone={showPhone}
              showMenu={showMenu}
              setshowCity={setshowCity}
              setShowEmail={setShowEmail}
              setShowName={setShowName}
              setShowPhone={setShowPhone}
              setShowMenu={setShowMenu}
              menuIconRef={menuIconRef}
            />
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
              <td
                className={classNames(
                  'contact-table-cell',
                  'contact-table-data',
                  { 'first-column': firstColumn === Columns.Name }
                )}
                style={{ display: showName ? undefined : 'none' }}
              >
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{name}</p>
                </button>
              </td>
              <td
                className={classNames(
                  'contact-table-cell',
                  'contact-table-data',
                  { 'first-column': firstColumn === Columns.City }
                )}
                style={{ display: showCity ? undefined : 'none' }}
              >
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{city}</p>
                </button>
              </td>
              <td
                className={classNames(
                  'contact-table-cell',
                  'contact-table-data',
                  { 'first-column': firstColumn === Columns.Visible },
                  { 'last-column': lastColumn === Columns.Visible }
                )}
              >
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <FontAwesomeIcon
                    className='visible-icon'
                    icon={isActive ? faEye : faEyeSlash}
                  />
                </button>
              </td>
              <td
                className={classNames(
                  'contact-table-cell',
                  'contact-table-data',
                  { 'last-column': lastColumn === Columns.Email }
                )}
                style={{ display: showEmail ? undefined : 'none' }}
              >
                <button onClick={onMouseClick} style={backgroundStyle}>
                  <p>{email}</p>
                </button>
              </td>
              <td
                className={classNames(
                  'contact-table-cell',
                  'contact-table-data',
                  { 'last-column': lastColumn === Columns.Phone }
                )}
                style={{ display: showPhone ? undefined : 'none' }}
              >
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
