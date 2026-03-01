import { useCallback } from 'react';

import { useAtom } from 'jotai';

import { isAdminSidebarOpenState } from './atoms';

function useSidebar() {
  const [isOpen, setIsOpen] = useAtom(isAdminSidebarOpenState);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const open = useCallback(() => setIsOpen(true), [setIsOpen]);

  return { isOpen, toggle, close, open };
}

export { useSidebar };
