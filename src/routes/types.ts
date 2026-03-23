import { FC } from 'react';

import type { SvgIconProps } from '@mui/material/SvgIcon';

import { UserRole } from '@/types/models';

type AdminNavItem = {
  path: string;
  title: string;
  icon: FC<SvgIconProps>;
  roles?: UserRole[];
};

export type { AdminNavItem };
