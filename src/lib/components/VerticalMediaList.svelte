<script lang="ts">
import type { MediaCategory } from '$lib/types/mediaTypes';
export let medias: MediaCategory[] = [];
</script>

<div class="vertical-media-list">
  {#each medias as media}
    <div class="media-card">
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  padding: 0.5rem 0;
  width: 100%;
}
.media-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  min-height: 160px;
  transition: box-shadow 0.2s;
}
.media-card:hover {
  box-shadow: 0 6px 24px rgba(99,102,241,0.12);
}
.media-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
}
.media-icon {
  font-size: 2.5rem;
}
.media-title {
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  margin-top: 0.2rem;
  color: #312e81;
  word-break: break-word;
}
.media-desc {
  font-size: 0.95rem;
  color: #6b7280;
  text-align: center;
  margin-top: 0.2rem;
}
@media (max-width: 768px) {
  .vertical-media-list {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.7rem;
  }
  .media-card {
    padding: 0.7rem;
    min-height: 120px;
  }
  .media-thumb {
    width: 56px;
    height: 56px;
  }
  .media-icon {
    font-size: 2rem;
  }
  .media-title {
    font-size: 1rem;
  }
  .media-desc {
    font-size: 0.85rem;
  }
}
</style>
