<template>
  <section class="splashScreen">
    <div class="container">
      <span class="logo"><a href="#"></a></span>
      <div class="wText">
        <h1>EUM ARCTOAE PARTICIPEMQUE SIQUID QUI EUM PER SOLUS .</h1>
        <p>EUM ARCTOAE PARTICIPEMQUE SIQUID QUI EUM PER SOLUS .</p>
        <a src="#" id="discover" @click="scroll">Découvrir</a>
      </div>
      <span class="arrowDown" @click="scroll"></span>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    scroll () {
      document.getElementById('app').scrollIntoView({behavior: 'smooth', inline: 'nearest'})
    }
  }
}
</script>
