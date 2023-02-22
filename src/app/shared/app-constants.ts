export class AppConstants {
    public static get starWarsCharactersBaseURL(): string {
        return 'https://swapi.dev/api/people';
    }
    public static get favoriteStarWarsCharactersLocalStorageKey(): string {
        return 'favoriteStarWarsCharacters';
    }
}
