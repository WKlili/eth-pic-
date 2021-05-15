import * as React from 'react';
import cn from 'classnames';

import styles from './UserInfo.module.css';
import { Context } from '../../context';
import { IBlockData } from '../../App';

interface UserInfoProps {
  classname?: string;
}

export function UserInfo(props: UserInfoProps) {
  const value = React.useContext(Context) as IBlockData;
  const {} = props;

  return <div className={cn(styles.UserInfo)}>{value.account}</div>;
}
