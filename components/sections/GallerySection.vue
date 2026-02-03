<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import GalleryImage from '~/components/atoms/GalleryImage.vue'
// IMPORTIAMO IL JSON
import galleryContent from '~/content/gallery.json'

const content = ref(galleryContent)
const activeIndex = ref(null)
const showModal = ref(false)

const backdrop = ref(null)
const modalContent = ref(null)

// Recupera l'URL direttamente dall'array del JSON
// Se l'indice non esiste, mettiamo un placeholder
const getImage = (index) => {
  return content.value.images[index]?.url || 'https://placehold.co/600x600?text=BVTA'
}

const getAlt = (index) => {
  return content.value.images[index]?.alt || 'Foto Gallery'
}

const togglePreview = (index) => {
  activeIndex.value = index
  showModal.value = true
  
  gsap.to(backdrop.value, { opacity: 1, duration: 0.3, ease: 'power2.out' })
  gsap.to(modalContent.value, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 })
}

const closeModal = () => {
  gsap.to(backdrop.value, { opacity: 0, duration: 0.3, ease: 'power2.in' })
  gsap.to(modalContent.value, {
    opacity: 0,
    scale: 0.95,
    duration: 0.3,
    ease: 'back.in(1.7)',
    onComplete: () => {
      showModal.value = false
      activeIndex.value = null
    }
  })
}

const getActiveImage = () => {
  if (activeIndex.value === null) return ''
  return getImage(activeIndex.value)
}

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && showModal.value) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <section class="py-4">
    <UContainer>  
      <div class="grid gap-1 overflow-hidden">
        <div class="grid grid-cols-2 gap-1 lg:hidden">
          <GalleryImage variant="medium" :src="getImage(0)" :alt="getAlt(0)" @preview="togglePreview(0)" />
          <GalleryImage variant="medium" :src="getImage(1)" :alt="getAlt(1)" @preview="togglePreview(1)" />
        </div>

        <div class="hidden lg:grid lg:grid-cols-4 gap-1">
          <div class="grid gap-1 overflow-hidden">
            <GalleryImage variant="medium" :src="getImage(0)" :alt="getAlt(0)" @preview="togglePreview(0)" />
            <GalleryImage variant="medium" :src="getImage(1)" :alt="getAlt(1)" @preview="togglePreview(1)" />
          </div>

          <div class="col-span-2">
            <GalleryImage variant="double" :src="getImage(2)" :alt="getAlt(2)" @preview="togglePreview(2)" />
          </div>

          <div class="grid gap-1">
            <GalleryImage variant="medium" :src="getImage(3)" :alt="getAlt(3)" @preview="togglePreview(3)" />
            <GalleryImage variant="medium" :src="getImage(4)" :alt="getAlt(4)" @preview="togglePreview(4)" />
          </div>
        </div>

        <div class="lg:hidden">
          <GalleryImage variant="wide" :src="getImage(2)" :alt="getAlt(2)" @preview="togglePreview(2)" />
        </div>

        <div class="grid grid-cols-2 lg:hidden gap-1">
          <GalleryImage variant="medium" :src="getImage(3)" :alt="getAlt(3)" @preview="togglePreview(3)" />
          <GalleryImage variant="medium" :src="getImage(4)" :alt="getAlt(4)" @preview="togglePreview(4)" />
        </div>
      </div>

      <div class="mt-0">
        <NuxtLink 
          to="https://linktr.ee/bvta" 
          class="block bg-white hover:bg-white-100 transition-colors p-8 text-center"
          target="_blank"
        >
          <span class="block text-xl font-semibold text-gray-900 mb-2">Vedi altro</span>
          <span class="text-primary hover:underline">Visita la galleria completa →</span>
        </NuxtLink>
      </div>
    </UContainer>

    <Teleport to="body">
      <div v-show="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div ref="backdrop" class="absolute inset-0 bg-black/80 opacity-0" @click="closeModal"></div>
        <div ref="modalContent" class="relative z-10 max-w-4xl w-fit opacity-0 scale-95 mx-auto">
          <button @click="closeModal" class="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span class="text-xl text-primary">&times;</span>
          </button>
          <img 
            :src="getActiveImage()"
            :alt="getAlt(activeIndex)"
            class="w-auto h-auto rounded-lg max-h-[75vh] object-contain"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>