// place files you want to import through the `$lib` alias in this directory.

// Components
export { default as MediaCategory } from './components/MediaCategory.svelte';
export { default as CategoryGrid } from './components/CategoryGrid.svelte';

// Types
export type { MediaCategory as MediaCategoryType, MediaCategoryId } from './types/mediaTypes';

// Data
export { mediaCategories, getCategoryById, getCategoriesByIds } from './data/categories';
