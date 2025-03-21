export interface Book {
    id: string;
    title: string;
    image: string;
    authors: string[];
    categories: string[];
    rating?: number;
};