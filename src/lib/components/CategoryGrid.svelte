<script lang="ts">
	import MediaCategory from './MediaCategory.svelte';
	import type { MediaCategory as MediaCategoryType } from '$lib/types/mediaTypes';

	interface Props {
		categories: MediaCategoryType[];
		title?: string;
		onCategoryClick?: (category: MediaCategoryType) => void;
	}

	let { categories, title, onCategoryClick }: Props = $props();

	function handleCategoryClick(category: MediaCategoryType) {
		if (onCategoryClick) {
			onCategoryClick(category);
		} else if (category.link) {
			window.location.href = category.link;
		}
	}
</script>

<section class="category-grid-section">
	{#if title}
		<h2 class="section-title">{title}</h2>
	{/if}
	
	<div class="category-grid">
		{#each categories as category (category.id)}
			<MediaCategory 
				{category} 
				onclick={() => handleCategoryClick(category)}
			/>
		{/each}
	</div>
</section>

<style>
	.category-grid-section {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 1.5rem;
	}

	.section-title {
		text-align: center;
		margin: 0 0 1.5rem 0;
		font-size: 1.75rem;
		font-weight: 700;
		color: #1f2937;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		justify-items: stretch;
	}

	@media (max-width: 768px) {
		.category-grid-section {
			padding: 0.75rem 1rem;
		}

		.section-title {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}

		.category-grid {
			grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
			gap: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.category-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}

		.section-title {
			font-size: 1.25rem;
		}
	}
</style>