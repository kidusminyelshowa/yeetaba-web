import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Server-only Sanity client with write permissions.
// NEVER import this in client components or expose the token.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

if (!process.env.SANITY_WRITE_TOKEN) {
  console.warn(
    'Warning: SANITY_WRITE_TOKEN is not set. Write operations will fail.'
  )
}
