<template>
  <section class="py-16">
    <UContainer>
      <h2 
        ref="titleRef" 
        class="text-3xl font-bold text-center text-primary mb-12"
      >
        {{ content.title }}
      </h2>
      
      <div 
        ref="cardsRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div 
          v-for="event in content.events" 
          :key="event.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-primary transition-colors duration-300"
        >
          <img 
            :src="event.imageUrl" 
            :alt="event.title"
            class="w-full h-48 object-cover"
          >
          <div class="p-6">
            <div class="flex items-center gap-2 text-primary mb-3">
              <UIcon name="i-heroicons-calendar" />
              <span class="text-sm">{{ event.date }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-background-primary">{{ event.title }}</h3>
            <p class="text-gray-600 mb-4">{{ event.description }}</p>
            <UButton
              color="primary"
              variant="soft"
              class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300"
              :to="'/events/'+event.slug"
              >
              {{ content.button.text }}
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import eventsContent from '~/content/events.json'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const cardsRef = ref(null)

const content = ref(eventsContent)

onMounted(() => {
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
  
  gsap.from(cardsRef.value.children, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: cardsRef.value,
      start: 'top bottom-=50',
      toggleActions: 'play none none reverse'
    }
  })
})
</script>
