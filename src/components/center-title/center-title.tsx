import { FC, memo } from 'react';
import { useState } from 'react';

import { TCenter } from './types';
import { CenterUI } from '../ui/center-title';

export const Center: FC<TCenter> = memo(({ title, children }) => {
  const [titleStyle, setTitleStyle] = useState('text_type_main-large');

  return (
    <>
      <CenterUI title={title} titleStyle={titleStyle} children={children} />
    </>
  );
});
