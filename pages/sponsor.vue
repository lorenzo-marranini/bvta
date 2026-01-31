<template>
  <Main>
    <div class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div class="bg-primary p-12 text-center text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            <UIcon name="i-heroicons-hand-raised" class="w-16 h-16 mb-4 text-white/90 relative z-10" />
            <h1 class="text-4xl font-bold mb-2 relative z-10">Unisciti a Noi</h1>
            <p class="text-primary-100 text-lg relative z-10">Diventa partner ufficiale BVTA</p>
          </div>

          <div class="p-8 md:p-12 space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Perché diventare sponsor?</h2>
            <p class="text-gray-600 leading-relaxed">
              La Beach Volley Tirrenia Academy non è solo sport, è una community. 
              Sostenendoci, legherai il tuo brand a valori di salute, competizione e divertimento.
            </p>

            <ul class="grid md:grid-cols-2 gap-4 mt-6">
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-check-badge" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Logo su divise e striscioni campi</span>
              </li>
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-globe-alt" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Visibilità Social & Web</span>
              </li>
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-megaphone" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Menzioni durante i tornei</span>
              </li>
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-gift" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Stand promozionali agli eventi</span>
              </li>
            </ul>

            <div class="pt-8 mt-4 border-t border-gray-100 text-center">
              <p class="text-gray-500 mb-6">Pronto a scendere in campo con noi?</p>
              
              <UButton 
                @click="openModal"
                size="xl"
                block
                color="primary"
                variant="solid"
                class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300"
              >
                <span class="mr-2">Richiedi Pacchetto Sponsor</span>
                <UIcon name="i-heroicons-paper-airplane" />
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>

        <div class="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
          
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Richiesta Informazioni</h3>
              <p class="text-sm text-gray-500">Compila il form per ricevere il prospetto.</p>
            </div>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-6 overflow-y-auto">
            
            <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <UFormGroup label="Nome Azienda / Attività" name="company" required>
                  <UInput 
                    v-model="form.company" 
                    placeholder="Es. Mario Rossi SRL" 
                    icon="i-heroicons-building-office" 
                    size="lg"
                    class="w-full"
                  />
                </UFormGroup>
              </div>

              <div>
                <UFormGroup 
                  label="Telefono" 
                  name="phone" 
                  required 
                  :error="errors.phone"
                >
                  <UInput 
                    v-model="form.phone" 
                    placeholder="+393331234567" 
                    icon="i-heroicons-phone"
                    size="lg"
                    class="w-full"
                    @input="errors.phone = ''" 
                  />
                </UFormGroup>
              </div>

              <div>
                <UFormGroup label="Nome Referente" name="name" required>
                  <UInput 
                    v-model="form.name" 
                    placeholder="Il tuo nome" 
                    icon="i-heroicons-user"
                    size="lg"
                    class="w-full"
                  />
                </UFormGroup>
              </div>

              <div>
                <UFormGroup label="Email Aziendale" name="email" required>
                  <UInput 
                    v-model="form.email" 
                    type="email" 
                    placeholder="email@azienda.com" 
                    icon="i-heroicons-envelope"
                    size="lg"
                    class="w-full"
                  />
                </UFormGroup>
              </div>

              <div class="col-span-1 sm:col-span-2 w-full">
                <UFormGroup label="Messaggio o Richieste specifiche" name="message" class="w-full">
                  <UTextarea 
                    v-model="form.message" 
                    placeholder="Sarei interessato a conoscere le opzioni per la stagione estiva..." 
                    :rows="6"
                    size="lg"
                    class="w-full"
                    :ui="{ wrapper: 'w-full' }"
                  />
                </UFormGroup>
              </div>

              <div class="col-span-1 sm:col-span-2 w-full" v-if="status.message">
                <p v-if="status.type === 'success'" class="text-green-600 text-sm font-bold text-center bg-green-50 p-3 rounded-lg border border-green-100">
                  <UIcon name="i-heroicons-check-circle" class="align-middle mr-1"/> {{ status.message }}
                </p>
                <p v-if="status.type === 'error'" class="text-red-600 text-sm font-bold text-center bg-red-50 p-3 rounded-lg border border-red-100">
                  {{ status.message }}
                </p>
              </div>

              <div class="col-span-1 sm:col-span-2 w-full pt-2">
                <UButton 
                  type="submit" 
                  block 
                  class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300"
                  size="xl"
                  :loading="isLoading"
                  :disabled="status.type === 'success'"
                >
                  Invia Richiesta
                </UButton>
                <p class="text-xs text-center text-gray-400 mt-3">
                  Cliccando invia acconsenti al trattamento dei dati.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </Teleport>

  </Main>
</template>

<script setup>
import { ref } from 'vue'
import Main from "@/components/layout/Main.vue";

const isOpen = ref(false)
const isLoading = ref(false)
const status = ref({ type: '', message: '' })
const errors = ref({}) // Oggetto per memorizzare gli errori di validazione

const form = ref({
  company: '',
  name: '',
  phone: '',
  email: '',
  message: '',
  _subject: 'Nuova richiesta SPONSOR dal sito BVTA'
})

const openModal = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  status.value = { type: '', message: '' }
  errors.value = {} // Reset errori all'apertura
}

const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

// Funzione di Validazione Telefono
const validatePhone = (phone) => {
  // Regex: 
  // ^(\+)?  -> Accetta opzionalmente un '+' all'inizio
  // \d+     -> Poi accetta solo numeri (da 0 a 9)
  // $       -> Fino alla fine della stringa (niente altro)
  const phoneRegex = /^(\+)?\d+$/;
  
  // Controlliamo anche la lunghezza minima (es. 6 cifre)
  if (!phone || phone.length < 6) return false;
  
  return phoneRegex.test(phone);
}

const submitForm = async () => {
  // 1. Reset errori precedenti
  errors.value = {}
  status.value = { type: '', message: '' }

  // 2. Controllo Validazione Telefono
  // Rimuoviamo eventuali spazi vuoti per sbaglio prima e dopo
  form.value.phone = form.value.phone.trim(); 

  if (!validatePhone(form.value.phone)) {
    errors.value.phone = "Inserisci un numero valido (solo cifre, es: +393331234567 o 3331234567)";
    // Interrompiamo l'invio
    return;
  }

  // 3. Se tutto ok, procediamo con l'invio
  isLoading.value = true

  try {
    const response = await fetch("https://formsubmit.co/ajax/beachvolleytirreniacademy@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        Azienda: form.value.company,
        Telefono: form.value.phone,
        Referente: form.value.name,
        Email: form.value.email,
        Messaggio: form.value.message,
        _subject: `Sponsor: ${form.value.company}`
      })
    });

    if (response.ok) {
      status.value = { 
        type: 'success', 
        message: 'Grazie! La richiesta è stata inviata con successo.' 
      };
      form.value = { company: '', name: '', phone: '', email: '', message: '' };
      setTimeout(() => closeModal(), 3000);
    } else {
      throw new Error('Errore server');
    }

  } catch (error) {
    status.value = { 
      type: 'error', 
      message: 'Errore durante l\'invio. Riprova o scrivi una mail.' 
    };
  } finally {
    isLoading.value = false;
  }
}
</script>