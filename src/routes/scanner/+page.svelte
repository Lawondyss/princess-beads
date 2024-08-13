<script lang="ts">
  import jsQR from 'jsqr'
  import {goTo} from '$lib/game.svelte'

  let loading: boolean = $state(true)
  let error: string | null = $state(null)

  $effect(() => {
    const video = document.createElement('video') as HTMLVideoElement
    const canvasElm = document.querySelector('canvas') as HTMLCanvasElement
    const canvas = canvasElm.getContext('2d', {willReadFrequently: true})

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      error = 'Nemám povolení ke kaměře'
      return
    }

    navigator.mediaDevices
      .getUserMedia({video: {facingMode: 'environment'}})
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute('playsinline', '1'); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
      })
      .catch((err: { name?: string, message?: string }) => {
        if (!err.name) {
          error = String(err)
        } else {
          const errors: Record<string, string> = {
            AbortError: 'S kamerou je něco hodně špatně',
            InvalidStateError: 'S kamerou je něco hodně špatně',
            NotFoundError: 'Nenašel jsem kameru',
            NotAllowedError: 'Nemám povolení ke kameře',
            NotReadableError: 'Kameru používá jiná appka',
            OverconstrainedError: 'Chybí mi vhodná kamera',
            SecurityError: 'Mám bezpečnostní problém',
          }
          error = errors[err.name] ?? err.name
        }
      })

    function tick() {
      if (canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElm.hidden = loading = false

        const width = canvasElm.width = video.videoWidth
        const height = canvasElm.height = video.videoHeight

        canvas.drawImage(video, 0, 0, width, height)

        const imgData = canvas.getImageData(0, 0, width, height)
        const code = jsQR(imgData.data, imgData.width, imgData.height, {inversionAttempts: 'dontInvert'})

        if (code) {
          goTo.result(code.data.trim())
          return
        }
      }

      requestAnimationFrame(tick)
    }
  })
</script>

<div id="scanner" class:loading>
  {#if loading}<h1>👀 🎥</h1>{/if}
  {#if error}<h2>{error}</h2>{/if}
  <canvas hidden></canvas>
</div>

<style>
  #scanner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space);
    width: 80%;
    aspect-ratio: 1;
    border-radius: calc(infinity * 1px);
    margin: auto;

    &:not(.loading):before, &:not(.loading):after {
      --perimetr: 2px;
      border-radius: calc(infinity * 1px);
      content: '';
      position: absolute;
      inset: calc(var(--perimetr) * -1);
      background: linear-gradient(0deg, #fb0094, #00ff00, #ffff00, #ff0000, #fb0094, #00ff00, #ffff00, #ff0000);
      background-size: 400%;
      width: calc(100% + var(--perimetr) * 2);
      height: calc(100% + var(--perimetr) * 2);
      z-index: -1;
      animation: spin 3s linear infinite;
    }

    &:after {
      filter: blur(20px);
    }
  }

  @keyframes spin {
    100% {
      transform: rotateZ(360deg);
    }
  }

  canvas {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: calc(infinity * 1px);
  }
</style>