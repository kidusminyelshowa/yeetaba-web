import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { service } from './service'
import { inquiry } from './inquiry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, service, inquiry],
}
