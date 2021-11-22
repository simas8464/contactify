import React, { useEffect, useRef } from 'react';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface DropdownMenuProps {
  showName: boolean;
  setShowName: (newShowName: boolean) => void;
  showCity: boolean;
  setshowCity: (newShowCity: boolean) => void;
  showEmail: boolean;
  setShowEmail: (newShowEmail: boolean) => void;
  showPhone: boolean;
  setShowPhone: (newShowPhone: boolean) => void;
  showMenu: boolean;
  setShowMenu: (newState: boolean) => void;
  menuIconRef: React.RefObject<HTMLButtonElement>;
}

export default function DropdownMenu({
  showMenu,
  setShowMenu,
  menuIconRef,
}: DropdownMenuProps): JSX.Element {
  const wrapperRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      if (
        showMenu &&
        event.target instanceof Element &&
        wrapperRef.current !== null &&
        !wrapperRef.current.contains(event.target) &&
        menuIconRef.current !== null &&
        !menuIconRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [wrapperRef, menuIconRef, showMenu, setShowMenu]);

  const style: React.CSSProperties = {
    visibility: showMenu ? 'visible' : 'hidden',
  };

  if (menuIconRef.current !== null) {
    const { bottom: menuIconBottom } =
      menuIconRef.current.getBoundingClientRect();
    style.top = menuIconBottom;
  }

  return (
    <table
      ref={wrapperRef}
      className='dropdown-menu'
      style={style}
      cellPadding='0'
      cellSpacing='0'
    >
      <tbody>
        <tr>
          <td>
            <button>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
          </td>
          <td>
            <p>Name</p>
          </td>
        </tr>
        <tr>
          <td>
            <button>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
          </td>
          <td>
            <p>City</p>
          </td>
        </tr>
        <tr>
          <td>
            <button>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
          </td>
          <td>
            <p>Email</p>
          </td>
        </tr>
        <tr>
          <td>
            <button>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
          </td>
          <td>
            <p>Phone</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
