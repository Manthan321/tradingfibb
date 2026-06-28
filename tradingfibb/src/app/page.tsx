import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import BannerSection from '@/components/BannerSection'
import ZerodhaSection from '@/components/ZerodhaSection'
import ServicesSection from '@/components/ServicesSection'
import BlogPreview from '@/components/BlogPreview'
import YoutubeSection from '@/components/YoutubeSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <BannerSection />
      <ZerodhaSection />
      <ServicesSection />
      <BlogPreview />
      <YoutubeSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
