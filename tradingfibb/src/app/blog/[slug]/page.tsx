import { client, BLOG_QUERY, BLOGS_QUERY } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const blogs = await client.fetch(BLOGS_QUERY)
    return blogs.map((b: any) => ({ slug: b.slug.current }))
  } catch { return [] }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: any = null
  try { post = await client.fetch(BLOG_QUERY, { slug: params.slug }) } catch {}
  if (!post) notFound()

  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' }) : ''

  return (
    <>
      <Navbar />
      <div style={{paddingTop:'68px',background:'#F7F4EF',minHeight:'100vh'}}>
        {/* Hero */}
        <div style={{background:'#0E1B2E',padding:'64px 6% 48px'}}>
          <div style={{maxWidth:'800px',margin:'0 auto'}}>
            <Link href="/blog" style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',textDecoration:'none',letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'6px',marginBottom:'24px'}}>
              ← Back to Blog
            </Link>
            {post.category && <div style={{fontSize:'10px',fontWeight:600,letterSpacing:'2.5px',textTransform:'uppercase',color:'#B8914A',marginBottom:'16px'}}>{post.category}</div>}
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(26px,3.5vw,44px)',color:'#fff',fontWeight:600,lineHeight:1.15}}>{post.title}</h1>
            {date && <div style={{fontSize:'12px',color:'rgba(255,255,255,0.35)',marginTop:'16px',letterSpacing:'0.5px'}}>{date}</div>}
          </div>
        </div>

        {/* Body */}
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 6%'}}>
          <div className="prose-tradingfibb">
            {post.body ? <PortableText value={post.body} /> : <p style={{color:'#6B6860'}}>Content coming soon.</p>}
          </div>

          {/* CTA */}
          <div style={{marginTop:'60px',background:'#0E1B2E',padding:'36px',borderRadius:'2px'}}>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'20px',color:'#fff',marginBottom:'10px',fontWeight:600}}>Ready to start trading?</div>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.55)',marginBottom:'20px',fontWeight:300}}>Open your free Zerodha account through TradingFibb — Tripura's first Authorized Person.</p>
            <a href="https://wa.me/918837486621" target="_blank"
              style={{display:'inline-block',background:'#B8914A',color:'#fff',padding:'12px 28px',borderRadius:'2px',fontSize:'12px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',textDecoration:'none'}}>
              WhatsApp Us Now →
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
