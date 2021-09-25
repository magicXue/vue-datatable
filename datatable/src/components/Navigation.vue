<template>
  <div>
    <v-overlay :value="drawer" z-index="4">
    </v-overlay>
    <v-app-bar
      app
      clipped-left
      dark
      color="#447fa6"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app
        v-model="drawer"
        clipped
        :style="{ top: $vuetify.application.top + 'px', zIndex: 4 }"
    >
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Fruit
            </v-list-item-title>
            <v-list-item-subtitle>
                this is example of vue and vuetify
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
        >
            <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
            @click="drawer = false"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data () {
      return {
        drawer: false,

        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard',link:'/' },
          { title: 'Fruit data table', icon: 'mdi-image',link:'/datatable' },
          { title: 'Fruit gallery', icon: 'mdi-help-box',link:'/gallery' },
        ],
        right: null,
      }
    },
    watch: {
      items () {
        this.drawer = false
      },
    },
    methods: {
    }
  }
</script>