'use client';

import { Button, Flex, Layout, List } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { CustomLink } from 'shared/ui/CustomLink';

const { Content } = Layout;

export const AdminLayout: FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const links: { href: string; text: string }[] = [
        {
            href: '/panel/admin/items',
            text: 'Товары',
        },
        {
            href: '/panel/admin/orders',
            text: 'Заказы',
        },
        {
            href: '/panel/admin/view',
            text: 'Страницы',
        },
        {
            href: '/panel/admin/entries',
            text: 'Категории',
        },
        {
            href: '/panel/admin/users',
            text: 'Пользователи',
        },
    ];

    return (
        <Flex vertical align='center'>
            <Content className='p-[20px] flex justify-start w-screen'>
                <List
                    className='max-w-[200px]'
                    dataSource={links}
                    renderItem={({ href, text }) => (
                        <List.Item>
                            <Button type='primary' className='w-full'>
                                <CustomLink href={href} style={{ color: 'inherit' }}>
                                    {text}
                                </CustomLink>
                            </Button>
                        </List.Item>
                    )}
                />
                <div className='w-full'>{children}</div>
            </Content>
        </Flex>
    );
};
