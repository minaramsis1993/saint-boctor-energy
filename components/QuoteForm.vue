<script setup lang="ts">
const config = useRuntimeConfig()
const blank = () => ({ name: '', phone: '', email: '', suburb: '', service: services[0].title, message: '' })
const form = reactive(blank())
const botcheck = ref(false) // honeypot: real visitors never tick this hidden box
const status = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')

async function submit() {
  status.value = 'sending'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: config.public.web3formsKey,
        subject: `New quote request: ${form.service} (${form.name})`,
        from_name: 'Saint Boctor Energy website',
        botcheck: botcheck.value,
        ...form
      })
    })
    const data = await res.json()
    if (res.ok && data.success) {
      status.value = 'ok'
      Object.assign(form, blank())
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="quote" class="section quote">
    <div class="container quote-inner">
      <div>
        <h2>Get Your Free Quote</h2>
        <p class="sub light">Tell us what you need and we’ll get back to you quickly.</p>
        <p><strong>Call:</strong> <a :href="`tel:${business.phone.replace(/\s/g, '')}`">{{ business.phoneDisplay }}</a></p>
        <address>
          {{ business.street }}, {{ business.suburb }} {{ business.state }} {{ business.postcode }}
        </address>
        <p><a :href="business.mapsUrl" target="_blank" rel="noopener">View on Google Maps</a></p>
      </div>

      <form class="form" @submit.prevent="submit">
        <input v-model="botcheck" type="checkbox" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label>Name<input v-model="form.name" required autocomplete="name"></label>
        <label>Phone<input v-model="form.phone" type="tel" required autocomplete="tel"></label>
        <label>Email<input v-model="form.email" type="email" autocomplete="email"></label>
        <label>Suburb<input v-model="form.suburb" autocomplete="address-level2"></label>
        <label>Service
          <select v-model="form.service">
            <option v-for="s in services" :key="s.title">{{ s.title }}</option>
          </select>
        </label>
        <label>Message<textarea v-model="form.message" rows="3" /></label>
        <button class="btn btn-primary btn-lg" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Sending…' : 'Request my quote' }}
        </button>
        <p v-if="status === 'ok'" class="msg ok" role="status">Thanks! We’ll be in touch shortly.</p>
        <p v-if="status === 'error'" class="msg err" role="alert">Something went wrong. Please call us instead.</p>
      </form>
    </div>
  </section>
</template>
