import React, { useEffect, useRef, useState } from 'react';
import {
  faSquare,
  faCheck,
  faEye,
  faEyeSlash,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare as faRegularSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Contact, SortableContactProperty } from '../../types/contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import './ContactTable.css';

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

const columnNumber = Object.keys(Columns).length + 2;

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
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [showActive, setShowActive] = useState<boolean>(true);
  const [filteredContacts, setFilteredContacts] = useState<Contact[] | null>(
    null
  );
  const menuIconRef = useRef<HTMLButtonElement>(null);

  function setSortingState(columnName: SortableContactProperty): void {
    if (sortColumn !== columnName) {
      setSortColumn(columnName);
    } else {
      setSortAscending(!sortAscending);
    }
  }

  function prepareContacts(): Contact[] {
    let preparedContacts = contacts;
    if (!showActive || nameFilter !== null || cityFilter !== null) {
      const nameRegex =
        nameFilter !== null ? new RegExp(nameFilter, 'i') : null;
      const cityRegex =
        cityFilter !== null ? new RegExp(cityFilter, 'i') : null;
      preparedContacts = preparedContacts.filter(({ isActive, name, city }) => {
        if (!showActive && isActive) {
          return false;
        }
        if (nameRegex !== null && !nameRegex.test(name)) {
          return false;
        }
        if (cityRegex !== null && !cityRegex.test(city)) {
          return false;
        }
        return true;
      });
    }
    if (sortColumn !== null) {
      preparedContacts = preparedContacts.sort((a, b) => {
        if (sortAscending) {
          return a[sortColumn].localeCompare(b[sortColumn]);
        }
        return b[sortColumn].localeCompare(a[sortColumn]);
      });
    }
    return preparedContacts;
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
        <tr>
          <th colSpan={columnNumber}>
            <div>
              <div>
                <input
                  type='text'
                  placeholder={Columns.Name}
                  onChange={({ target: { value } }) => {
                    if (value) {
                      setNameFilter(value);
                    } else if (nameFilter !== null) {
                      setNameFilter(null);
                    }
                  }}
                ></input>
                <input
                  type='text'
                  placeholder={Columns.City}
                  list='cities'
                  onChange={({ target: { value } }) => {
                    if (value) {
                      setCityFilter(value);
                    } else if (cityFilter !== null) {
                      setCityFilter(null);
                    }
                  }}
                ></input>
                <datalist id='cities'>
                  {contacts.map(({ city }, index) => (
                    <option value={city} key={index} />
                  ))}
                </datalist>
                <button
                  className='active-checkbox-button'
                  onClick={() => setShowActive(!showActive)}
                >
                  {showActive ? (
                    <span className='fa-layers fa-fw active-span'>
                      <FontAwesomeIcon icon={faSquare} />
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  ) : (
                    <span className='fa-layers fa-fw not-active-span'>
                      <FontAwesomeIcon icon={faSquare} />
                      <FontAwesomeIcon icon={faRegularSquare} />
                    </span>
                  )}
                </button>
                <p>Show active</p>
                <FontAwesomeIcon icon={faEye} />
                <button className='filter-button' onClick={() => setFilteredContacts(prepareContacts())}>
                  <p>FILTER</p>
                </button>
              </div>
              <div>
                <p>CONTACTIFY</p>
              </div>
            </div>
          </th>
        </tr>
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
          <th className='contact-table-cell contact-table-header'>
            <button
              className='menu-button'
              ref={menuIconRef}
              onClick={() => {
                if (!showMenu) {
                  setShowMenu(true);
                } else {
                  setShowMenu(false);
                }
              }}
              style={{ backgroundColor: showMenu ? 'var(--white)' : undefined }}
            >
              <FontAwesomeIcon
                className={classNames({
                  'list-icon-teal': showMenu,
                  'list-icon-white': !showMenu,
                })}
                icon={faList}
              />
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
          <th
            className={classNames(
              'contact-table-cell',
              'contact-table-header',
              'contact-details-column'
            )}
          />
        </tr>
      </thead>
      <tbody>
        {(filteredContacts !== null ? filteredContacts : contacts).map(
          (contact, index, { length }) => {
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
                    {
                      'first-column': firstColumn === Columns.Visible,
                      'last-column': lastColumn === Columns.Visible,
                    }
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
          }
        )}
      </tbody>
    </table>
  );
}
