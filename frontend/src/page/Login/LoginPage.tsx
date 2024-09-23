'use client';

// import { login } from 'api/users.api';

import { Login } from './ui/Login/Login'

import { Flex } from 'antd'
interface IStateLogin {
    errors: {
        message?: string;
    };
}

export const LoginPage = () => {

    return (
        <Flex justify='center' align='center'>
            <Login />
        </Flex>
    );
};
