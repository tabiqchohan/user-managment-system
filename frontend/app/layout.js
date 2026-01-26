// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ToastProvider } from '../components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'User Management App',
  description: 'Full-stack CRUD application with Neon PostgreSQL and Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}