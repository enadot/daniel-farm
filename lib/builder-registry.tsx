import type { RegisteredComponent } from '@builder.io/sdk-react-nextjs';
import ServiceCard from '@/components/ServiceCard';
import SectionCard from '@/components/SectionCard';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import HomeCarousel from '@/components/HomeCarousel';
import GalleryGrid from '@/components/GalleryGrid';
import CallbackForm from '@/components/CallbackForm';
import SeoContent from '@/components/SeoContent';

/**
 * Every component below appears as a draggable block in the Builder.io
 * visual editor. The `inputs` are the editable props the marketer sees
 * in the side panel.
 */
export const customComponents: RegisteredComponent[] = [
  {
    component: ServiceCard,
    name: 'Service Card',
    image:
      'https://cdn.builder.io/static/img/builder-icons/component-section.svg',
    inputs: [
      {
        name: 'icon',
        type: 'string',
        defaultValue: '🌿',
        helperText: 'Emoji or single character displayed in the icon circle',
      },
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'longText', required: true },
    ],
  },
  {
    component: SectionCard,
    name: 'Section Card',
    inputs: [
      { name: 'emoji', type: 'string', defaultValue: '🌿' },
      { name: 'title', type: 'string', required: true },
      { name: 'atmosphere', type: 'string', required: true },
      { name: 'description', type: 'longText', required: true },
      {
        name: 'features',
        type: 'list',
        subFields: [{ name: 'text', type: 'string' }],
      },
      { name: 'includedLabel', type: 'string', defaultValue: 'What\'s included:' },
    ],
  },
  {
    component: PageHero,
    name: 'Page Hero',
    inputs: [
      { name: 'emoji', type: 'string', defaultValue: '🌿' },
      { name: 'title', type: 'string', required: true },
      { name: 'subtitle', type: 'longText' },
    ],
  },
  {
    component: CTASection,
    name: 'CTA Section',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'longText' },
    ],
  },
  {
    component: TrustBar,
    name: 'Trust Bar',
    noWrap: true,
    inputs: [],
  },
  {
    component: HomeCarousel,
    name: 'Photo Carousel',
    noWrap: true,
    inputs: [],
  },
  {
    component: GalleryGrid,
    name: 'Gallery Grid',
    noWrap: true,
    inputs: [],
  },
  {
    component: CallbackForm,
    name: 'Callback Form',
    inputs: [
      {
        name: 'title',
        type: 'string',
        helperText: 'Optional override for the form heading',
      },
      {
        name: 'description',
        type: 'longText',
        helperText: 'Optional override for the helper text',
      },
    ],
  },
  {
    component: SeoContent,
    name: 'SEO Article',
    noWrap: true,
    inputs: [],
  },
];
