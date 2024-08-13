<script lang="ts">
  import Game, {goTo} from '$lib/game.svelte'
  import Card from '@/Card.svelte'

  const game = new Game()

  const reset = (evt: Event) => {
    evt.preventDefault()
    game.reset()
    goTo.homepage()
  }
</script>

<Card>
  <h2>Opravdu chceš začít znova?</h2>
  <button class="button" onclick={reset}>ano</button>
</Card>