<script lang="ts">
  let {children, ...rest} = $props()
</script>

<div class="card" {...rest}>
  {@render children()}
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space);
    background-color: var(--surface);
    border-radius: var(--round);
    padding: var(--space);
    box-shadow: var(--shadow);
  }
</style>
