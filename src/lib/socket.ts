import { io, Socket } from 'socket.io-client';
import { writable, type Writable } from 'svelte/store';

// You can change this URL to your backend server
const SOCKET_URL = 'http://localhost:3081';

export const socket: Writable<Socket | null> = writable(null);
export function connectSocket(options?: Parameters<typeof io>[1]) {
	const s = io(SOCKET_URL, options);
	socket.set(s);
	return s;
}

export function disconnectSocket() {
	socket.update(s => {
		if (s) s.disconnect();
		return null;
	});
}
