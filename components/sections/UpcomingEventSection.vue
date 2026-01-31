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
        v-if="content.events && content.events.length > 0"
        ref="cardsRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="event in content.events"
          :key="event.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-primary transition-colors duration-300 group"
        >
          <img
            :src="event.imageUrl"
            :alt="event.title"
            class="w-full h-64 sm:h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div class="p-6">
            <div class="flex items-center gap-2 text-primary mb-3">
              <UIcon name="i-heroicons-calendar" />
              <span class="text-sm">{{ event.date }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-background-primary">
              {{ event.title }}
            </h3>
            <p
              class="text-gray-600 mb-4 line-clamp-3 h-[4.5rem] overflow-hidden"
            >
              {{ event.description }}
            </p>
            <UButton
              color="primary"
              variant="soft"
              class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300"
              :to="'/events/' + event.slug"
            >
              {{ content.button.text }}
            </UButton>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-16 text-center animate-fade-in"
      >
        <div class="bg-gray-100 p-6 rounded-full mb-6">
          <UIcon
            name="i-heroicons-calendar-days"
            class="w-16 h-16 text-gray-400"
          />
        </div>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">
          ...stanno arrivando!
        </h3>
        <p class="text-gray-500 max-w-md mx-auto">
          Stiamo definendo gli ultimi dettagli del calendario. Torna a trovarci
          presto per scoprire i prossimi tornei.
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import eventsContent from "~/content/events.json";

gsap.registerPlugin(ScrollTrigger);

const titleRef = ref(null);
const cardsRef = ref(null);

const content = ref(eventsContent);

onMounted(() => {
  // Animazione Titolo (sempre presente)
  if (titleRef.value) {
    gsap.from(titleRef.value, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.value,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Animazione Card (SOLO se ci sono eventi e la griglia esiste)
  if (
    cardsRef.value &&
    content.value.events &&
    content.value.events.length > 0
  ) {
    gsap.from(cardsRef.value.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.value,
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    });
  }
});
</script>

<style scoped>
/* Semplice animazione per far apparire il messaggio dolcemente */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
