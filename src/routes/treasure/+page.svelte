<script lang="ts">
  import {PUBLIC_TREASURE} from '$env/static/public'
  import Card from '@/Card.svelte'
</script>

<Card hero>
  <h1>Našla jsi poklad!</h1>
  <p>{@html PUBLIC_TREASURE.replaceAll('\n', '<br>')}</p>
</Card>

<style></style>