<script setup lang="ts">
const props = defineProps<{ to: number; decimals?: number; suffix?: string }>()
const el = ref<HTMLElement>()
const text = ref((props.to).toFixed(props.decimals ?? 0))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  text.value = (0).toFixed(props.decimals ?? 0)
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    const start = performance.now()
    const dur = 1400
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      text.value = (props.to * eased).toFixed(props.decimals ?? 0)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
  io.observe(el.value!)
})
</script>

<template>
  <span ref="el">{{ text }}{{ suffix }}</span>
</template>
