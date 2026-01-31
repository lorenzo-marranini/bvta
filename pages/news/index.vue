<template>
  <Main>
    <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
      <UContainer class="max-w-4xl mx-auto">
        
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-primary mb-2">Tutte le News</h1>
          <p class="text-gray-600">Archivio completo degli aggiornamenti BVTA</p>
        </div>

        <div class="space-y-6">
          <article 
            v-for="article in paginatedNews" 
            :key="article.id"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row group"
          >
            <div 
              v-if="article.image" 
              class="w-full md:w-64 h-48 md:h-auto flex-shrink-0 relative bg-gray-100 overflow-hidden"
            >
              <img 
                :src="article.image" 
                :alt="article.title" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="$event.target.style.display='none'"
              />
            </div>

            <div class="p-6 flex flex-col justify-center flex-grow">
              <div class="flex items-center text-sm text-gray-500 mb-2">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1"/>
                {{ formatDate(article.date) }}
              </div>
              
              <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                {{ article.title }}
              </h2>
              
              <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                {{ article.excerpt }}
              </p>

              <div class="mt-auto">
                <NuxtLink 
                  :to="`/news/${article.id}`" 
                  class="text-primary font-semibold text-sm hover:underline cursor-pointer flex items-center group-hover:translate-x-1 transition-transform"
                >
                  Leggi tutto <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1"/>
                </NuxtLink>
              </div>
              
            </div>
          </article>
        </div>

        <div v-if="paginatedNews.length === 0" class="text-center py-20 text-gray-500">
          Nessuna notizia trovata.
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-4">
          
          <UButton 
            :disabled="currentPage === 1" 
            @click="changePage(currentPage - 1)"
            variant="ghost"
            color="gray"
            icon="i-heroicons-chevron-left"
            class="text-lg font-bold text-primary hover:text-primary hover:bg-orange-50 transition-colors"
          >
            Precedente
          </UButton>

          <span class="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
            Pagina {{ currentPage }} di {{ totalPages }}
          </span>

          <UButton 
            :disabled="currentPage === totalPages" 
            @click="changePage(currentPage + 1)"
            variant="ghost"
            color="gray"
            trailing-icon="i-heroicons-chevron-right"
            class="text-lg font-bold text-primary hover:text-primary hover:bg-orange-50 transition-colors"
          >
            Successiva
          </UButton>
          
        </div>

      </UContainer>
    </div>
  </Main>
</template>

<script setup>
import { ref, computed } from 'vue';
import Main from "@/components/layout/Main.vue";
import newsData from '~/content/news.json';

const itemsPerPage = 5;
const currentPage = ref(1);

const allSortedNews = computed(() => {
  const articles = [...(newsData.articles || [])];
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
});

const totalPages = computed(() => {
  return Math.ceil(allSortedNews.value.length / itemsPerPage);
});

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allSortedNews.value.slice(start, end);
});

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('it-IT', options);
};
</script>