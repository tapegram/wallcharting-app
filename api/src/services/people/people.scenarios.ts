import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PersonCreateArgs>({
  person: {
    one: { data: { firstName: 'String', lastName: 'String' } },
    two: { data: { firstName: 'String', lastName: 'String' } },
  },
})

export type StandardScenario = typeof standard
