<template>
    <v-navigation-drawer app
        v-model="drawer"
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
</template>

<script>
  export default {
    name: 'navigation',
    data () {
      return {
        drawer: false,

        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Fruit data table', icon: 'mdi-image' },
          { title: 'Fruit gallery', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
    watch: {
      items () {
        this.drawer = false
      },
    },
  }
</script>