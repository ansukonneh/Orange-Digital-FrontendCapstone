<template>
  <div class="home">
    <HeroSection :movie="featuredMovie" />
    
    <section class="container section">
      <h2 class="section-title">Trending Now</h2>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      <MovieGrid v-else :movies="trendingMovies" />
    </section>

    <section class="container section">
      <h2 class="section-title">Popular Movies</h2>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      <MovieGrid v-else :movies="popularMovies" />
    </section>

    <section class="container section">
      <h2 class="section-title">Top Rated</h2>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      <MovieGrid v-else :movies="topRatedMovies" />
    </section>

    <section class="container section">
      <h2 class="section-title">Now Playing</h2>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      <MovieGrid v-else :movies="nowPlayingMovies" />
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>
.section {
  padding: 60px 0;
}
</style>
