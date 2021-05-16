import React, { useMemo } from 'react';
import cn from 'classnames';
import { Waterfall } from '../Waterfall';
import { Context } from '../../context';

import styles from './Personal.module.css';
import { IBlockData } from '../../App';

interface PersonalProps {
  classname?: string;
}

export function Personal(props: PersonalProps) {
  const {} = props;
  const value = React.useContext(Context) as IBlockData;

  const imgList = useMemo(() => {
    return value.files
      .filter((item) => item.user === value.account)
      .map((file, index) => {
        return {
          id: index,
          src: file.url
        };
      });
  }, [value.account, value.files]);

  return (
    <div className={cn(styles.Personal)}>
      <Waterfall imgList={imgList}></Waterfall>
    </div>
  );
}
