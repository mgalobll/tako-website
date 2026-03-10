'use client';

import { useEffect } from 'react';
import type { Dictionary } from '@/config/locales';
import { bookingConfig } from '@/config/booking';

type Props = {
  t: Dictionary;
};

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function BookingPanel({ t }: Props) {
  useEffect(() => {
    if (bookingConfig.mode !== 'embed' || !bookingConfig.inPerson.calLink) {
      return;
    }

    // Use Cal's bootstrap queue pattern so inline embed config is applied even before script load.
    (function (C: Window, A: string, L: string) {
      const p = function (a: any, ar: IArguments | unknown[]) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal as any;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.createElement('script');
            script.src = A;
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            } as any;
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, `${bookingConfig.inPerson.origin}/embed/embed.js`, 'init');

    window.Cal?.('init', bookingConfig.inPerson.namespace, { origin: bookingConfig.inPerson.origin });
    window.Cal?.ns?.[bookingConfig.inPerson.namespace]?.('inline', {
      elementOrSelector: `#${bookingConfig.inPerson.elementId}`,
      config: {
        layout: bookingConfig.inPerson.layout,
        useSlotsViewOnSmallScreen: 'true'
      },
      calLink: bookingConfig.inPerson.calLink
    });
    window.Cal?.ns?.[bookingConfig.inPerson.namespace]?.('ui', {
      hideEventTypeDetails: true,
      layout: bookingConfig.inPerson.layout,
      theme: bookingConfig.inPerson.theme
    });
  }, []);

  if (!bookingConfig.inPerson.calLink) {
    return <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{t.booking.missingConfig}</p>;
  }

  if (bookingConfig.mode !== 'embed') {
    return (
      <a
        href={`${bookingConfig.inPerson.origin}/${bookingConfig.inPerson.calLink}`}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
      >
        {t.booking.continueButton}
      </a>
    );
  }

  return <div id={bookingConfig.inPerson.elementId} className="h-[780px] w-full overflow-hidden bg-white" />;
}
