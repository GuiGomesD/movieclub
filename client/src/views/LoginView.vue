<template>
    <div id="LoginView">
      <Background />
      <FormCard/>
      <AppFooter />
    </div>
</template>

<script>
    import FormCard from '../components/login/FormCard.vue';
    import Background from '../components/login/Background.vue';
    import AppFooter from '../components/app/AppFooter.vue';
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
