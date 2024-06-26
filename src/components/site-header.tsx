import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function SiteHeader() {
  return (
    <header className="container sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#/"
          className="flex h-8 w-8 items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src="/ttumc-logo.svg"
            alt="ttumc-logo"
            width={36}
            height={36}
          />
          <span className="sr-only">TTUMC</span>
        </Link>
        <Link
          href="#/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="#/"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Booking
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Icons.Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Icons.Menu className="h-6 w-6" />
              <span className="sr-only">TTUMC</span>
            </Link>
            <Link
              href="#/"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link href="#/" className="hover:text-foreground">
              Booking
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icons.Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icons.CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
