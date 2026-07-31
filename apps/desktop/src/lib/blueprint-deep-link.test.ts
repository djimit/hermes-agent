import { describe, expect, it } from 'vitest'

import { blueprintCommand } from './blueprint-deep-link'

describe('blueprintCommand', () => {
  it('escapes parameter values as one command argument', () => {
    expect(blueprintCommand('morning-brief', { note: 'line 1\n"next"\\done' })).toBe(
      '/blueprint morning-brief note="line 1\\n\\"next\\"\\\\done"'
    )
  })

  it('rejects command syntax in identifiers', () => {
    expect(blueprintCommand('safe\n/help', {})).toBeNull()
    expect(blueprintCommand('safe', { 'bad key': 'value' })).toBeNull()
  })
})
