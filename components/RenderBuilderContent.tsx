'use client';

import { Content, type BuilderContent } from '@builder.io/sdk-react-nextjs';
import { customComponents } from '@/lib/builder-registry';
import { BUILDER_API_KEY } from '@/lib/builder';

type Props = {
  content: BuilderContent | null;
  model: string;
  locale: string;
};

export default function RenderBuilderContent({ content, model, locale }: Props) {
  if (!content) return null;
  return (
    <Content
      content={content}
      apiKey={BUILDER_API_KEY}
      model={model}
      customComponents={customComponents}
      locale={locale}
    />
  );
}
