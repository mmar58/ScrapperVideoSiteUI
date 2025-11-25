<script lang="ts">
import type { MediaCategory } from '$lib/types/mediaTypes';
export let medias: MediaCategory[] = [];
export let onSelect: (media: MediaCategory) => void = () => {};
</script>

<div class="vertical-media-list">
  {#each medias as media}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="media-card" on:click={() => {onSelect(media);console.log('Media selected:', media);}}>
      {#if media.filesCount}
        <span class="item-count">{media.filesCount}</span>
      {/if}
      {#if media.imageUrl}
        <img src={media.imageUrl} alt={media.title} class="media-thumb" />
      {:else}
        <span class="media-icon">{media.icon}</span>
      {/if}
      <div class="media-title">{media.title}</div>
      {#if media.description}
        <div class="media-desc">{media.description}</div>
      {/if}
    </div>
  {/each}
</div>

<style>
.vertical-media-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 0.5rem 0;
  width: 100%;
}
.media-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  min-height: 160px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}
.media-card:hover {
  box-shadow: 0 6px 24px var(--hover-shadow);
  transform: translateY(-4px);
}
.media-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.media-icon {
  font-size: 2.5rem;
}
.media-title {
  font-size: 1rem;
  text-align: center;
  font-weight: 600;
  margin-top: 0.2rem;
  color: var(--text-primary);
  word-break: break-word;
  line-height: 1.3;
}
.media-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 0.2rem;
  line-height: 1.4;
}
.item-count {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
@media (max-width: 768px) {
  .vertical-media-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }
  .media-card {
    padding: 0.75rem;
    min-height: 140px;
  }
  .media-thumb {
    width: 64px;
    height: 64px;
  }
  .media-icon {
    font-size: 2rem;
  }
  .media-title {
    font-size: 0.9rem;
  }
  .media-desc {
    font-size: 0.8rem;
  }
}
</style>
