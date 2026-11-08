<script setup lang="ts">
const { data: live } = await useReviews()
const rating = computed(() => live.value?.rating ?? business.rating)
const count = computed(() => live.value?.count ?? business.reviewCount)
const list = computed(() => {
  const l = live.value?.reviews
  return l?.length ? l.slice(0, 6) : reviews.map(r => ({ ...r, source: 'Google' }))
})
</script>

<template>
  <section id="reviews" class="section">
    <div class="container">
      <h2 v-reveal>What Our Customers Say</h2>
      <p v-reveal="80" class="sub"><span class="stars" aria-hidden="true">★★★★★</span> {{ rating.toFixed(1) }} from {{ count }} Google reviews</p>
      <div class="grid grid-3">
        <figure v-for="(r, n) in list" :key="r.source + r.text" v-reveal="(n % 3) * 120" class="card review lift">
          <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“{{ r.text }}”</blockquote>
          <figcaption>{{ r.source }} review · {{ r.name }}</figcaption>
        </figure>
      </div>
      <p class="center review-links">
        <a class="btn btn-ghost-dark" :href="business.mapsUrl" target="_blank" rel="noopener">Read all reviews on Google</a>
        <a class="btn btn-ghost-dark" :href="business.facebookUrl" target="_blank" rel="noopener">See us on Facebook</a>
      </p>
    </div>
  </section>
</template>
