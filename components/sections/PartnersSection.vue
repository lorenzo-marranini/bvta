<template>
  <section class="py-16 overflow-hidden bg-white">
    <UContainer>
      <h2 
        ref="titleRef" 
        class="text-3xl font-bold text-center text-primary mb-12"
      >
        {{ content.title }}
      </h2>
      
      <div ref="sliderRef" class="relative overflow-hidden mb-12">
        <div 
          ref="trackRef"
          class="flex gap-8 items-center"
          :style="{ width: `${trackWidth}px` }"
        >
          <PartnerLogo
            v-for="partner in duplicatedPartners"
            :key="partner.id"
            :image-url="partner.imageUrl"
            :name="partner.name"
          />
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <UButton 
          to="/sponsor"
          size="xl"
          color="primary"
          variant="solid"
          class="font-bold text-white bg-primary hover:bg-primary-dark hover:text-white px-8 animate-bounce-slow"
          
        >
          Diventa Sponsor
        </UButton>
      </div>

    </UContainer>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PartnerLogo from '../atoms/PartnerLogo.vue'
import partnersContent from '~/content/partners.json' // Importiamo solo il JSON

// Usiamo direttamente i dati del JSON
const content = ref(partnersContent)

// Logica per duplicare i partner (per creare l'effetto loop infinito dello scroll)
const duplicatedPartners = computed(() => {
  return [
    ...content.value.partners, 
    ...content.value.partners.map(p => ({...p, id: p.id + '_clone'}))
  ]
})

const titleRef = ref(null)
const sliderRef = ref(null)
const trackRef = ref(null)
const trackWidth = ref(0)

onMounted(() => {
  // Animazione Titolo
  gsap.from(titleRef.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: titleRef.value,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    }
  })

  // Calcolo larghezza totale
  const calculateWidth = () => {
    if (!trackRef.value) return
    const logos = trackRef.value.children
    let totalWidth = 0
    for (let logo of logos) {
      totalWidth += logo.offsetWidth + 32 // 32px è il gap (gap-8)
    }
    trackWidth.value = totalWidth - 32 // Sottrai l'ultimo gap
  }

  // Gestione caricamento immagini per calcolare la larghezza corretta
  const images = trackRef.value ? trackRef.value.getElementsByTagName('img') : []
  let loadedImages = 0
  
  const checkImagesAndInit = () => {
    loadedImages++
    if (loadedImages >= images.length) {
      calculateWidth()
      initAnimation()
    }
  }

  if (images.length > 0) {
    for (let img of images) {
      if (img.complete) {
        checkImagesAndInit()
      } else {
        img.addEventListener('load', checkImagesAndInit)
      }
    }
  } else {
    // Fallback se non ci sono immagini
    calculateWidth()
  }

  function initAnimation() {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' }
    })

    // Se non c'è larghezza calcolata, evita errori
    if (trackWidth.value <= 0) return

    const singleSetWidth = trackWidth.value / 2

    tl.to(trackRef.value, {
      x: -singleSetWidth,
      duration: 20, // Velocità dello scroll
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize(x => {
          return ((parseFloat(x) % singleSetWidth) + singleSetWidth) % singleSetWidth - singleSetWidth
        })
      }
    })
  }
})
</script>

<style scoped>
.partner-track {
  will-change: transform;
}
/* Animazione sottile per attirare l'attenzione sul bottone */
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>