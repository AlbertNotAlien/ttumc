import React from 'react';
// import { cn } from '@/lib/utils';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex min-h-screen flex-col items-center justify-between px-4">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
