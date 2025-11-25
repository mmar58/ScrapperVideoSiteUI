<script lang="ts">
	import VerticalCategoryList from '$lib/components/VerticalCategoryList.svelte';
	import VerticalMediaList from '$lib/components/VerticalMediaList.svelte';
	import { mediaCategories } from '$lib/data/categories';
	import type { MediaCategory,MediaDbEntry } from '$lib/types/mediaTypes';
	import { pageTitle } from '$lib/config/pageInfo';
	import { socket, connectSocket, disconnectSocket } from '$lib/socket';
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import {currentViewingUrl,videoDb} from "$lib/stores/videoDb"
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const selectedCategoryId = writable<string | null>(null);
	const mediaList = writable<MediaCategory[]>([]);
	
	let filterDate = '';
	let enableDateFilter = false;
	let searchText = '';

	// Update URL when navigating
	function updateURL(url: string) {
		const encodedUrl = encodeURIComponent(url);
		goto(`?url=${encodedUrl}`, { replaceState: false, keepFocus: true });
	}

	// Load state from URL
	function loadFromURL() {
		const urlParam = $page.url.searchParams.get('url');
		if (urlParam) {
			const decodedUrl = decodeURIComponent(urlParam);
			$currentViewingUrl = decodedUrl;
			// Trigger scraping for the URL from params
			if ($socket) {
				mediaList.set([]);
				$socket.emit('scrap', decodedUrl);
			}
		}
	}

	function handleCategorySelect(media : MediaCategory) {
		if (!media.link) return;
		$currentViewingUrl = media.link;
		mediaList.set([]); // Clear current media list
		updateURL(media.link); // Update browser URL
		$socket?.emit('scrap', media.link);
	}

	function handleSearch() {
		console.log('Search clicked:', { filterDate, enableDateFilter, searchText });
		// Add your search logic here
	}

	onMount(() => {
		connectSocket();
		
		// Wait for socket connection before loading from URL
		setTimeout(() => {
			loadFromURL();
		}, 100);
		
		if ($socket) {
			$socket.on('scrapeStarted', () => {
				mediaList.set([]); // Clear media list on new scrape start
				console.group('Scrape Started');
			});
			$socket.on('scrapeError', (errorMsg: string) => {
				// console.error('Scrape Error:', errorMsg);
			});
			$socket.on('scrapedRow', async(data: MediaCategory[]) => {
				console.log('Scraped row data:', data,Date.now());
				if(data.length>0){
					mediaList.update(list => {
						for(let mediaItem of data){
							let isContain = list.find(item => item.link === mediaItem.link);
							if(!isContain){
								list.push(mediaItem);
							}
							else{
								// Update existing item if needed
								Object.assign(isContain, mediaItem);
							}
						}
						return list;
					});
				}
				// if(data.length>0){
				// 	videoDb.update(db => {
				// 		let curDb = db.find(entry => entry.link === data[0].parentLink);
				// 		if(curDb){
				// 			for(let mediaItem of data){
				// 				let isContain = curDb.mediaList.find(item => item.link === mediaItem.link);
				// 				if(!isContain){
				// 					curDb!.mediaList.push(mediaItem);
				// 				}
				// 			}
				// 		}
				// 		else{
				// 			db.push({
				// 				link: data[0].parentLink!,
				// 				mediaList: data
				// 			});
				// 		}
				// 		return db;
				// 	});
				// }
			});
			$socket.on('scrapeCompleted', () => {
				console.log('Scraping complete');
				console.groupEnd();
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
	
	{#if $currentViewingUrl}
		<div class="breadcrumb-container">
			<button class="breadcrumb-home" on:click={() => {
				$currentViewingUrl = '';
				mediaList.set([]);
				goto('/', { replaceState: false });
			}}>
				🏠 Home
			</button>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current" title={$currentViewingUrl}>
				{decodeURIComponent($currentViewingUrl.split('/').filter(p => p).pop() || '')}
			</span>
			<button class="copy-url-btn" on:click={() => {
				navigator.clipboard.writeText(window.location.href);
			}} title="Copy current URL">
				📋
			</button>
		</div>
	{/if}
	
	<div class="layout-flex">
		<aside class="sidebar">
			<VerticalCategoryList
				categories={mediaCategories}
				bind:selectedId={$selectedCategoryId}
				onSelect={handleCategorySelect}
			/>
		</aside>
		<section class="content">
			<VerticalMediaList medias={$mediaList} onSelect={handleCategorySelect} />
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

	.breadcrumb-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		margin: 0 1rem 1rem 1rem;
		background: var(--card-bg);
		border-radius: 8px;
		box-shadow: 0 2px 8px var(--card-shadow);
		flex-wrap: wrap;
	}

	.breadcrumb-home {
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		color: white;
		border: none;
		padding: 0.4rem 0.75rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 600;
		transition: all 0.2s;
	}

	.breadcrumb-home:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
	}

	.breadcrumb-separator {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.breadcrumb-current {
		color: var(--text-primary);
		font-weight: 600;
		font-size: 0.9rem;
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.copy-url-btn {
		background: var(--card-bg);
		border: 1px solid rgba(99, 102, 241, 0.3);
		padding: 0.4rem 0.75rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s;
		margin-left: auto;
	}

	.copy-url-btn:hover {
		background: rgba(99, 102, 241, 0.1);
		border-color: rgba(99, 102, 241, 0.6);
		transform: translateY(-1px);
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

		.breadcrumb-container {
			margin: 0 0.5rem 0.75rem 0.5rem;
			padding: 0.5rem 0.75rem;
		}

		.breadcrumb-current {
			max-width: 150px;
			font-size: 0.85rem;
		}

		.copy-url-btn {
			padding: 0.3rem 0.6rem;
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
