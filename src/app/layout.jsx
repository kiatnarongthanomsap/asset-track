import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AssetTrack - ระบบจัดการทรัพย์สิน',
  description: 'ระบบจัดการครุภัณฑ์และทรัพย์สิน',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

