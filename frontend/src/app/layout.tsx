import { PropsWithChildren } from 'react';
import ErrorBoundary from 'shared/ui/ErrorBoundary/ErrorBoundary';
import { HeaderWidget } from 'widgets/Header';
import ReduxProvider from './_providers/ReduxProvider';
import './_style/animate.scss';
import './_style/index.css';
import './_style/layer.css';

import cn from 'classnames';
import { Metadata } from 'next';
import { Footer } from 'widgets/Footer';

export const metadata: Metadata = {
    icons: {
        icon: '/favicon/favicon.ico',
    },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='en'>
            <body className={cn('flex flex-col min-h-screen')}>
                <ReduxProvider>
                    <ErrorBoundary>
                        <HeaderWidget />

                        <div className='max-w-[1200px] flex flex-col items-center justify-start m-auto flex-grow py-[30px]'>
                            {children}
                        </div>
                        <Footer />
                    </ErrorBoundary>
                </ReduxProvider>
            </body>
        </html>
    );
};
export default RootLayout;
