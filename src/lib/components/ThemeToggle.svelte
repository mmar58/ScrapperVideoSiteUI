<script lang="ts">
import { theme, toggleTheme } from '$lib/stores/theme';
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
  {#if $theme === 'light'}
    🌙
  {:else}
    ☀️
  {/if}
</button>

<style>
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--card-bg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;
}
.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
</style>
