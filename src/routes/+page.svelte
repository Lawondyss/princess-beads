<script>
  import Game from '$lib/game.svelte'
  import Rules from '@/Rules.svelte'
  import Card from '@/Card.svelte'
  import Link from '@/Link.svelte'

  const game = new Game()
</script>


{#if game.hasTreasure}
  <Card hero>
    <h1>Poklad už jsi našla</h1>
    <Link page="treasure">Tvůj poklad</Link>
  </Card>
{:else}
  <Card hero>
    <h1>Princeznička na bále&hellip;</h1>
    <p>Však to znáš 😊</p>
    <p>Takže máš za úkol,<br>všechny je najít.</p>
  </Card>
  <Rules/>
  <Link page="game">začni hledat</Link>
{/if}

<style></style>
