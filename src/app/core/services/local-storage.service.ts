import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    getItem<T>(key: string): T | void {
        if (isPlatformBrowser(this.platformId)) {
            const stringFromLocalStorage = localStorage.getItem(key);
            if (stringFromLocalStorage) {
                return JSON.parse(stringFromLocalStorage);
            }
        } else {
            // TODO: make alternative if server-side rendering is used (like Angular Universal)
            throw new Error('Local storage is not available!');
        }
    }

    removeItem(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        } else {
            // TODO: make alternative if server-side rendering is used (like Angular Universal)
            throw new Error('Local storage is not available!');
        }
    }

    setItem<T>(key: string, data: T): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            // TODO: make alternative if server-side rendering is used (like Angular Universal)
            throw new Error('Local storage is not available!');
        }
    }
}
