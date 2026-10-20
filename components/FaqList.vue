<template>
  <section id="faq" class="section section-alt">
    <div class="container narrow">
      <h2 v-reveal>Frequently Asked Questions</h2>
      <details v-for="(f, n) in faqs" :key="f.q" v-reveal="n * 60" class="faq">
        <summary>{{ f.q }}</summary>
        <p>{{ f.a }}</p>
      </details>
    </div>
  </section>
</template>
