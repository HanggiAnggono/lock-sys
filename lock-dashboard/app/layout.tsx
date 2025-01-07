import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Lock Management Dashboard',
  description:
    'A user admin dashboard to manage your locks and their users.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
