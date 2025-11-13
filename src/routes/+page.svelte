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
	
	let filterDate = '';
	let enableDateFilter = false;
	let searchText = '';

	function handleCategorySelect(id: string) {
		selectedCategoryId.set(id);
		const category = mediaCategories.find(c => c.id === id);
		if (category && $socket) {
			$socket.emit('scrap', category.link);
			mediaList.set([]); // Clear previous media
		}
	}

	function handleSearch() {
		console.log('Search clicked:', { filterDate, enableDateFilter, searchText });
		// Add your search logic here
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
	<div class="filter-bar">
		<div class="filter-group">
			<label class="checkbox-label">
				<input type="checkbox" bind:checked={enableDateFilter} />
				<span>Enable Date Filter</span>
			</label>
			<input 
				type="date" 
				bind:value={filterDate} 
				disabled={!enableDateFilter}
				class="date-input"
			/>
		</div>
		<div class="filter-group">
			<input 
				type="text" 
				bind:value={searchText} 
				placeholder="Search..."
				class="text-input"
			/>
			<button on:click={handleSearch} class="search-btn">
				Search
			</button>
		</div>
	</div>
	
	<header class="hero-section">
		<h1 class="hero-title">{pageTitle}</h1>
		<p class="hero-subtitle">Your Ultimate Download Hub</p>
	</header>
	<div class="layout-flex">
		<aside class="sidebar">
			<VerticalCategoryList
				categories={mediaCategories}
				bind:selectedId={$selectedCategoryId}
				onSelect={handleCategorySelect}
			/>
		</aside>
		<section class="content">
			<VerticalMediaList medias={$mediaList} />
		</section>
	</div>
</main>

<style>
	.filter-bar {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: var(--sidebar-bg);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		margin: 0 1rem 1rem 1rem;
		box-shadow: 0 2px 8px var(--card-shadow);
		flex-wrap: wrap;
		align-items: center;
	}
	
	.filter-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	
	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		color: var(--text-primary);
		font-size: 0.9rem;
	}
	
	.checkbox-label input[type="checkbox"] {
		cursor: pointer;
		width: 16px;
		height: 16px;
	}
	
	.date-input,
	.text-input {
		padding: 0.5rem 0.75rem;
		border: 1px solid rgba(99, 102, 241, 0.3);
		border-radius: 6px;
		background: var(--card-bg);
		color: var(--text-primary);
		font-size: 0.9rem;
		transition: border-color 0.2s;
	}
	
	.date-input:focus,
	.text-input:focus {
		outline: none;
		border-color: rgba(99, 102, 241, 0.6);
	}
	
	.date-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.text-input {
		min-width: 200px;
	}
	
	.search-btn {
		padding: 0.5rem 1.25rem;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 0.2s;
	}
	
	.search-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
	}
	
	.search-btn:active {
		transform: translateY(0);
	}

	.layout-flex {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		min-height: 70vh;
		align-items: flex-start;
		padding: 0 1rem;
	}
	.sidebar {
		min-width: 160px;
		position: sticky;
		top: 1rem;
		align-self: flex-start;
	}
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 768px) {
		.filter-bar {
			margin: 0 0.5rem 0.75rem 0.5rem;
			padding: 0.75rem;
		}
		
		.filter-group {
			flex-wrap: wrap;
		}
		
		.text-input {
			min-width: 150px;
		}
		
		.layout-flex {
			flex-direction: column;
			align-items: stretch;
			padding: 0 0.5rem;
		}
		.sidebar {
			min-width: 100%;
			position: relative;
			top: 0;
		}
	}
</style>
