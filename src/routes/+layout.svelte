<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		document.documentElement.setAttribute('data-theme', $theme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeToggle />
{@render children()}

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global([data-theme='light']) {
		--bg-gradient-start: #667eea;
		--bg-gradient-end: #764ba2;
		--text-primary: #1f2937;
		--text-secondary: #6b7280;
		--card-bg: #ffffff;
		--card-shadow: rgba(0, 0, 0, 0.08);
		--sidebar-bg: rgba(255, 255, 255, 0.9);
		--selected-bg: #e0e7ff;
		--hover-shadow: rgba(99, 102, 241, 0.12);
	}

	:global([data-theme='dark']) {
		--bg-gradient-start: #1e1b4b;
		--bg-gradient-end: #312e81;
		--text-primary: #f3f4f6;
		--text-secondary: #d1d5db;
		--card-bg: #1f2937;
		--card-shadow: rgba(0, 0, 0, 0.3);
		--sidebar-bg: rgba(31, 41, 55, 0.9);
		--selected-bg: #374151;
		--hover-shadow: rgba(139, 92, 246, 0.2);
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
		min-height: 100vh;
		color: var(--text-primary);
		transition: background 0.3s ease, color 0.3s ease;
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
		padding: 0.5rem 0;
	}

	:global(.hero-section) {
		text-align: center;
		padding: 0.75rem 1rem 0.5rem;
		max-width: 800px;
		margin: 0 auto;
	}

	:global(.hero-title) {
		margin: 0 0 0.25rem 0;
		font-size: 1.75rem;
		font-weight: 700;
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		line-height: 1.1;
	}

	:global(.hero-subtitle) {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
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
