export function useReviews() {
  return useAsyncData('reviews', () => $fetch('/api/reviews').catch(() => null), { default: () => null })
}
