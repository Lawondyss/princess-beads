<script lang="ts">
  import type {Snippet} from 'svelte'
  import {base} from '$app/paths'

  interface Params {
    children: Snippet,
    page: '' | 'game' | 'reset' | 'scanner' | 'treasure',
  }

  let {children, page}: Params = $props()
</script>

<a href="{base}/{page}" class="button">{@render children()}</a>

<style></style>