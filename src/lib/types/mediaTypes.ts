export interface MediaCategory {
	id: string;
	title: string;
	icon: string;
    imageUrl?: string;
	description?: string;
	color?: string;
	link?: string;
	date?: string;
}
export interface MediaDbEntry {
	link: string;
	mediaList: MediaCategoryId[];
}
export type MediaCategoryId = 
	| 'hindi-movies'
	| 'english-movies'
	| 'series'
	| 'games'
	| 'music'
	| 'software'
	| 'books'
	| 'anime';