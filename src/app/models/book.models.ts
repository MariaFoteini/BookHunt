
export interface Book {
    id: string;
    language: string;
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    images: bookImages;
    categories: string[];
    description: string;
    textSnippet: string;
    publishedDate: string;
    pageCount: number;
    previewLink: string;
    buyLink: string;
    retailPrice: number;
    currencyCode: string;

};

export interface bookImages {
    small: string,
    medium?: string,
    large?: string,
    extraLarge?: string,
    thumbnail?: string,
}

