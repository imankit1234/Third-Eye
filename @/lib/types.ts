export interface ProductInfo {
  name: string
  confidence: number
  price: {
    amazon?: number
    meesho?: number
    myntra?: number
  }
  links: {
    amazon?: string
    meesho?: string
    myntra?: string
  }
}

export interface StoreState {
  recentScans: ProductInfo[]
  setImage: (image: string) => void
  setProduct: (product: ProductInfo) => void
} 