<template>
    <v-container class="lighten-5">
        <v-row no-gutters>
            <v-col
                cols="12"
                sm="2"
            >  
            </v-col>
            <v-col
                cols="12"
                sm="8"
                style="display:grid;justify-content:center;"
            >
                <v-carousel
                    cycle
                    height="500"
                    hide-delimiter-background
                    show-arrows-on-hover
                    style="width:800px;margin:10px;"
                >
                    <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                    :src="slide"
                    >
                    </v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col
                cols="12"
                sm="2"
            ></v-col>
        </v-row>
  </v-container>
  
</template>

<script>
export default {
    name: 'Gallery',
    data:() => ({
        slides: [
          
        ],
    }),
    created() {
        this.getFiles();
    },
    methods: {
        getFiles () {
            const files = require.context('../assets/fruit', false, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys()
            console.log('files',files);
            for (let item of files) {
                let file =  require('../assets/fruit/' + item.substring(2))
                // base64的不加载
                if (file.indexOf('data:') !== 0) {
                    this.slides.push(file)
                }
            }
        },
    }
}
</script>