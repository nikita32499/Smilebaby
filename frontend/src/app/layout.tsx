import { Inter, Rubik } from 'next/font/google';
import { PropsWithChildren } from 'react';
import ErrorBoundary from 'shared/ui/ErrorBoundary/ErrorBoundary';
import { HeaderWidget } from 'widgets/Header';
import ReduxProvider from './_providers/ReduxProvider';
import './_style/index.css';
import './_style/layer.css';

import cn from 'classnames';
import { Footer } from 'widgets/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-rubik',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='en'>
            <body
                className={cn(
                    inter.className,
                    rubik.className,
                    'flex flex-col min-h-screen',
                )}
            >
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
