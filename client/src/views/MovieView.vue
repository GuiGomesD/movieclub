<template>
    <div id="MovieView">
      <AppHeader @search="handleSearch" />
      <MovieBanner />
      <MovieCredits />
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '../components/app/AppHeader.vue'
  import MovieBanner from '../components/movie/MovieBanner.vue';
  import MovieCredits from '../components/movie/MovieCredits.vue'
  import AppFooter from '../components/app/AppFooter.vue'
  
  export default {
    components: {
      AppHeader,
      MovieBanner,
      MovieCredits,
      AppFooter
    },
    methods: {
      handleSearch(query) {
        this.$router.push({ path: '/', query: { search: query } });
      }
    }
  }
  </script>
  
  <style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  </style>