<script lang="ts">
import type { MediaCategory } from '$lib/types/mediaTypes';

export let categories: MediaCategory[] = [];
export let selectedId: string | null = null;
export let onSelect: (media:MediaCategory) => void = () => {};
</script>

<nav class="vertical-category-list">
  {#each categories as cat}
    <button
      class:selected={cat.id === selectedId}
      on:click={() => onSelect(cat)}
      aria-label={cat.title}
    >
      {#if cat.imageUrl}
        <img src={cat.imageUrl} alt={cat.title} class="cat-thumb" />
      {:else}
        <span class="cat-icon">{cat.icon}</span>
      {/if}
      <span class="cat-title">{cat.title}</span>
    </button>
  {/each}
</nav>

<style>
.vertical-category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  min-width: 140px;
  background: var(--sidebar-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--card-shadow);
  backdrop-filter: blur(10px);
}
.vertical-category-list button {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  color: var(--text-primary);
}
.vertical-category-list button:hover {
  background: var(--selected-bg);
  transform: translateX(4px);
}
.vertical-category-list button.selected {
  background: var(--selected-bg);
  font-weight: 600;
}
.cat-thumb {
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 6px;
}
.cat-icon {
  font-size: 1.4rem;
}
.cat-title {
  white-space: normal;
  word-break: break-word;
  max-width: 90px;
  overflow-wrap: anywhere;
  text-align: left;
}
</style>
