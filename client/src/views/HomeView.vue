<template>
  <div id="app">
    <AppHeader @search="updateSearch" />
    <AppBanner />
    <AppCatalog :searchQuery="searchQuery" :genre="genre" />
    <AppFooter />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

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
  setup() {
    const route = useRoute();
    const searchQuery = ref("");
    const genre = ref(route.params.genreValue || "");

    watch(
      () => route.params.genreValue,
      (newGenre) => {
        genre.value = newGenre || "";
      }
    );

    const updateSearch = (query) => {
      searchQuery.value = query;
    };

    return {
      searchQuery,
      genre,
      updateSearch,
    };
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

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #020203;
}
</style>