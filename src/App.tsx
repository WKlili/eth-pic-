import React, { useState } from 'react';

import { Personal } from './components/Personal';
import { Public } from './components/Public';
import { Tab } from './components/Tab';
import { Upload } from './components/Upload';
import { UserInfo } from './components/UserInfo';

function App() {
  const [tabList] = useState([
    {
      name: 'Public',
      content: <Public />
    },
    {
      name: 'Personal',
      content: <Personal />
    },
    {
      name: 'Upload',
      content: <Upload />
    }
  ]);

  return (
    <div className="App">
      <UserInfo></UserInfo>

      <Tab tabList={tabList}></Tab>
    </div>
  );
}

export default App;
