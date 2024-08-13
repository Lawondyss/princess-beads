import * as env from '$env/static/public'
import {browser} from '$app/environment'
import {goto} from '$app/navigation'
import {base} from '$app/paths'

class Store<T> {
  private readonly key: string
  value: T = $state<T>() as T

  constructor(key: string, value: any) {
    this.key = key
    this.value = value

    if (browser) {
      const item = localStorage.getItem(this.key)
      if (item) this.value = JSON.parse(item)
    }

    $effect(() => localStorage.setItem(this.key, JSON.stringify(this.value)))
  }
}

class CodesStore extends Store<string[]> {
  constructor() {
    super('codes', [])
  }

  has(code: string | null): boolean {
    return code
      ? this.value.includes(code)
      : false
  }

  add(code: string | null): void {
    if (!code) return

    this.value.includes(code) || this.value.push(code)
  }

  all(): string[] {
    return [...this.value]
  }

  clear(): void {
    this.value.length = 0
  }
}

export default class Game {
  private readonly codesStore: CodesStore
  private readonly foundTreasure: Store<boolean>
  private readonly compliments: string[]
  private readonly final: { code: string, msg: string }
  private readonly codes: string[] = []
  private readonly riddles: string[] = []

  constructor() {
    this.codesStore = new CodesStore()
    this.foundTreasure = new Store<boolean>('treasure', false)
    this.compliments = env.PUBLIC_COMPLIMENTS.split(':')

    const [code, msg] = env.PUBLIC_FINAL_STEP.split(':')
    this.final = {code, msg}

    for (const name in env) {
      if (!name.startsWith('PUBLIC_STEP_')) continue

      // @ts-ignore
      const value = env[name]
      if (typeof value !== 'string' || !value.includes(':')) continue

      const [code, riddle] = value.split(':')
      this.codes.push(code)
      this.riddles.push(riddle)
    }

    if (browser) {
      const item = localStorage.getItem('treasure')
      if (item) this.foundTreasure.value = JSON.parse(item)
    }

    $effect(() => {
      localStorage.setItem('treasure', JSON.stringify(this.foundTreasure.value))
    });
  }

  get hasTreasure(): boolean {
    return this.foundTreasure.value
  }

  get foundCodes(): number {
    return this.codesStore.all().length
  }

  get foundCodesWord(): string {
    if (this.foundCodes === 1) return 'kód'
    if (0 < this.foundCodes && this.foundCodes < 5) return 'kódy'
    return 'kódů'
  }

  get maxCodes(): number {
    return this.codes.length
  }

  get riddle(): string | null {
    return this.riddles[this.foundCodes]?.replaceAll('\n', '<br>') ?? null
  }

  get finalMessage(): string {
    return this.final.msg
  }

  validateCode(code: string): string {
    if (code === this.final.code) {
      if (this.foundCodes !== this.maxCodes) {
        return 'Nepodváděj! 👮‍♂️'
      }

      this.foundTreasure.value = true
      goTo.treasure()
    }

    if (!this.codes.includes(code)) {
      return 'To není správný kód 😱'
    }

    if (!this.codesStore.has(code)) {
      this.codesStore.add(code)
    }

    return this.getCompliment()
  }

  reset(): void {
    this.codesStore.clear()
    this.foundTreasure.value = false
  }

  private getCompliment(): string {
    const key = Math.floor(Math.random() * this.compliments.length)
    return this.compliments[key]
  }
}

export const goTo = {
  homepage: (): Promise<void> => goto(`${base}/`),
  game: (): Promise<void> => goto(`${base}/game`),
  reset: (): Promise<void> => goto(`${base}/reset`),
  result: (code: string): Promise<void> => goto(`${base}/result?code=${encodeURI(code)}`),
  scanner: (): Promise<void> => goto(`${base}/scanner`),
  treasure: (): Promise<void> => goto(`${base}/treasure`),
}
