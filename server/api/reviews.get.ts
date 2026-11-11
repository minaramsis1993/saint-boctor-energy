// Pulls live reviews from Google (Places API) and Facebook (Graph API).
// Runs at request time on an SSR host, or at `nuxt generate` time for a static build (baked into the page).
// Any failure or missing credential falls back to nothing; the page then uses the static reviews in utils/business.ts.
interface Review { name: string; text: string; source: 'Google' | 'Facebook'; rating?: number }

interface ReviewsResult { rating?: number; count?: number; reviews: Review[] }

async function google(key: string, placeId: string): Promise<ReviewsResult> {
  const res: any = await $fetch<any>(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' }
  })
  const reviews: Review[] = (res.reviews || [])
    .filter((r: any) => r.rating >= 4 && r.text?.text)
    .map((r: any) => ({ name: r.authorAttribution?.displayName || 'Google user', text: r.text.text, source: 'Google', rating: r.rating }))
  return { rating: res.rating as number | undefined, count: res.userRatingCount as number | undefined, reviews }
}

async function facebook(pageId: string, token: string): Promise<ReviewsResult> {
  const res: any = await $fetch<any>(`https://graph.facebook.com/v21.0/${pageId}/ratings`, {
    query: { fields: 'reviewer{name},rating,recommendation_type,review_text', limit: 25, access_token: token }
  })
  const reviews: Review[] = (res.data || [])
    .filter((r: any) => r.review_text && (r.recommendation_type ? r.recommendation_type === 'positive' : r.rating >= 4))
    .map((r: any) => ({ name: r.reviewer?.name || 'Facebook user', text: r.review_text, source: 'Facebook' }))
  return { reviews }
}

export default defineEventHandler(async (): Promise<{ rating: number | null; count: number | null; reviews: Review[] }> => {
  const cfg = useRuntimeConfig()
  const [g, f]: (ReviewsResult | null)[] = await Promise.all([
    cfg.googlePlacesApiKey && cfg.googlePlaceId
      ? google(cfg.googlePlacesApiKey, cfg.googlePlaceId).catch((e: Error) => (console.warn('[reviews] Google failed:', e.message), null))
      : null,
    cfg.facebookPageToken
      ? facebook(cfg.public.facebookPageId, cfg.facebookPageToken).catch((e: Error) => (console.warn('[reviews] Facebook failed:', e.message), null))
      : null
  ])
  return {
    rating: g?.rating ?? null,
    count: g?.count ?? null,
    reviews: [...(g?.reviews || []), ...(f?.reviews || [])] as Review[]
  }
})
