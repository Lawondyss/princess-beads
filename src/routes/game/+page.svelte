<script lang="ts">
  import Game from '$lib/game.svelte'
  import Card from '@/Card.svelte'
  import Link from '@/Link.svelte'

  const game = new Game()
</script>

<Card>
  <h1>
    {#if game.foundCodes === 0}
      Zatím jsi nic nenašla
    {:else if game.foundCodes === game.maxCodes}
      Našla jsi všechny kódy
    {:else}
      Našla jsi {game.foundCodes} {game.foundCodesWord}
    {/if}
  </h1>
</Card>

<Card>
  {#if game.foundCodes < game.maxCodes}
    <h2>
      {#if game.foundCodes === 0}
        První hádanka
      {:else}
        Další hádanka
      {/if}
    </h2>
    <p>{@html game.riddle}</p>
  {:else}
    <h2>Jsi už jen krůček od pokladu</h2>
    <p>{@html game.finalMessage}</p>
  {/if}
</Card>

<Link page="scanner">oskenuj kód</Link>

<style></style>