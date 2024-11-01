import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

// Экспортируйте тип `AppDispatch` для использования в компонентах
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
