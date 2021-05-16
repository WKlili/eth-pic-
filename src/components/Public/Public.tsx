import React, { useMemo } from 'react';
import cn from 'classnames';
import { Waterfall } from '../Waterfall';

import styles from './Public.module.css';
import { Context } from '../../context';
import { IBlockData, IFile } from '../../App';

interface PublicProps {
  classname?: string;
}

export function Public(props: PublicProps) {
  const value = React.useContext(Context) as IBlockData;
  const {} = props;
  // get data from web3

  const imgList = useMemo(() => {
    return value.files.map((file, index) => {
      return {
        id: index,
        src: file.url
      };
    });
  }, [value.files]);

  return (
    <div className={cn(styles.Public)}>
      <Waterfall imgList={imgList}></Waterfall>
    </div>
  );
}
