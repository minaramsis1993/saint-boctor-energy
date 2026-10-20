<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <strong>{{ business.name }}</strong>
        <p>Electrical installation &amp; maintenance: switchboards, EV chargers, batteries and security systems.</p>
        <p class="small">{{ business.licence }}</p>
      </div>
      <div>
        <p>{{ business.street }}<br>{{ business.suburb }} {{ business.state }} {{ business.postcode }}</p>
        <p><a :href="`tel:${business.phone.replace(/\s/g, '')}`">{{ business.phone }}</a></p>
      </div>
    </div>
    <p class="container small copy">© {{ new Date().getFullYear() }} {{ business.name }}. All rights reserved.</p>
  </footer>
</template>
