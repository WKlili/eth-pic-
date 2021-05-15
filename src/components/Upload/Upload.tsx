/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { v4 } from 'uuid';
import SparkMD5 from 'spark-md5';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { Context } from '../../context';

import styles from './Upload.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { IBlockData } from '../../App';
import { Loading } from '../Loading';
interface UploadProps {
  classname?: string;
}

export function Upload(props: UploadProps) {
  const value = React.useContext(Context) as IBlockData;
  const {} = props;
  const [load, setLoading] = useState(false);

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

      {load && <Loading />}
    </div>
  );

  async function uploadFile(e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const file = e.target.files[0] as File;
    setLoading(true);

    const spark = new SparkMD5();
    spark.append(file);
    const hexHash = spark.end();

    try {
      const uploadedFile = await fleekStorage.upload({
        apiKey: 'O8kkDM1CU2Ry8mLw0neBHA==',
        apiSecret: '4z1E20GyGN6X0pdywh6jGW4ZVLa+F8J0gVwgOH+2H6s=',
        key: v4(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data: file
      });
      console.log({ md5: hexHash, url: uploadedFile.publicUrl }); // ccc-log
      // mint
      value.contract.methods
        .mint(hexHash, uploadedFile.publicUrl)
        .send({ from: value.account })
        .on('transactionHash', function (hash: any) {
          // ...
          console.log({ hash }); // ccc-log
          setLoading(false);
          value.setMintStatus('success');
        })
        .on('receipt', function (receipt: any) {
          // ...
          console.log({ receipt }); // ccc-log
          setLoading(false);
          value.setMintStatus('success');
        })
        .on('confirmation', function (confirmationNumber: any, receipt: any) {
          // ...
          console.log({ confirmationNumber, receipt }); // ccc-log

          value.setMintStatus('success');
          setLoading(false);
        })
        .on('error', function (error: any, receipt: any) {
          // ...
          console.log({ error, receipt }); // ccc-log
          value.setMintStatus(error.message);
        });
    } catch (e) {
      toast.error(e);
      setLoading(false);
    }
  }
}
