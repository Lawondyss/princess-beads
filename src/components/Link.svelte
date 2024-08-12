<script lang="ts">
  import {base} from '$app/paths'

  let {page, children} = $props()
</script>

<a href="{base}/{page}">{@render children()}</a>

<style>
  a {
    padding: var(--space-lg);
    background-color: var(--surface);
    border-radius: var(--round-sm);
    letter-spacing: 1px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: var(--shadow);
    align-self: center;
  }
</style>