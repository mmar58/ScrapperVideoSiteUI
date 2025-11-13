<script lang="ts">
	import VerticalCategoryList from '$lib/components/VerticalCategoryList.svelte';
	import VerticalMediaList from '$lib/components/VerticalMediaList.svelte';
	import { mediaCategories } from '$lib/data/categories';
	import type { MediaCategory } from '$lib/types/mediaTypes';
	import { pageTitle } from '$lib/config/pageInfo';
	import { socket, connectSocket, disconnectSocket } from '$lib/socket';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	const selectedCategoryId = writable<string | null>(null);
	const mediaList = writable<MediaCategory[]>([]);

	function handleCategorySelect(id: string) {
		selectedCategoryId.set(id);
		const category = mediaCategories.find(c => c.id === id);
		if (category && $socket) {
			$socket.emit('scrap', category.link);
			mediaList.set([]); // Clear previous media
		}
	}

	onMount(() => {
		connectSocket();
		if ($socket) {
			$socket.on('scrapedRow', (data: MediaCategory) => {
				mediaList.update(list => [...list, data]);
			});
		}
	});

	onDestroy(() => {
		disconnectSocket();
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content="Download movies, TV series, games, music, software, books and more from your favorite media downloader." />
</svelte:head>

<main class="main-container">
	<div class="layout-flex">
		<aside class="sidebar">
			<VerticalCategoryList
				categories={mediaCategories}
				bind:selectedId={$selectedCategoryId}
				onSelect={handleCategorySelect}
			/>
		</aside>
		<section class="content">
			<header class="hero-section">
				<h1 class="hero-title">{pageTitle}</h1>
				<p class="hero-subtitle">Your Ultimate Download Hub</p>
			</header>
			<VerticalMediaList medias={$mediaList} />
		</section>
	</div>
</main>

<style>
	.layout-flex {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		min-height: 70vh;
	}
	.sidebar {
		min-width: 140px;
		padding-top: 2rem;
	}
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	@media (max-width: 768px) {
		.layout-flex {
			flex-direction: column;
		}
		.sidebar {
			min-width: 100%;
			padding-top: 0.5rem;
		}
	}
</style>
