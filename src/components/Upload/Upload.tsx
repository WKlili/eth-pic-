import React, { useState } from 'react';
import fleekStorage from '@fleekhq/fleek-storage-js';
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

      <div className={styles.uploadBtn}>
        Select Photos
        <input
          onChange={uploadFile}
          className={styles.uploadFile}
          type="file"
        />
      </div>

      <div className={styles.warning}></div>
    </div>
  );

  async function uploadFile(e: any) {
    const uploadedFile = await fleekStorage.upload({
      apiKey: 'O8kkDM1CU2Ry8mLw0neBHA==',
      apiSecret: '4z1E20GyGN6X0pdywh6jGW4ZVLa+F8J0gVwgOH+2H6s=',
      key: 'ceshi',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data: e.target.files[0] as string
    });
  }
}
