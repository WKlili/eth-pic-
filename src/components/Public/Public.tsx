import React, { useMemo } from 'react';
import cn from 'classnames';
import { Waterfall } from '../Waterfall';

import styles from './Public.module.css';
import { Context } from '../../context';
import { IBlockData, IFile } from '../../App';

interface PublicProps {
  classname?: string;
}

const imgList = [
  {
    id: 1,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwOGKPt8l0EEH1xlJbZ9mYZdEymRXY9WpfBA&usqp=CAU'
  },
  {
    id: 2,
    src: 'https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg'
  },
  {
    id: 3,
    src: 'https://peaceofmind.com/wp-content/uploads/2020/03/Screen-Shot-2020-03-12-at-12.17.49-PM.png'
  }
];

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
