import React from 'react';
import cn from 'classnames';
import { Masonry } from 'masonic';

import styles from './Waterfall.module.css';
import { ImageCard } from '../ImageCard';

interface WaterfallProps {
  classname?: string;
  imgList: Array<{
    id: number;
    src: string;
  }>;
}

export function Waterfall(props: WaterfallProps) {
  const { imgList } = props;

  return (
    <div className={cn(styles.Waterfall)}>
      <Masonry
        items={imgList}
        render={(props) => <ImageCard {...props} />}></Masonry>
    </div>
  );
}
