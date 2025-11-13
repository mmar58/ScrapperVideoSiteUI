<script lang="ts">
import type { MediaCategory } from '$lib/types/mediaTypes';

export let categories: MediaCategory[] = [];
export let selectedId: string | null = null;
export let onSelect: (id: string) => void = () => {};
</script>

<nav class="vertical-category-list">
  {#each categories as cat}
    <button
      class:selected={cat.id === selectedId}
      on:click={() => onSelect(cat.id)}
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
  padding: 0.5rem 0.5rem 0.5rem 0;
  min-width: 120px;
  background: rgba(255,255,255,0.85);
  border-radius: 8px;
}
.vertical-category-list button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.vertical-category-list button.selected {
  background: #e0e7ff;
  font-weight: bold;
}
.cat-thumb {
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 4px;
}
.cat-icon {
  font-size: 1.5rem;
}
.cat-title {
  white-space: normal;
  word-break: break-word;
  max-width: 90px;
  overflow-wrap: anywhere;
}
</style>
