/*---------------------------------------------------------------------------------------------
 *  Alkahest Editor Bridge
 *  Intercepts high-level editor operations and forwards them to the Rust
 *  `alkahest-editor` / `alkahest-text` crates via Tauri IPC.
 *--------------------------------------------------------------------------------------------*/

import { invoke } from '../../../alkahest-bridge.js';

export class AlkahestEditorBridge {
	private static instance: AlkahestEditorBridge;

	static getInstance(): AlkahestEditorBridge {
		if (!AlkahestEditorBridge.instance) {
			AlkahestEditorBridge.instance = new AlkahestEditorBridge();
		}
		return AlkahestEditorBridge.instance;
	}

	// --- File operations (alkahest-text) ---

	async readFile(path: string): Promise<string> {
		return invoke<string>('read_file', { path });
	}

	async writeFile(path: string, content: string): Promise<void> {
		return invoke<void>('write_file', { path, content });
	}

	// --- Language detection (alkahest-syntax) ---

	async detectLanguage(filename: string): Promise<string> {
		try {
			return await invoke<string>('syntax_detect_language', { filename });
		} catch {
			return 'plaintext';
		}
	}

	// --- Git status (alkahest-git) ---

	async getGitStatus(repoRoot: string): Promise<any> {
		return invoke('git_status', { repoRoot });
	}

	// --- Search (alkahest-workspace) ---

	async searchInFiles(dir: string, query: string): Promise<any> {
		return invoke('search_text', { dir, query });
	}

	// --- Settings (alkahest-settings) ---

	async getSettings(section?: string): Promise<any> {
		return invoke('settings_get', { section: section ?? null });
	}

	// --- Theme (alkahest-theme) ---

	async getThemeList(): Promise<any[]> {
		return (await invoke<any[]>('theme_list')) ?? [];
	}

	async getThemeData(id: string): Promise<any> {
		return invoke('theme_get', { id });
	}
}
