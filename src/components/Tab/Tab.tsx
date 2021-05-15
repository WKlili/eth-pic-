import React, { useState } from 'react';
import cn from 'classnames';

import styles from './Tab.module.css';

interface TabProps {
  classname?: string;
  tabList: Array<{
    name: string;
    content: JSX.Element;
  }>;
  defaultFocusKey?: number;
}

export function Tab(props: TabProps) {
  const { tabList, defaultFocusKey = 0 } = props;

  const [focusIndex, setFocusIndex] = useState(defaultFocusKey);

  return (
    <div className={cn(styles.Tab)}>
      <div className={cn(styles.tabs)}>
        {tabList.map((item, i) => (
          <div
            className={cn(styles.tabItem, focusIndex === i && styles.active)}
            onClick={() => handleTabClick(i)}
            key={item.name}>
            {item.name}
          </div>
        ))}
      </div>

      {renderContent(focusIndex)}
    </div>
  );

  function handleTabClick(index: number) {
    setFocusIndex(index);
  }

  function renderContent(index: number) {
    return <div className={styles.tabContent}>{tabList[index].content}</div>;
    return tabList.map((item, i) => (
      <div
        className={cn(styles.tabContent, i !== index && styles.hidden)}
        key={item.name}>
        {item.content}
      </div>
    ));
  }
}
