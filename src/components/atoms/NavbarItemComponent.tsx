import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

interface NavbarItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
  mobile?: boolean;
  disabled?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  href,
  label,
  active,
  onClick,
  disabled
}) => {
  return (
    <Link
      href={disabled ? '' : href}
      className="flex flex-col justify-center"
      onClick={onClick}
    >
      <span
        className={classNames(`text-xs lg:text-base ${active ? 'underline decoration-logoColorGreen decoration-2 underline-offset-8' : ''}, `, {
          'cursor-default, text-slate-200': disabled
        }, {
          'cursor-pointer text-logoColorBlue hover:text-logoColorGreen ': !disabled
        })}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavbarItem;
