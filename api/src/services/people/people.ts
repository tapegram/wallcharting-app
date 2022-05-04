import type { Prisma } from '@prisma/client'
import { validate } from '@redwoodjs/api'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const relationshipsGraph = async () => {
  const relationships = await db.relationship.findMany({
    include: {
      left: true,
      right: true,
      category: true,
    },
  })

  const nodes = getNodes(relationships)
  const edges = getEdges(relationships)

  return { nodes, edges }
}
const getCountEdges = (nodeId, relationships) => {
  return relationships.reduce((cur, relationship) => {
    const left = relationship.left.id === nodeId ? 1 : 0
    const right = relationship.right.id === nodeId ? 1 : 0
    return cur + left + right
  }, 0)
}
const getColor = (edgeNo) => {
  return edgeNo > 2 ? 'red' : 'blue'
}
const getNodes = (relationships) => {
  const nodes = []
  relationships.forEach((relationship) => {
    nodes.push({
      id: relationship.left.id,
      color: getColor(getCountEdges(relationship.left.id, relationships)),
      label: relationship.left.lastName + ', ' + relationship.left.firstName,
    })
    nodes.push({
      id: relationship.right.id,
      color: getColor(getCountEdges(relationship.right.id, relationships)),
      label: relationship.right.lastName + ', ' + relationship.right.firstName,
    })
  })
  return uniqBy(nodes, JSON.stringify)
}

const getEdges = (relationships) => {
  const edges = relationships.map((relationship) => {
    const leftId = Math.min(relationship.left.id, relationship.right.id)
    const rightId = Math.max(relationship.left.id, relationship.right.id)
    return { leftId, rightId, category: relationship.category.name }
  })

  return uniqBy(edges, JSON.stringify)
}

const uniqBy = (a, key) => {
  const seen = {}
  return a.filter(function (item) {
    const k = key(item)
    return seen.hasOwnProperty(k) ? false : (seen[k] = true)
  })
}

export const relationships = async ({ personId }) => {
  const lefts = await db.relationship.findMany({ where: { leftId: personId } })
  const rights = await db.relationship.findMany({
    where: { rightId: personId },
  })
  return uniqBy(lefts.concat(rights), JSON.stringify)
}

export const createRelationship = async ({ input }) => {
  const leftSide = await db.relationship.findFirst({
    where: { leftId: input.leftId, rightId: input.rightId },
  })
  const rightSide = await db.relationship.findFirst({
    where: { leftId: input.rightId, rightId: input.leftId },
  })
  validate(!!leftSide || !!rightSide, {
    acceptance: { in: [false], message: 'Relationship already exists' },
  })
  const category = await db.relationshipCategory.findFirst({
    where: { name: input.category },
  })
  const realInput = toCreateRelationshipInput(input)

  return db.relationship.create({
    data: { categoryId: category.id, ...realInput },
  })
}

export const toCreateRelationshipInput = ({ category, ...rest }) => rest

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
  left: (_obj, { root }: ResolverArgs<ReturnType<typeof person>>) =>
    db.relationship.findUnique({ where: { id: root.id } }).left(),
  right: (_obj, { root }: ResolverArgs<ReturnType<typeof person>>) =>
    db.relationship.findUnique({ where: { id: root.id } }).right(),
}

export const deleteRelationship = ({ id }) => {
  return db.relationship.delete({
    where: { id },
  })
}
