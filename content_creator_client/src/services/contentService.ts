import type { HomePage } from '../models/HomePage'

interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

const executeGraphQLQuery = async <T>(query: string): Promise<T> => {
  const apiUrl = import.meta.env.VITE_API_URL
  
  const response = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result: GraphQLResponse<T> = await response.json()
  
  if (result.errors) {
    throw new Error(`GraphQL error: ${result.errors.map(e => e.message).join(', ')}`)
  }
  
  if (!result.data) {
    throw new Error('No data returned from GraphQL query')
  }
  
  return result.data
}

interface ContentByRouteResponse {
  contentByRoute: {
    properties: {
      pageTitle?: { value: string }
      bodyText?: { value: string }
      footerText?: { value: string }
    }
  }
}

export const fetchContentByRoute = async <T>(route: string, contentType: string): Promise<T> => {
  const query = `{ 
    contentByRoute(route: "${route}") { 
      properties {
        ... on ${contentType} { 
          pageTitle { value } 
          bodyText { value }
          footerText { value } 
        }
      }
    }
  }`
  
  const result = await executeGraphQLQuery<ContentByRouteResponse>(query)
  
  const properties = result.contentByRoute?.properties
  if (!properties) {
    throw new Error('Content not found')
  }
  
  return {
    pageTitle: properties.pageTitle?.value,
    bodyText: properties.bodyText?.value,
    footerText: properties.footerText?.value
  } as T
}

export const fetchHomePage = async (): Promise<HomePage> => {
  return fetchContentByRoute<HomePage>('/home', 'HomePage')
}
