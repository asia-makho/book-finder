import { SearchResponse } from './types.js';

export async function fetchBooks(query: string): Promise<SearchResponse> {
    const formattedQuery: string = query.split(' ').join('+');
    const url: string = `https://openlibrary.org/search.json?q=${formattedQuery}&fields=title,author_name,first_publish_year,cover_i&limit=5`;

    const response: Response = await fetch(url);

    if (!response.ok) {
        throw new Error('Помилка запиту: ' + response.status);
    }

    const data: SearchResponse = await response.json();
    return data;
}