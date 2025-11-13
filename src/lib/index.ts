// place files you want to import through the `$lib` alias in this directory.

// Components
export { default as MediaCategory } from './components/MediaCategory.svelte';
export { default as CategoryGrid } from './components/CategoryGrid.svelte';
export { default as VerticalCategoryList } from './components/VerticalCategoryList.svelte';
export { default as VerticalMediaList } from './components/VerticalMediaList.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';

// Types
export type { MediaCategory as MediaCategoryType, MediaCategoryId } from './types/mediaTypes';

// Data
export { mediaCategories, getCategoryById, getCategoriesByIds } from './data/categories';

// Stores
export { theme, toggleTheme } from './stores/theme';
export type { Theme } from './stores/theme';
