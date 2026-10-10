import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

import { CONFIG } from '@/config';

const TITLE = CONFIG.siteTitle;
const DESCRIPTION = CONFIG.siteDescription;
const IMAGE = `${CONFIG.siteUrl}og.png`;

/**
 * Root HTML for the static web export (web.output "static"). Runs at build
 * time in Node only, so it must not use browser APIs. The <title> and the
 * canonical link come from each screen's <Head> (expo-router/head): the
 * router injects its own <title>, and a second one here would lose to it.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="theme-color" content="#0B2233" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shoal" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
