<template>
  <div id="app">
    <AppHeader />
    <AppBanner />
    <AppCatalog />
    <AppFooter />
  </div>
</template>

<script>
  import AppHeader from '../components/app/AppHeader.vue';
  import AppBanner from '../components/struct/Banner.vue';
  import AppCatalog from '../components/app/AppCatalog.vue';
  import AppFooter from '../components/app/AppFooter.vue'

  export default {
    components: {
      AppHeader,
      AppBanner,
      AppCatalog,
      AppFooter
    }
  };;
</script>

<style>

  * {
    margin: 0px;
    padding: 0px;
  }

  body {
    background-color: #020203;
  }
</style>
