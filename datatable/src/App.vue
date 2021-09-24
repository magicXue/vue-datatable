<template>
  <v-app>
    <navigation/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import navigation from '@/components/Navigation.vue'
export default {
  name: 'App',
  components: {
    navigation
  },
  data: () => ({
    //
  }),
};
</script>
