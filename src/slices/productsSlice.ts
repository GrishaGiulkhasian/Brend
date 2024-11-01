import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

// Интерфейс для товара
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

// Интерфейс состояния товаров
interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

// Асинхронный thunk для получения данных о товарах
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return (await response.json()) as Product[];
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Новый редюсер для фильтрации товаров
        filterProducts: (state, action: PayloadAction<string>) => {
            const searchTerm = action.payload.toLowerCase();
            state.items = state.items.filter((product) =>
                product.title.toLowerCase().includes(searchTerm)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

// Селекторы для состояния товаров
export const selectProducts = (state: RootState) => state.products.items;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;

// Экспорт редюсеров
export const { filterProducts } = productsSlice.actions;
export default productsSlice.reducer;
