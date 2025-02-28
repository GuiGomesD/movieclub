<template>
    <div id="MovieView">
        <AppHeader />
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
</script>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
    }
</style>