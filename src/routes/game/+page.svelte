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
      Už jen poslední krok
    {:else}
      Našla jsi {game.foundCodes} {game.foundCodesWord}
    {/if}
  </h1>
</Card>

{#if game.foundCodes < game.maxCodes}
  <Card>
    <h2>
      {#if game.foundCodes === 0}
        První hádanka
      {:else}
        Další hádanka
      {/if}
    </h2>
    <p>{game.riddle}</p>
  </Card>
{/if}

<Link page="scanner">oskenuj kód</Link>

<style></style>