<script lang="ts">
  import Game from '$lib/game.svelte'
  import Card from '@/Card.svelte'
  import Link from '@/Link.svelte'

  const game = new Game()
  let result: string | null = $state(null)

  $effect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      result = game.validateCode(code)
    }
  })

</script>

<Card>
  <h1>{result ?? 'Tady bys neměla být 🫣'}</h1>
</Card>
<Link page="game">pokračuj v hledání</Link>

<style></style>