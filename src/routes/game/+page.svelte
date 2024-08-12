<script lang="ts">
  import {base} from '$app/paths'
  import Game from '$lib/game.svelte'
  import Card from '@/Card.svelte'

  const game = new Game()
</script>

<Card>
  {#if game.foundCodes < game.maxCodes}
    {#if game.foundCodes === 0}
      <h1>Zatím jsi nic nenašla</h1>
      <p>První hádanka zní:</p>
    {:else}
      <h1>Našla jsi {game.foundCodes} {game.foundCodesWord}</h1>
      <p>Další hádanka zní:</p>
    {/if}
    <p>{game.riddle}</p>
  {:else}
    <h1>Už jen poslední krok</h1>
    <p>Poskládej všechny krabičky tak, aby vytvořili QR kód. Odhalí Ti, kde je ukrytý poklad.</p>
  {/if}
</Card>

<a href="{base}/scanner" class="button">OSKENUJ KÓD</a>

<style>
  .button {
    padding: var(--space-lg);
    align-self: center;
  }
</style>