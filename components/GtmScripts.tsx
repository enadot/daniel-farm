import Script from 'next/script';

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/i;

function normalize(id: string | undefined | null): string | null {
  if (!id) return null;
  const trimmed = id.trim();
  if (!GTM_ID_PATTERN.test(trimmed)) return null;
  return trimmed.toUpperCase();
}

export function GtmHeadScript({ id }: { id?: string | null }) {
  const normalized = normalize(id);
  if (!normalized) return null;

  const snippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${normalized}');`;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {snippet}
    </Script>
  );
}

export function GtmNoScript({ id }: { id?: string | null }) {
  const normalized = normalize(id);
  if (!normalized) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${normalized}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
