
![BookHunt Logo](/public/logo.svg)  
# BookHunt - Version 1.0 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Overview
BookHunt is a simple Angular application that allows users to search for books using the Google Books API. This first release includes basic functionality to search and display book results.

## Features
- **Search functionality**: Users can search for books by title, author, or keywords
- **Book display**: Results are displayed as cards with cover images and basic information
- **Responsive design**: Works on desktop and mobile devices

## Installation

### Prerequisites
- Node.js: Version 18.19.1 or newer is required2.
- Angular CLI: Install the latest version of Angular CLI using npm install -g @angular/cli.
- TypeScript: Version 5.5.0 or newer.
- RxJS: Version 6.5.3 or newer.
- Text Editor: A code editor like Visual Studio Code is recommended.
- Browser: A modern browser that supports Angular's features.
- Google Books API key (free tier available)
  
### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bookhunt.git
   cd bookhunt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create `src\environments\environment.ts`
   - Add your Google Books API key:
     ```typescript
     export const environment = {
        production: false,
        apiUrl: 'https://www.googleapis.com/books/v1/volumes',
        apiKey: 'your-development-api-key', // Replace with your develomenent API key
      };
     ```

4. Run the development server:
   ```bash
   ng serve
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

## Project Structure
```
public/
src/
├── app/
|   ├── admin/
|   ├── models/
|   │       └── book.model.ts
|   ├── shared/
|   │      └── book.service.ts
│   └── user/
│       ├── book/
│       ├── book-list/
│       ├── navbar/
│       └── search-bar/
└── environments/
    └── environment.prod.ts
```

## Components

### Header Component
- Displays the application logo
- Simple navigation bar (placeholder for future features)

### Search Bar Component
- Input field for book searches
- Search button to trigger API requests
- Basic validation to prevent empty queries

### Book List Component
- Displays search results in a responsive grid

### Book Component
- Displays individual book information:
  - Cover image (with placeholder for missing images)
  - Title
  - Author(s)
  - Book Pages (if available)
  - Publication year (if available)

## Service

### Book Service
- Handles API communication with Google Books
- Transforms API responses into consistent Book objects
- Manages search state and results

## Known Limitations (Version 1.0)
- Basic search functionality only (no advanced filters)
- Simple pagination (shows first 10 results only)
- No persistent state (search results are lost on page refresh)
- Basic error handling

## Future Improvements
- Add pagination for browsing more results
- Implement book details view
- Add favorites/bookmark functionality
- Improve search filters (by author, category, etc.)
- Add user authentication

*BookHunt v1.0 - Initial Release*  
*Maria Foteini Troupi - 25/03/2025*

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
