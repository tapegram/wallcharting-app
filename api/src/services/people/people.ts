import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const relationshipsGraph = async () => {
  const relationships = await db.relationship.findMany({
    include: {
      left: true,
      right: true,
    },
  })

  const nodes = getNodes(relationships)
  const edges = getEdges(relationships)

  return { nodes, edges }
}

const getNodes = (relationships) => {
  const nodes = []
  relationships.forEach((relationship) => {
    nodes.push({
      id: relationship.left.id,
      label: relationship.left.firstName,
    })
    nodes.push({
      id: relationship.right.id,
      label: relationship.right.firstName,
    })
  })
  return uniqBy(nodes, JSON.stringify)
}

const getEdges = (relationships) => {
  const edges = relationships.map((relationship) => {
    const leftId = Math.min(relationship.left.id, relationship.right.id)
    const rightId = Math.max(relationship.left.id, relationship.right.id)
    return {leftId, rightId}
  })

  return uniqBy(edges, JSON.stringify)
}

const uniqBy = (a, key) => {
  var seen = {};
  return a.filter(function(item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  })
}

export const relationships = async ({ id }: Prisma.RelationshipWhereUniqueInput) => {
  const lefts = await db.relationship.findMany({ where: { leftId: id }})
  const rights = await db.relationship.findMany({ where: { rightId: id }})
  return uniqBy([...lefts, ...rights], JSON.stringify)
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

