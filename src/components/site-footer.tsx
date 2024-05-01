import * as React from 'react';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { ModeToggle } from '@/components/mode-toggle';

export default function SiteFooter({
  className = '',
}: React.HTMLAttributes<HTMLElement> & { className?: string }) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 px-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            <a
              href="#/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Rehearsal Room Rules
            </a>
            {' | '}
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Facebook
            </a>
            {' | '}
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Instagram
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
