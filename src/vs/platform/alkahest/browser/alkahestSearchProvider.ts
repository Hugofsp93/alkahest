/*---------------------------------------------------------------------------------------------
 *  Alkahest — Search provider backed by our Rust ripgrep integration.
 *  Provides a lightweight API for components that need search results without
 *  going through the full VS Code ISearchService machinery.
 *
 *  Registration note: VS Code's ISearchService is already provided by
 *  `TauriSearchService` (see services/search/browser/tauriSearchService.ts).
 *  This bridge complements it via its own decorator IAlkahestSearchProviderService
 *  for components that want the simpler string-based API.
 *--------------------------------------------------------------------------------------------*/

import { invoke } from '../../../alkahest-bridge.js';
import { createDecorator } from '../../instantiation/common/instantiation.js';
import { InstantiationType, registerSingleton } from '../../instantiation/common/extensions.js';

export interface FileSearchResult {
	path: string;
	matches: Array<{
		lineNumber: number;
		lineText: string;
		matchStart: number;
		matchEnd: number;
	}>;
}

export const IAlkahestSearchProviderService = createDecorator<IAlkahestSearchProviderService>('alkahestSearchProviderService');

export interface IAlkahestSearchProviderService extends AlkahestSearchProvider {
	readonly _serviceBrand: undefined;
}

export class AlkahestSearchProvider {
	declare readonly _serviceBrand: undefined;
	async textSearch(
		directory: string,
		query: string,
		options: {
			caseSensitive?: boolean;
			wholeWord?: boolean;
			regex?: boolean;
			include?: string;
			exclude?: string;
			maxResults?: number;
		} = {}
	): Promise<FileSearchResult[]> {
		try {
			const results = await invoke('search_text', {
				dir: directory,
				query,
				caseSensitive: options.caseSensitive ?? false,
				wholeWord: options.wholeWord ?? false,
				regex: options.regex ?? false,
				include: options.include ?? '',
				exclude: options.exclude ?? '',
				maxResults: options.maxResults ?? 2000
			});
			return (results as FileSearchResult[]) || [];
		} catch (e) {
			console.error('[Alkahest] Search failed:', e);
			return [];
		}
	}

	async fileSearch(directory: string, pattern: string): Promise<string[]> {
		try {
			const results = await invoke('search_files', { dir: directory, pattern });
			return (results as string[]) || [];
		} catch {
			return [];
		}
	}
}

registerSingleton(IAlkahestSearchProviderService, AlkahestSearchProvider, InstantiationType.Delayed);
