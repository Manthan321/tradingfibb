import Link from 'next/link'
import { client, BLOGS_QUERY } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

interface Blog {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
}

export const revalidate = 60

export default async function BlogPage() {
  let blogs: Blog[] = []
  try { blogs = await client.fetch(BLOGS_QUERY) } catch {}

  return (
    <>
      <Navbar />
      <div style={{paddingTop:'68px',background:'#F7F4EF',minHeight:'100vh'}}>
        {/* Header */}
        <div style={{background:'#0E1B2E',padding:'72px 6% 56px'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontSize:'10px',fontWeight:600,letterSpacing:'3px',textTransform:'uppercase',color:'#B8914A',marginBottom:'14px'}}>Trading Insights</div>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(32px,4vw,52px)',color:'#fff',fontWeight:600,lineHeight:1.15}}>
              Knowledge from the Markets.
            </h1>
            <div style={{width:'40px',height:'2px',background:'#B8914A',marginTop:'20px'}}/>
          </div>
        </div>

        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'60px 6%'}}>
          {!blogs.length ? (
            <div style={{textAlign:'center',padding:'80px 0'}}>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'24px',color:'#0E1B2E',marginBottom:'12px'}}>Blog coming soon.</div>
              <p style={{color:'#6B6860',fontSize:'15px',fontWeight:300}}>First posts will be published shortly. Subscribe on YouTube for now.</p>
              <a href="https://youtube.com/@tradingfibb" target="_blank"
                style={{display:'inline-block',marginTop:'24px',background:'#FF0000',color:'#fff',padding:'12px 28px',borderRadius:'3px',fontSize:'13px',fontWeight:600,textDecoration:'none',letterSpacing:'0.5px'}}>
                Watch on YouTube
              </a>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'#D5CFC5',border:'1px solid #D5CFC5'}}>
              {blogs.map(post => (
                <Link key={post._id} href={`/blog/${post.slug.current}`}
                  style={{background:'#fff',padding:'36px 30px',textDecoration:'none',display:'flex',flexDirection:'column'}}>
                  {post.category && <span style={{fontSize:'9px',fontWeight:600,letterSpacing:'2.5px',textTransform:'uppercase',color:'#B8914A',marginBottom:'16px'}}>{post.category}</span>}
                  <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'19px',color:'#0E1B2E',lineHeight:1.3,marginBottom:'12px',fontWeight:600}}>{post.title}</h2>
                  {post.excerpt && <p style={{fontSize:'13px',color:'#6B6860',lineHeight:1.65,flex:1,fontWeight:300}}>{post.excerpt}</p>}
                  <span style={{marginTop:'20px',fontSize:'12px',color:'#B8914A',fontWeight:600}}>Read Article →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
