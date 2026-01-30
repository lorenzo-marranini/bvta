<template>
  <footer class="w-full bg-background-primary border-t border-gray-800">
    <UContainer class="py-12">
      <div class="flex flex-col items-center justify-center mb-4">
        <div class="flex items-center justify-center gap-4 w-full">
          <div class="hidden md:block h-px bg-gray-800 flex-grow"></div>
          <div class="flex items-center gap-4">
            <a v-for="link in socialLinks" :href="link.path" 
               class="text-gray-400 hover:text-primary transition-colors" 
               target="_blank"
            >
              <UIcon :name="link.icon" class="w-6 h-6" />
            </a>
          </div>
          <div class="hidden md:block h-px bg-gray-800 flex-grow"></div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">BVTA</h2>
        <div class="text-gray-400 text-sm">
          © 2025 BVTA. Tutti i diritti riservati.
        </div>
      </div>

      <nav class="flex justify-center">
        <ul class="flex flex-wrap justify-center gap-6">
          <li v-for="item in menuItems" :key="item.path">
            <a 
              :href="item.path"
              class="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer"
              @click="(e) => handleNavClick(item.path, e)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </UContainer>
  </footer>
</template>

<script setup>
import { useScrollTo } from '~/composables/useScrollTo'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router' // <--- IMPORTANTE: Aggiunto questo
import footerContent from '~/content/footer.json'

const { scrollToElement } = useScrollTo()
const route = useRoute()     // <--- Aggiunto questo
const router = useRouter()   // <--- Aggiunto questo

const menuItems = ref(footerContent.footerMenu)
const socialLinks = ref(footerContent.socialLinks)

const handleNavClick = async (path, event) => {
  // Se è un'ancora (es. /#partners o #partners)
  if (path.includes('#')) {
    event.preventDefault()
    
    // Prendi solo la parte dopo il #
    const hashIndex = path.indexOf('#')
    const targetId = path.substring(hashIndex) // es. "#partners"

    if (route.path === '/') {
      // Se siamo già in home, scorri subito
      scrollToElement(targetId)
    } else {
      // Se siamo in un'altra pagina, vai in Home e poi scorri
      await router.push('/')
      setTimeout(() => {
        scrollToElement(targetId)
      }, 100)
    }
  }
  // Se è un link normale, lascia fare il cambio pagina
}
</script>
