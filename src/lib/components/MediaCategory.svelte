<script lang="ts">
	import type { MediaCategory } from '$lib/types/mediaTypes';

	interface Props {
		category: MediaCategory;
		onclick?: () => void;
	}

	let { category, onclick }: Props = $props();
</script>

<div 
	class="media-category"
	role="button"
	tabindex="0"
	style="--category-color: {category.color || '#6366f1'}"
	onclick={onclick}
	onkeydown={(e) => e.key === 'Enter' && onclick?.()}
>
	<div class="category-icon">
		<span class="icon">{category.icon}</span>
	</div>
	<div class="category-content">
		<h3 class="category-title">{category.title}</h3>
		{#if category.description}
			<p class="category-description">{category.description}</p>
		{/if}
	</div>
</div>

<style>
	.media-category {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
		border: 1px solid transparent;
		min-height: 120px;
		position: relative;
		overflow: hidden;
	}

	.media-category::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--category-color);
	}

	.media-category:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border-color: var(--category-color);
	}

	.media-category:focus {
		outline: none;
		border-color: var(--category-color);
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
	}

	.category-icon {
		margin-bottom: 0.5rem;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--category-color), rgba(99, 102, 241, 0.8));
		border-radius: 50%;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.icon {
		font-size: 1.5rem;
		color: white;
	}

	.category-content {
		text-align: center;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.category-title {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
		line-height: 1.3;
	}

	.category-description {
		margin: 0;
		font-size: 0.75rem;
		color: #6b7280;
		line-height: 1.3;
	}

	@media (max-width: 768px) {
		.media-category {
			min-height: 110px;
			padding: 0.75rem;
		}

		.category-icon {
			width: 40px;
			height: 40px;
			margin-bottom: 0.4rem;
		}

		.icon {
			font-size: 1.25rem;
		}

		.category-title {
			font-size: 0.9rem;
		}

		.category-description {
			font-size: 0.7rem;
		}
	}
</style>