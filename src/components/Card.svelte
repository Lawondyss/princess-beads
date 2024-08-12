<script lang="ts">
  let {children, hero, ...rest} = $props()
</script>

<section class:hero {...rest}>
  {@render children()}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--space);
    background-color: var(--surface);
    border-radius: var(--round);
    padding: var(--space);
    box-shadow: var(--shadow);
  }

  .hero {
    font-size: var(--text-lg);
    text-align: center;
  }
</style>
