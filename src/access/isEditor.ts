import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type Role = 'admin' | 'editeur' | 'auteur'

/** Lit le rôle de manière sûre, le type est ajouté en Phase 3. */
const roleOf = (user: User | null | undefined): Role | undefined => {
  return (user as User & { role?: Role })?.role
}

/** Au moins éditeur (éditeur ou admin). */
export const isEditor = ({ req: { user } }: AccessArgs<User>): boolean => {
  const r = roleOf(user)
  return r === 'admin' || r === 'editeur'
}

/** Administrateur uniquement. */
export const isAdmin = ({ req: { user } }: AccessArgs<User>): boolean => {
  return roleOf(user) === 'admin'
}
