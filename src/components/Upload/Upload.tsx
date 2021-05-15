import React from 'react';
import cn from 'classnames';

import styles from './Upload.module.css';

interface UploadProps {
  classname?: string;
}

export function Upload(props: UploadProps) {
  const {} = props;

  return (
    <div className={cn(styles.Upload)}>
      <img
        className={styles.uploadIcon}
        src="https://500px.com/staticV2/media/icon-upload.e5b06f96.svg"
      />
      <p className={styles.description}>Upload photos</p>

      <div className={styles.uploadBtn}>Select photos</div>

      <div className={styles.warning}></div>
    </div>
  );
}
