// TODO: Define proper block content structure when blocks are actually used
export interface IUmbracoBlock {
  contentUdi: string
  settingsUdi?: string
  content: {
    contentType: string
    properties: Record<string, unknown>
  }
  settings?: {
    contentType: string
    properties: Record<string, unknown>
  }
}

// TODO: Define proper culture structure based on Umbraco's multi-language setup
export interface IUmbracoCultures {
  [key: string]: unknown
}

export interface IUmbracoRoute {
  path: string
  startItem: {
    id: string
    path: string
  }
}

export interface IUmbracoItem {
  contentType: string
  name: string
  createDate: string
  updateDate: string
  route: IUmbracoRoute
  id: string
  properties: {
    pageTitle?: string
    bodyText?: {
      markup: string
      blocks: IUmbracoBlock[]
    }
    footerText?: string
    // TODO: Add other property types as they are discovered/needed
    [key: string]: unknown
  }
  cultures: IUmbracoCultures
}

export interface IUmbracoContentResponse {
  total: number
  items: IUmbracoItem[]
}
