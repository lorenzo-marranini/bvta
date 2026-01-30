<template lang="">
    <Main>
        <div class="pt-32 min-h-screen bg-gray-50">
            <div class="container mx-auto px-4 mb-8 text-center">
                <h1 class="text-4xl font-bold text-primary">I Nostri Tornei</h1>
                    <p class="text-gray-600 mt-2">Scopri i prossimi appuntamenti in programma</p>
        </div>
      
        <UpcomingEventSection />
    </Main>
</template>
<script setup>
import Main from "@/components/layout/Main.vue";
import UpcomingEventSection from "@/components/sections/UpcomingEventSection.vue";
</script>
