import React from 'react';

import { pathByName } from './icon.utils';

const DEFAULT_ICON_SIZE = 512;

export type IconName = keyof typeof pathByName;

interface Props {
  name: IconName;
  color?: string;
  size?: number;
  style?: object;
  onClick?: (...args: any[]) => any;
}

// Took an example from:
// https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx#L40
const Icon: React.FC<Props> = ({
  name,
  color = 'inherit',
  size = DEFAULT_ICON_SIZE,
  style,
  ...rest
}) => {
  const path = pathByName[name];

  if (!path) return null;

  return (
    <svg
      viewBox={`0 0 ${DEFAULT_ICON_SIZE} ${DEFAULT_ICON_SIZE}`}
      width={size}
      height={size}
      style={{ color, ...style }}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {path}
    </svg>
  );
};

export default Icon;
