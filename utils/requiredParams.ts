import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ debug: false, path: process.env.DOTENV_CONFIG_PATH || '.env' });

export const baseURL =
  process.env.baseURL || 'https://automationteststore.com/';
export const USERNAME = process.env.USERNAME || '';
export const PASSWORD = process.env.PASSWORD || '';
