<script lang="ts">
  import {base} from '$app/paths'
  import Game, {Result} from '$lib/game.svelte'
  import Card from '@/Card.svelte'

  const game = new Game()
  let result: Result|null = $state(null)

  $effect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      result = game.validateCode(code)
    }
  })

</script>

<Card>
  <h1>{result?.message ?? 'Tady bys neměla být'}</h1>
  <a href="{base}/game" class="button big">POKRAČUJ V HLEDÁNÍ</a>
</Card>

<style></style>