import * as React from 'react';
import cn from 'classnames';

import styles from './UserInfo.module.css';

interface UserInfoProps {
  classname?: string;
}

export function UserInfo(props: UserInfoProps) {
  const {} = props;

  return <div className={cn(styles.UserInfo)}>UserInfo</div>;
}
