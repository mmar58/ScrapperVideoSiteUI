import type { MediaDbEntry } from "$lib/types/mediaTypes";
import { writable } from "svelte/store";

export const videoDb = writable<MediaDbEntry[]>([]);