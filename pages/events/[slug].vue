<template>
  <Main>
    <div v-if="event" class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        
        <NuxtLink to="/#events" class="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
          <UIcon name="i-heroicons-arrow-left" class="mr-2" />
          Torna agli eventi
        </NuxtLink>

        <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          
          <div class="relative h-64 md:h-[500px] w-full group">
            <img 
              :src="event.imageUrl" 
              :alt="event.title" 
              class="w-full h-full object-cover transition-transform duration-700 "
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
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
              </div>

              <div class="md:col-span-1">
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm sticky top-24">
                  
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
                    class="w-full font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none ring-0"
                    icon="i-heroicons-pencil-square"
                    >
                    ISCRIVITI ORA
                  </UButton>
                  
                  <div v-else class="text-center p-4 bg-gray-100 rounded-lg text-gray-500 font-medium">
                    Iscrizioni chiuse o non disponibili
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
      <UButton to="/#events" color="primary" variant="solid">Torna alla lista</UButton>
    </div>
  </Main>
</template>

<script setup>
import { useRoute } from 'vue-router'
// NON serve più importare 'computed' perché la logica è semplice e diretta nel template
import Main from "@/components/layout/Main.vue";
import eventsData from '~/content/events.json'

const route = useRoute()
const currentSlug = route.params.slug
const event = eventsData.events.find(e => e.slug === currentSlug)
</script>