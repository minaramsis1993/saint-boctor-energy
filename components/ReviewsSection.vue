<template>
  <section id="reviews" class="section">
    <div class="container">
      <h2 v-reveal>What Our Customers Say</h2>
      <p v-reveal="80" class="sub"><span class="stars" aria-hidden="true">★★★★★</span> {{ business.rating.toFixed(1) }} from {{ business.reviewCount }} Google reviews</p>
      <div class="grid grid-3">
        <figure v-for="(r, n) in reviews" :key="r.text" v-reveal="n * 120" class="card review lift">
          <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“{{ r.text }}”</blockquote>
          <figcaption>Google review · {{ r.name }}.</figcaption>
        </figure>
      </div>
      <p class="center"><a class="btn btn-ghost-dark" :href="business.mapsUrl" target="_blank" rel="noopener">Read all reviews on Google</a></p>
    </div>
  </section>
</template>
