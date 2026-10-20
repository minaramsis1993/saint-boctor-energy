<template>
  <div class="mobile-cta">
    <a class="btn btn-ghost-light" :href="`tel:${business.phone.replace(/\s/g, '')}`">📞 Call now</a>
    <a class="btn btn-primary" href="#quote">Free quote</a>
  </div>
</template>
