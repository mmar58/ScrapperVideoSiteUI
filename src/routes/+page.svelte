<script lang="ts">
	import CategoryGrid from '$lib/components/CategoryGrid.svelte';
	import { mediaCategories } from '$lib/data/categories';
	import type { MediaCategory } from '$lib/types/mediaTypes';
    import { pageTitle } from '$lib/config/pageInfo';
    import { socket, connectSocket, disconnectSocket } from '$lib/socket';
    import { onMount, onDestroy } from 'svelte';
	function handleCategoryClick(category: MediaCategory) {
		console.log('Category clicked:', category);
        $socket?.emit("scrap", category.href);
		// You can add navigation logic here
		// For now, just log the click
	}
    $socket?.on("scrapedRow", (data) => {
        console.log("Scraped Row:", data);
    });
    onMount(() => {
        connectSocket();
    });
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content="Download movies, TV series, games, music, software, books and more from your favorite media downloader." />
</svelte:head>

<main class="main-container">
	<header class="hero-section">
		<h1 class="hero-title">{pageTitle}</h1>
		<p class="hero-subtitle">Your Ultimate Download Hub</p>
		<!-- <p class="hero-description">
			Discover and download your favorite content across multiple categories. 
			From the latest movies to trending series, games, and more.
		</p> -->
	</header>

	<CategoryGrid 
		categories={mediaCategories} 
		title="Browse Categories"
		onCategoryClick={handleCategoryClick}
	/>
</main>
