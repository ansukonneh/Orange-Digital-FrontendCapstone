<script>

</script>

<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-section">
        <h3>VAK-Net</h3>
        <p>Your ultimate destination for discovering movies. Powered by TMDB API.</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <router-link to="/">Home</router-link>
      </div>
      <div class="footer-section">
        <h4>Categories</h4>
        <router-link to="/browse?genre=28">Action</router-link>
        <router-link to="/browse?genre=35">Comedy</router-link>
        <router-link to="/browse?genre=18">Drama</router-link>
      </div>
      <div class="footer-bottom">
        <p>Developed by: Ansu, Varro and Kim</p>
        <p>&copy; 2025 VAK-Net. Data provided by TMDB.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--secondary-color);
  padding: 50px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-section h4 {
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.8;
}

.footer-section a {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 10px;
  transition: var(--transition);
}

.footer-section a:hover {
  color: var(--primary-color);
  padding-left: 5px;
}

.footer-bottom {
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid var(--surface-color);
  color: var(--text-secondary);
}

</style>
