import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/builder/',
          '/auth/',
        ],
      },
    ],
    sitemap: 'https://hiredtodayapp.com/sitemap.xml',
    host: 'https://hiredtodayapp.com',
  };
}
