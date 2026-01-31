<template>
  <Main>
    <div v-if="event" class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        
        <NuxtLink 
          :to="'/events'" 
          class="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium"
        >
          <UIcon name="i-heroicons-arrow-left" class="mr-2" />
          {{'Torna agli Eventi'}}
        </NuxtLink>

        <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          
          <div class="relative h-64 md:h-[500px] w-full group">
            <img 
              :src="event.imageUrl" 
              :alt="event.title" 
              class="w-full h-full object-cover transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
              <div v-if="isPastEvent" class="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                Evento Concluso
              </div>
              <h1 class="text-3xl md:text-5xl font-bold mb-2 leading-tight shadow-sm">{{ event.title }}</h1>
            </div>
          </div>

          <div class="p-6 md:p-10">
            <div class="grid md:grid-cols-3 gap-10">
              
              <div class="md:col-span-2 space-y-8">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Dettagli Evento</h3>
                  <p class="text-gray-600 leading-relaxed text-lg">
                    {{ event.description }}
                  </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div class="bg-white p-2 rounded-lg shadow-sm mr-4 text-primary">
                      <UIcon name="i-heroicons-calendar" class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 font-medium">Quando</span>
                      <span class="block text-gray-900 font-bold">{{ event.date }}</span>
                    </div>
                  </div>
                  <div class="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div class="bg-white p-2 rounded-lg shadow-sm mr-4 text-primary">
                      <UIcon name="i-heroicons-map-pin" class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 font-medium">Dove</span>
                      <span class="block text-gray-900 font-bold">{{ event.location }}</span>
                    </div>
                  </div>
                  <div class="flex items-start p-4 bg-gray-50 rounded-xl sm:col-span-2 md:col-span-1 lg:col-span-2">
                    <div class="bg-white p-2 rounded-lg shadow-sm mr-4 text-primary">
                      <UIcon name="i-heroicons-user-group" class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 font-medium">Categoria</span>
                      <span class="block text-gray-900 font-bold">{{ event.category }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="isPastEvent && event.galleryImages && event.galleryImages.length > 0" class="mt-8 pt-8 border-t border-gray-100">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">I momenti migliori</h3>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div 
                      v-for="(img, index) in event.galleryImages" 
                      :key="index"
                      class="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <img :src="img" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="md:col-span-1">
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm sticky top-24">
                  
                  <div v-if="isPastEvent">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Rivivi l'evento</h3>
                    <p class="text-sm text-gray-500 mb-6">
                      Sfoglia l'album completo con tutte le foto ufficiali del torneo.
                    </p>
                    <UButton
                      :to="event.externalGalleryLink"
                      target="_blank"
                      size="xl"
                      block
                      color="gray"
                      variant="solid"
                      class="text-white bg-primary  font-bold hover:bg-primary-dark hover:text-white transition-colors duration-300"
                      icon="i-heroicons-photo"
                    >
                      GALLERY COMPLETA
                    </UButton>
                  </div>

                  <div v-else>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">
                      {{ event.type === 'camp' ? 'Partecipa al camp' : 'Partecipa al torneo' }}
                    </h3>
                    <p class="text-sm text-gray-500 mb-6">
                      {{ event.type === 'camp' 
                          ? 'Per iscriversi compilare il seguente modulo' 
                          : "Per iscriversi accedere tramite l'app Dink o clicca sotto." 
                      }}
                    </p>
                    
                    <UButton
                      v-if="event.signupLink"
                      :to="event.signupLink"
                      target="_blank"
                      size="xl"
                      block
                      :ui="{ rounded: 'rounded-xl' }"
                      class="w-full font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg border-none ring-0"
                      icon="i-heroicons-pencil-square"
                    >
                      ISCRIVITI ORA
                    </UButton>

                    <div v-else class="text-center p-4 bg-gray-100 rounded-lg text-gray-500 font-medium">
                      Iscrizioni non disponibili
                    </div>
                  </div>

                  <div class="mt-4 text-center">
                    <p class="text-xs text-gray-400">Hai dubbi? <a href="/#contact" class="text-primary hover:underline">Contattaci</a></p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <div v-else class="pt-32 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-gray-300 mb-4">404</h1>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Evento non trovato</h2>
      <UButton to="/events/index" color="primary" variant="solid">Torna agli eventi</UButton>
    </div>
  </Main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Main from "@/components/layout/Main.vue";

// IMPORTIAMO ENTRAMBI I FILE DATI
import upcomingEventsData from '~/content/events.json'
import pastEventsData from '~/content/pastEvents.json'

const route = useRoute()
const currentSlug = route.params.slug

// LOGICA UNIFICATA:
// 1. Cerca prima negli eventi futuri
let foundEvent = upcomingEventsData.events.find(e => e.slug === currentSlug)
let isPast = false

// 2. Se non lo trova, cerca negli eventi passati
if (!foundEvent) {
  foundEvent = pastEventsData.events.find(e => e.slug === currentSlug)
  if (foundEvent) {
    isPast = true
  }
}

const event = foundEvent
const isPastEvent = isPast
</script>