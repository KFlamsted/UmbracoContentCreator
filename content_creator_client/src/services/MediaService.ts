export interface IUmbracoMediaResponse<TProperties = Record<string, unknown>> {
  total: number
  items: IUmbracoMediaItem<TProperties>[]
}

export interface IUmbracoMediaItem<TProperties = Record<string, unknown>> {
  id: string
  name: string
  mediaType: string
  url: string
  extension: string
  width?: number
  height?: number
  bytes: number
  properties: TProperties
  createDate: string
  updateDate: string
}

export const executeMediaApiQuery = async <TProperties = Record<string, unknown>>(
  params?: {
    mediaType?: string
    id?: string
    filter?: string
    sort?: string
    skip?: number
    take?: number
  }
): Promise<IUmbracoMediaResponse<TProperties>> => {
  const apiUrl = import.meta.env.VITE_API_URL
  const searchParams = new URLSearchParams()

  if (params?.mediaType) {
    searchParams.append('filter', `mediaType:${params.mediaType}`)
  }
  if (params?.filter) {
    searchParams.append('filter', params.filter)
  }
  if (params?.sort) {
    searchParams.append('sort', params.sort)
  }
  if (params?.skip) {
    searchParams.append('skip', params.skip.toString())
  }
  if (params?.take) {
    searchParams.append('take', params.take.toString())
  }

  const queryString = searchParams.toString()
  const url = `${apiUrl}/umbraco/delivery/api/v2/media${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: IUmbracoMediaResponse<TProperties> = await response.json()
  return result
}

export const fetchMediaById = async <TProperties = Record<string, unknown>>(
  id: string
): Promise<IUmbracoMediaItem<TProperties> | null> => {
  const apiUrl = import.meta.env.VITE_API_URL
  
  const response = await fetch(`${apiUrl}/umbraco/delivery/api/v2/media/item/${id}`)

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: IUmbracoMediaItem<TProperties> = await response.json()
  return result
}

export const fetchMediaByType = async <TProperties = Record<string, unknown>>(
  mediaType: string,
  options?: {
    sort?: string
    skip?: number
    take?: number
  }
): Promise<IUmbracoMediaResponse<TProperties>> => {
  return executeMediaApiQuery<TProperties>({
    mediaType,
    ...options
  })
}

export const fetchImageMedia = async <TProperties = Record<string, unknown>>(
  options?: {
    sort?: string
    skip?: number
    take?: number
  }
): Promise<IUmbracoMediaResponse<TProperties>> => {
  return executeMediaApiQuery<TProperties>({
    filter: 'mediaType:Image',
    ...options
  })
}
