import { clicker } from './lib/clicker';

export const CssDevToolHook = () => {
    if (process.env['NODE_ENV'] !== 'development') return;
    clicker();
};
