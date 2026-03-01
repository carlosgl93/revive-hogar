import { FC } from 'react';

import type { SvgIconProps } from '@mui/material/SvgIcon';

type AdminNavItem = {
  path: string;
  title: string;
  icon: FC<SvgIconProps>;
};

export type { AdminNavItem };
