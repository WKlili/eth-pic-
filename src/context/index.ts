/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';

export enum mintStatus {
  none = 'none',
  padding = 'padding',
  success = 'success'
}

const context: any = {
  mintStatus: 'none'
};

export const Context = React.createContext(context);
