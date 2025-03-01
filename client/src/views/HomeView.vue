<template>
  <div id="app">
    <AppHeader @search="updateSearch" />
    <AppBanner />
    <AppCatalog :searchQuery="searchQuery" />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "../components/app/AppHeader.vue";
import AppBanner from "../components/struct/Banner.vue";
import AppCatalog from "../components/app/AppCatalog.vue";
import AppFooter from "../components/app/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppBanner,
    AppCatalog,
    AppFooter,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    updateSearch(query) {
      this.searchQuery = query;
    },
  },
  created() {
    this.searchQuery = this.$route.query.search || "";
  },
  watch: {
    '$route.query.search': function(newQuery) {
      this.searchQuery = newQuery || "";
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #020203;
}
</style>