<script setup lang="ts">
const config = useRuntimeConfig()
const url = config.public.siteUrl
const title = 'Solar & Battery Installation Moorebank | Saint Boctor Energy'
const description = 'Saint Boctor Energy: 5-star rated Moorebank solar panel and home battery installers. Quotes across South-West Sydney. Call 0470 401 903.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'en_AU',
  ogUrl: url,
  twitterCard: 'summary'
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Electrician',
        name: business.name,
        url,
        telephone: business.phone,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.street,
          addressLocality: business.suburb,
          addressRegion: business.state,
          postalCode: business.postcode,
          addressCountry: 'AU'
        },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount },
        areaServed: areas.map(a => ({ '@type': 'Place', name: a })),
        makesOffer: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title } })),
        hasMap: business.mapsUrl
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      })
    }
  ]
})
</script>

<template>
  <HeroSection />
  <ServicesGrid />
  <GallerySection />
  <WhyUs />
  <ReviewsSection />
  <ProcessSteps />
  <ServiceAreas />
  <FaqList />
  <QuoteForm />
</template>
