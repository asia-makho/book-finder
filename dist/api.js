export async function fetchBooks(query) {
    const formattedQuery = query.split(' ').join('+');
    const url = `https://openlibrary.org/search.json?q=${formattedQuery}&fields=title,author_name,first_publish_year,cover_i&limit=5`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Помилка запиту: ' + response.status);
    }
    const data = await response.json();
    return data;
}
