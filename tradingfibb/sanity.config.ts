import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const banner = defineType({
  name: 'banner',
  title: 'Offer Banners',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Main Heading', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'badgeText', title: 'Badge (e.g. "Limited Offer")', type: 'string' }),
    defineField({ name: 'ctaText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'Button Link', type: 'url' }),
    defineField({ name: 'active', title: 'Show on Website?', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Order (1 = first)', type: 'number', initialValue: 1 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'active' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? '✅ Active' : '❌ Hidden' }
    }
  }
})

const blog = defineType({
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Fibonacci', 'Zerodha', 'F&O Basics', 'Technical Analysis', 'Market Update', 'Beginners'] }
    }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({ name: 'mainImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({
      name: 'body', title: 'Blog Content', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' }
  }
})

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (with country code)', type: 'string', description: 'e.g. 918837486621' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Office Address', type: 'text', rows: 2 }),
    defineField({ name: 'officeHours', title: 'Office Hours', type: 'string' }),
    defineField({ name: 'zerodhaLink', title: 'Zerodha Account Opening Link', type: 'url' }),
  ]
})

export default defineConfig({
  name: 'tradingfibb',
  title: 'TradingFibb CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: [banner, blog, siteSettings] },
})
