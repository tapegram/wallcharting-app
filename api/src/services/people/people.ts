import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const relationships = async ({ id }: Prisma.RelationshipWhereUniqueInput) => {
  return (await db.relationship.findMany({ where: { leftId: id }}))
}

export const createRelationship = ({ input }: CreateRelationshipArgs) => {
  return db.relationship.create({ data: input })
}

export const people = () => {
  return db.person.findMany()
}

export const person = ({ id }: Prisma.PersonWhereUniqueInput) => {
  return db.person.findUnique({
    where: { id },
  })
}

interface CreatePersonArgs {
  input: Prisma.PersonCreateInput
}

export const createPerson = ({ input }: CreatePersonArgs) => {
  return db.person.create({
    data: input,
  })
}

interface UpdatePersonArgs extends Prisma.PersonWhereUniqueInput {
  input: Prisma.PersonUpdateInput
}

export const updatePerson = ({ id, input }: UpdatePersonArgs) => {
  return db.person.update({
    data: input,
    where: { id },
  })
}

export const deletePerson = ({ id }: Prisma.PersonWhereUniqueInput) => {
  return db.person.delete({
    where: { id },
  })
}

export const Person = {
  relationshipsLeft: (
    _obj,
    { root }: ResolverArgs<ReturnType<typeof person>>
  ) => db.person.findUnique({ where: { id: root.id } }).relationshipsLeft(),
  relationshipsRight: (
    _obj,
    { root }: ResolverArgs<ReturnType<typeof person>>
  ) => db.person.findUnique({ where: { id: root.id } }).relationshipsRight(),
}

export const Relationship = {
  left: (
    _obj,
    { root }: ResolverArgs<ReturnType<typeof person>>
  ) => db.relationship.findUnique({ where: { id: root.id } }).left(),
  right: (
    _obj,
    { root }: ResolverArgs<ReturnType<typeof person>>
  ) => db.relationship.findUnique({ where: { id: root.id } }).right(),
}

