<script lang="ts">
import type { MediaCategory } from '$lib/types/mediaTypes';

export let medias: MediaCategory[] = [];
</script>

<div class="horizontal-media-list">
  {#each medias as media}
    <div class="media-card">
      {#if media.imageUrl}
        <img src={media.imageUrl} alt={media.title} class="media-thumb" />
      {:else}
        <span class="media-icon">{media.icon}</span>
      {/if}
      <div class="media-title">{media.title}</div>
    </div>
  {/each}
</div>

<style>
.horizontal-media-list {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}
.media-card {
  min-width: 120px;
  max-width: 160px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 0.4rem;
}
.media-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
}
.media-icon {
  font-size: 2rem;
}
.media-title {
  font-size: 0.95rem;
  text-align: center;
  margin-top: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
