import { StorePage } from 'page/Store';

import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Каталог детской одежды. Все товары',
    description: 'Каталог детской одежды. Все товары',
};

export default () => <StorePage params={{ sectionSlug: '' }} />;
