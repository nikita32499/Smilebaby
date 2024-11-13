/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // eslint: {
    //     ignoreDuringBuilds: true, // Отключает ESLint при сборке
    // },

    // experimental: {
    //     esmExternals: 'loose',
    // },
    transpilePackages: [
        'antd',
        '@ant-design',
        'rc-util',
        'rc-pagination',
        'rc-picker',
        'rc-notification',
        'rc-tooltip',
        'rc-tree',
        'rc-table',
    ],
    // output: 'standalone',
};

export default nextConfig;
