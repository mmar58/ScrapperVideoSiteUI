<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		color: #1f2937;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		font-family: inherit;
	}

	:global(.main-container) {
		min-height: 100vh;
		padding: 1rem 0;
	}

	:global(.hero-section) {
		text-align: center;
		padding: 1.5rem 1.5rem 1rem;
		max-width: 800px;
		margin: 0 auto;
	}

	:global(.hero-title) {
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 800;
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		line-height: 1.2;
	}

	:global(.hero-subtitle) {
		margin: 0 0 0.75rem 0;
		font-size: 1.2rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
	}

	:global(.hero-description) {
		margin: 0 0 1rem 0;
		font-size: 0.95rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.8);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		:global(.hero-section) {
			padding: 1.25rem 1rem 0.75rem;
		}

		:global(.hero-title) {
			font-size: 2rem;
		}

		:global(.hero-subtitle) {
			font-size: 1.1rem;
		}

		:global(.hero-description) {
			font-size: 0.9rem;
		}

		:global(.main-container) {
			padding: 0.75rem 0;
		}
	}

	@media (max-width: 480px) {
		:global(.hero-title) {
			font-size: 1.75rem;
		}

		:global(.hero-subtitle) {
			font-size: 1rem;
		}
	}
</style>
