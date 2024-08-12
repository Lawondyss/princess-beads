<script lang="ts">
  import {base} from '$app/paths'
</script>

<header>
  <a href={base}>Princezničky korále</a>
</header>

<style>
  header {
    display: flex;
    justify-content: center;
    background-color: var(--surface);
    box-shadow: var(--shadow);
    padding: var(--space-sm);
    font-size: var(--text-xl);
    font-weight: bold;
  }
</style>