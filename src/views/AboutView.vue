<template>
  <div class="about">
    <h1>This is an About Page</h1>
    <p>This is Page where all activities of vue3 is happening....... Voila! Welcome</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
