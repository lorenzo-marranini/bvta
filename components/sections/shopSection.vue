<template>
  <section id="shop" class="py-20 bg-gray-50">
    <UContainer>
      
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-primary">BVTA Shop</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Il merchandising ufficiale Beach Volley Tirrenia Academy e le occasioni uniche dal nostro magazzino.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          
          <div class="relative h-64 overflow-hidden bg-gray-100 group">
            <span 
              v-if="product.type === 'vinted'" 
              class="absolute top-2 right-2 z-10 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm"
            >
              Ultimi pezzi
            </span>
            <span 
              v-else 
              class="absolute top-2 right-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm"
            >
              Su Ordinazione
            </span>
            
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          <div class="p-5 flex-grow flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-lg mb-1 text-gray-800">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ product.description }}</p>
            </div>
            
            <div class="flex items-center justify-between mt-auto">
              <span class="font-bold text-xl text-primary">{{ product.price }}</span>
              
              <UButton 
                v-if="product.type === 'order'" 
                @click="openOrderModal(product)"
                class="bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300 px-6"
                variant="solid"
                size="sm"
              >
                Ordina
              </UButton>
              
              <a 
                v-else 
                :href="vintedProfileUrl" 
                target="_blank"
                class="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                Vai su Vinted <UIcon name="i-heroicons-arrow-top-right-on-square" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center border-t border-gray-200 pt-12">
        <h3 class="text-2xl font-bold mb-3 text-gray-800">Cerchi taglie uniche o occasioni?</h3>
        <p class="mb-8 text-gray-600">Gestiamo tutto il materiale "pronta consegna" e le rimanenze dei tornei direttamente sul nostro profilo Vinted.</p>
        <UButton 
          :to="vintedProfileUrl" 
          target="_blank"
          color="teal"
          size="xl"
          class="bg-teal-600 font-bold px-8 shadow-lg hover:-translate-y-1 transition-transform"
        >
          Visita il nostro Vinted
        </UButton>
      </div>

    </UContainer>

    <div v-if="showModal" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in flex flex-col max-h-[90vh] overflow-y-auto">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
        
        <h3 class="text-2xl font-bold mb-2 text-primary">Richiedi {{ selectedProduct?.name }}</h3>
        <p class="text-sm text-gray-500 mb-6">
          Compila il form. Ti risponderemo via mail per confermare la disponibilità, la taglia e il pagamento.
        </p>

        <form @submit.prevent="submitRequest" class="space-y-4">
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
            <input 
              type="text" 
              v-model.trim="formName" 
              required 
              class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-gray-700" 
              placeholder="Mario Rossi"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">La tua Email</label>
            <input 
              type="email" 
              v-model.trim="formEmail" 
              required 
              class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-gray-700" 
              placeholder="nome@esempio.com"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Taglia / Note</label>
            <textarea 
              v-model.trim="formNotes" 
              rows="3" 
              required
              class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-gray-700"
              placeholder="Es. Taglia L, ne vorrei 2 pezzi..."
            ></textarea>
          </div>
          
          <div v-if="status.message" class="w-full">
            <p v-if="status.type === 'success'" class="text-green-600 text-sm font-bold text-center bg-green-50 p-3 rounded-lg border border-green-100">
              <UIcon name="i-heroicons-check-circle" class="align-middle mr-1"/> {{ status.message }}
            </p>
            <p v-if="status.type === 'error'" class="text-red-600 text-sm font-bold text-center bg-red-50 p-3 rounded-lg border border-red-100">
              {{ status.message }}
            </p>
          </div>

          <UButton 
            type="submit" 
            block 
            size="lg"
            :loading="loading"
            :disabled="!isFormValid || status.type === 'success'"
            variant="solid"
            class="transition-all duration-300 font-bold border"
            :class="[
              isFormValid && status.type !== 'success'
                ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600' 
                : '!bg-gray-200 !text-gray-400 !border-gray-200 cursor-not-allowed'
            ]"
          >
            Invia Richiesta
          </UButton>

        </form>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import productsData from '~/content/products.json';

// CONFIGURAZIONE
const vintedProfileUrl = "https://www.vinted.it/member/3133809858"; 

// STATO
const products = ref(productsData);
const showModal = ref(false);
const selectedProduct = ref(null);
const loading = ref(false);
const status = ref({ type: '', message: '' });

// REFS FORM
const formName = ref('');
const formEmail = ref('');
const formNotes = ref('');

// VALIDAZIONE
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isFormValid = computed(() => {
  return formName.value.length > 0 && 
         isValidEmail(formEmail.value) && 
         formNotes.value.length > 0;
});

// GESTIONE MODALE
const openOrderModal = (product) => {
  selectedProduct.value = product;
  status.value = { type: '', message: '' };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    formName.value = '';
    formEmail.value = '';
    formNotes.value = '';
    status.value = { type: '', message: '' };
  }, 300);
};

// INVIO FORM
const submitRequest = async () => {
  loading.value = true;
  status.value = { type: '', message: '' };

  try {
    const response = await fetch("https://formsubmit.co/ajax/beachvolleytirreniacademy@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        // MODIFICA QUI: Oggetto generico per evitare ripetizioni visive
        _subject: `Nuova Richiesta Ordine Shop BVTA`,
        Prodotto: selectedProduct.value.name,
        Prezzo: selectedProduct.value.price,
        Cliente: formName.value,
        Email: formEmail.value,
        Note_Taglia: formNotes.value
      })
    });

    if (response.ok) {
      status.value = { 
        type: 'success', 
        message: 'Grazie! Richiesta inviata. Ti risponderemo presto via email.' 
      };
      
      formName.value = '';
      formEmail.value = '';
      formNotes.value = '';
      
      setTimeout(() => {
        closeModal();
      }, 3000);
    } else {
      throw new Error('Errore server');
    }

  } catch (error) {
    status.value = { 
      type: 'error', 
      message: 'Si è verificato un errore. Per favore riprova o contattaci direttamente.' 
    };
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>