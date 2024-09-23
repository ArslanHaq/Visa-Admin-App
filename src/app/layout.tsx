import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Provider from '../providers/Provider';
import NavbarComponent from '@/components/molecules/NavbarComponent';
import FooterComponent from '@/components/molecules/FooterComponent';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visa Web App',
  description: 'Visa Web App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} flex flex-col min-h-screen relative`}>
          <ToastContainer />
          <NavbarComponent />
          <div className="flex-grow">{children}</div>
          <FooterComponent />
          {/* <LayoutComponent children={children} /> */}
        </body>

      </Provider>
    </html>
  );
}
