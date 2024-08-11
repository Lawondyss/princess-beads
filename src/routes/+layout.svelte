<script>
  import '../app.css'

  import Header from '@/Header.svelte'
  import Footer from '@/Footer.svelte'
</script>

<div class="app">
  <Header />
  <main>
    <slot/>
  </main>
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100dvh;

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space);
      padding: var(--space);
      overflow-y: auto;
    }
  }
</style>
