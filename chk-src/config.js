/* eslint-disable no-undef */
/** @format */

// API
export const HOST_API = 'http://172.16.68.236:8765/';
export const IS_DEVELOPMENT = 'DEVELOPMENT';
// export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';
// export const IS_DEVELOPMENT = process.env.REACT_APP_PROJECT_TYPE === 'DEVELOPMENT';
// ----------------------------------------------------------------------

// SETTINGS
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeColorPresets: 'default',
  themeLayout: 'horizontal',
};

// LAYOUT
// ----------------------------------------------------------------------
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 56,
  DASHBOARD_DESKTOP_HEIGHT: 60,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 40,
  DASHBOARD_ITEM_SUB_HEIGHT: 'auto',
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};
export const secretKey = {
  encryptionSecret: 'my&ecretKey12345',
};
