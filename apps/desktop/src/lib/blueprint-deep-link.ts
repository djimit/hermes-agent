const IDENTIFIER = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/

export function blueprintCommand(name: string, params: Record<string, string>): string | null {
  const slots = Object.entries(params)

  if (!IDENTIFIER.test(name) || slots.length > 64) {
    return null
  }

  for (const [key, value] of slots) {
    if (!IDENTIFIER.test(key) || value.length > 4096) {
      return null
    }
  }

  const args = slots.map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(' ')

  return `/blueprint ${name}${args ? ` ${args}` : ''}`
}
