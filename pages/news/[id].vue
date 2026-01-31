<template>
  <Main>
    <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
      
      <UContainer v-if="article" class="max-w-3xl mx-auto">
        
        <div class="mb-8">
          <UButton 
            to="/news" 
            variant="ghost" 
            icon="i-heroicons-arrow-left"
            class="-ml-3 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
            >
            Torna alle News
          </UButton>
        </div>

        <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div v-if="article.image" class="h-64 md:h-96 w-full relative bg-gray-100">
            <img 
              :src="article.image" 
              :alt="article.title" 
              class="w-full h-full object-cover"
              @error="$event.target.style.display='none'"
            />
          </div>

          <div class="p-8 md:p-12">
            <div class="flex items-center text-sm text-gray-500 mb-4 font-medium">
              <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-2 text-primary"/>
              {{ formatDate(article.date) }}
            </div>

            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {{ article.title }}
            </h1>

            <div 
              class="prose prose-lg max-w-none text-gray-600 leading-relaxed"
              v-html="article.body || article.excerpt"
            >
            </div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
               <span class="text-sm text-gray-400">BVTA News</span>
               <div class="flex gap-2">
                 <UButton icon="i-heroicons-share" variant="ghost" color="gray" size="sm" />
               </div>
            </div>
          </div>

        </article>

      </UContainer>

      <UContainer v-else class="max-w-4xl mx-auto text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Articolo non trovato</h2>
        <p class="text-gray-600 mb-8">Sembra che la notizia che cerchi non esista o sia stata rimossa.</p>
        <UButton to="/news" color="primary" size="lg">Torna all'elenco</UButton>
      </UContainer>

    </div>
  </Main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Main from "@/components/layout/Main.vue";
import newsData from '~/content/news.json';

const route = useRoute();
const articleId = route.params.id; 

const article = newsData.articles.find(a => a.id == articleId);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('it-IT', options);
};
</script>

<style scoped>
:deep(.prose p) {
  margin-bottom: 1.5rem;
}
:deep(.prose strong) {
  color: #111827;
  font-weight: 700;
}
:deep(.prose h3) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}
:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>