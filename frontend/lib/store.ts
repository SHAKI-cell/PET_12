import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data";

// --- Favorites Store (persisted) ---
interface FavoritesState {
  favoriteIds: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      add: (id) =>
        set((s) => ({
          favoriteIds: s.favoriteIds.includes(id)
            ? s.favoriteIds
            : [...s.favoriteIds, id],
        })),
      remove: (id) =>
        set((s) => ({
          favoriteIds: s.favoriteIds.filter((fid) => fid !== id),
        })),
      toggle: (id) => {
        const { favoriteIds } = get();
        if (favoriteIds.includes(id)) {
          set({ favoriteIds: favoriteIds.filter((fid) => fid !== id) });
        } else {
          set({ favoriteIds: [...favoriteIds, id] });
        }
      },
      isFavorite: (id) => get().favoriteIds.includes(id),
      clear: () => set({ favoriteIds: [] }),
    }),
    { name: "dofo-favorites" }
  )
);

// --- Cart Store (persisted) ---
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((s) => {
          const existing = s.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...s.items, { product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => i.product.id !== productId)
              : s.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "dofo-cart" }
  )
);

// --- Listing Draft Store (persisted) ---
interface ListingDraftState {
  currentStep: number;
  basicInfo: {
    name: string;
    breed: string;
    species: string;
    age: number;
    gender: string;
    description: string;
  } | null;
  photos: string[];
  health: {
    vaccinated: boolean;
    spayed: boolean;
    healthNotes: string;
  } | null;
  location: {
    address: string;
    city: string;
    state: string;
  } | null;
  setStep: (step: number) => void;
  setBasicInfo: (info: ListingDraftState["basicInfo"]) => void;
  setPhotos: (photos: string[]) => void;
  setHealth: (health: ListingDraftState["health"]) => void;
  setLocation: (location: ListingDraftState["location"]) => void;
  resetDraft: () => void;
}

export const useListingDraftStore = create<ListingDraftState>()(
  persist(
    (set) => ({
      currentStep: 1,
      basicInfo: null,
      photos: [],
      health: null,
      location: null,
      setStep: (step) => set({ currentStep: step }),
      setBasicInfo: (info) => set({ basicInfo: info }),
      setPhotos: (photos) => set({ photos }),
      setHealth: (health) => set({ health }),
      setLocation: (location) => set({ location }),
      resetDraft: () =>
        set({
          currentStep: 1,
          basicInfo: null,
          photos: [],
          health: null,
          location: null,
        }),
    }),
    { name: "dofo-listing-draft" }
  )
);

// --- Auth Store (NOT persisted) ---
interface AuthState {
  user: { id: string; name: string; email: string; role: "adopter" | "lister" } | null;
  isAuthenticated: boolean;
  login: (user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// --- UI Store (NOT persisted) ---
interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  activeModal: null,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
}));
