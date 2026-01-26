
import { Service, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Treatments', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
];

export const SERVICES: Service[] = [
  {
    id: '1',
    number: '01',
    title: 'Laser Hair',
    italicWord: 'removal',
    description: 'Experience silky smooth skin with our state-of-the-art diode laser technology. Painless, effective, and permanent.',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    number: '02',
    title: 'Cosmelan',
    italicWord: 'depigmentation',
    description: 'The world’s leading professional depigmentation method to remove spots and prevent their reappearance.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    number: '03',
    title: 'Dermaplaning',
    italicWord: 'glow',
    description: 'Exfoliate the epidermis and rid the skin of fine vellus hair (peach fuzz) for instant radiance.',
    image: 'https://images.unsplash.com/photo-1620331313123-6e428167909a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    number: '04',
    title: 'Chemical',
    italicWord: 'peels',
    description: 'Advanced resurfacing solutions to improve texture, tone, and overall skin health.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    number: '05',
    title: 'Threading &',
    italicWord: 'waxing',
    description: 'Precision shaping for brows and gentle hair removal for sensitive areas.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    number: '06',
    title: 'Microneedling',
    italicWord: 'therapy',
    description: 'Stimulate collagen production to reduce scars, fine lines, and improve skin texture.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=400',
  },
];
