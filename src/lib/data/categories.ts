import type { MediaCategory } from '$lib/types/mediaTypes';

export const mediaCategories: MediaCategory[] = [
	{
		id: 'hindi-movies',
		title: 'Hindi Movies',
		icon: '🎬',
		description: 'Latest Bollywood movies and classics',
		color: '#ef4444',
		href: 'http://172.16.50.14/DHAKA-FLIX-14/Hindi%20Movies/'
	},
	{
		id: 'english-movies',
		title: 'English Movies',
		icon: '🎭',
		description: 'Hollywood blockbusters and indie films',
		color: '#3b82f6',
		href: 'http://172.16.50.7/DHAKA-FLIX-7/English%20Movies/'
	},
	{
		id: 'series',
		title: 'TV Series',
		icon: '📺',
		description: 'Popular web series and TV shows',
		color: '#10b981',
		href: 'http://172.16.50.12/DHAKA-FLIX-12/TV-WEB-Series/'
	},
	{
		id: 'games',
		title: 'Games',
		icon: '🎮',
		description: 'PC games, mobile apps and console games',
		color: '#f59e0b',
		href: 'http://172.16.50.8/DHAKA-FLIX-8/PC%20Games/'
	},
	{
		id: 'music',
		title: 'Music',
		icon: '🎵',
		description: 'Songs, albums and music videos',
		color: '#8b5cf6',
		href: '/music'
	},
	{
		id: 'software',
		title: 'Software',
		icon: '💻',
		description: 'Applications, tools and utilities',
		color: '#06b6d4',
		href: '/software'
	},
	{
		id: 'books',
		title: 'Books',
		icon: '📚',
		description: 'eBooks, audiobooks and magazines',
		color: '#84cc16',
		href: '/books'
	},
	{
		id: 'anime',
		title: 'Anime',
		icon: '🎌',
		description: 'Japanese anime series and movies',
		color: '#ec4899',
		href: '/anime'
	}
];

export function getCategoryById(id: string): MediaCategory | undefined {
	return mediaCategories.find(category => category.id === id);
}

export function getCategoriesByIds(ids: string[]): MediaCategory[] {
	return ids.map(id => getCategoryById(id)).filter(Boolean) as MediaCategory[];
}