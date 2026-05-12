import { fetchOneEntry, type BuilderContent } from '@builder.io/sdk-react-nextjs';

export const BUILDER_API_KEY =
  process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? '6728a5ea20e84fb486556b6399dea5b3';

export async function getBuilderPage(
  urlPath: string,
  locale: string,
): Promise<BuilderContent | null> {
  return fetchOneEntry({
    apiKey: BUILDER_API_KEY,
    model: 'page',
    userAttributes: { urlPath },
    options: { locale },
  });
}

export async function getBuilderSection(
  name: string,
  locale: string,
): Promise<BuilderContent | null> {
  return fetchOneEntry({
    apiKey: BUILDER_API_KEY,
    model: 'section',
    query: { name },
    options: { locale },
  });
}

export async function getBuilderSettings(
  locale: string,
): Promise<BuilderContent | null> {
  return fetchOneEntry({
    apiKey: BUILDER_API_KEY,
    model: 'settings',
    options: { locale },
  });
}
