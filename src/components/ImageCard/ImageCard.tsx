import React from 'react';
import cn from 'classnames';

import styles from './ImageCard.module.css';

interface ImageCardProps {
  classname?: string;
  index: number;
  data: {
    id: string;
    src: string;
  };
  width: string;
}

export function ImageCard(props: any) {
  const {
    data: { id, src },
    width
  } = props as ImageCardProps;

  return (
    <div className={cn(styles.ImageCard)}>
      <img width={width} src={src} />
    </div>
  );
}
