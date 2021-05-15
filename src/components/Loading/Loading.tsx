import React from 'react';
import cn from 'classnames';

import styles from './Loading.module.css';

interface LoadingProps {
  classname?: string;
}

export function Loading(props: LoadingProps) {
  const {} = props;

  return (
    <div className={cn(styles['lds-ring'])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
