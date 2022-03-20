import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const relationships = async ({ id }: Prisma.RelationshipWhereUniqueInput) => {
  // const person = db.person.findUnique({
  //   where: { id },
  // })
  // const leftRelationships = person.relationshipsLeft ? person.relationshipsLeft.map(relationship => { relationship.right }) : []
  // // const rightRelationships = person.relationshipsRight?.map(relationship => { relationship.left })

  // return leftRelationships.conacat(rightRelationships)
  const relationships = await db.relationship.findMany({ where: { leftId: id }})
  const lefts = relationships.map((relationship) => relationship.rightId)
  const rights = relationships.map((relationship) => relationship.leftId)
  console.log(lefts.concat(rights))
  return lefts.concat(rights)
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
