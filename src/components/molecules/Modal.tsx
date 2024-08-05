import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  className?: string;
}

export default function Modal({
  children,
  showModal: showModal,
  className,
}: ModalProps) {
  return (
    <div
      id="default-modal"
      className={classNames(
        `fixed inset-0 z-10 mx-auto flex w-full items-center justify-center bg-black bg-opacity-80`,
        { hidden: !showModal },
      )}
    >
      <div
        className={`rounded-lg bg-gradient-to-r from-logoColorGreen to-logoColorBlue p-3 shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
