export interface Book {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
}

export interface SearchResponse {
    docs: Book[];
}