import { create } from 'zustand'
import { ProductInfo, StoreState } from './types'

export const useStore = create<StoreState>((set) => ({
  recentScans: [],
  setImage: (image: string) => set((state) => ({ ...state })),
  setProduct: (product: ProductInfo) =>
    set((state) => ({
      ...state,
      recentScans: [product, ...state.recentScans].slice(0, 10)
    }))
})) 