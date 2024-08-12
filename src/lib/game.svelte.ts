import { browser } from '$app/environment'

class Store {
  private readonly values: string[] = $state([])
  private readonly key: string = 'beads'

  constructor() {
    if (browser) {
      const item = localStorage.getItem(this.key)
      if (item) this.values = JSON.parse(item)
    }

    $effect(() => {
      localStorage.setItem(this.key, JSON.stringify(this.values))
    });
  }

  has(value: string|null): boolean {
    return value
      ? this.values.includes(value)
      : false
  }

  add(value: string|null): void {
    if (!value) return

    this.values.includes(value) || this.values.push(value)
  }

  getAll(): string[] {
    return [...this.values]
  }
}

export default class Game {
  private readonly codes: string[] = [
    'gjxzst', 'mrtsjm', 'cwonnz',
    'mtejwz', 'imxsix', 'ndxmmt',
    'zekzbv', 'gprzyu', 'bcqswm',
  ]
  private readonly riddles: string[] = [
    'Hádanka 1',
    'Hádanka 2',
    'Hádanka 3',
    'Hádanka 4',
    'Hádanka 5',
    'Hádanka 6',
    'Hádanka 7',
    'Hádanka 8',
    'Hádanka 9',
  ]
  private readonly compliments: string[] = [
    'Krásná práce 👍', 'Podařilo se Ti to 😘',
    'Jen tak dál ❤️', 'Jsi prostě úžasná 🥰',
  ]
  private store: Store

  constructor() {
    this.store = new Store()
  }

  get foundCodes(): number {
    return this.store.getAll().length
  }

  get foundCodesWord(): string {
    if (this.foundCodes === 1) return 'kód'
    if (0 < this.foundCodes && this.foundCodes < 5) return 'kódy'
    return 'kódů'
  }

  get maxCodes(): number {
    return this.codes.length
  }

  get riddle(): string|null {
    return this.riddles[this.foundCodes] ?? null
  }

  validateCode(code: string): string {
    if (!this.codes.includes(code)) return 'To není správný kód 😱'
    if (!this.store.has(code)) this.store.add(code)
    return this.getCompliment()
  }

  private getCompliment(): string {
    const key = Math.floor(Math.random() * this.compliments.length)
    return this.compliments[key]
  }
}
