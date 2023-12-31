# Frontend AppMasters React Project

<img src="./public/thumb.jpg" alt="App Masters React Project"><br>

Live preview: [gwebsurfer.github.io/projeto-frontend-appmasters](https://gwebsurfer.github.io/projeto-frontend-appmasters)

## Description

This project is a React JS application that consumes an API to display a list of games, including a genre filter and a search field. It also includes the following features and requirements:

#### Phase 1

- [x] Task 1 - The project must be done using React or Next.js;
- [x] Task 2 - Retrieves the list of games from the /data endpoint;
- [x] Task 3 - Displays a loader while fetching the data;
- [x] Task 4 - Presents the games in three columns on larger screens;
- [x] Task 5 - Each game card includes the title and an image (at least);
- [x] Task 6 - Handles responsiveness to ensure a good display on desktops, tablets, and mobile devices;
- [x] Task 7 - When the API returns status codes 500, 502, 503, 504, 507, 508, or 509, displays the message "The server failed to respond. Please try reloading the page.";
- [x] Task 8 - For other API errors, displays the message "The server is currently unable to respond. Please try again later.";
- [x] Task 9 - Allows a maximum waiting time of 5 seconds for API responses. If the data takes longer to return, displays the message "The server took too long to respond. Please try again later.";
- [x] Task 10 - Hides the loader whenever displaying a message to the user or when the data is ready;
- [x] Task 11 - Includes a search field that allows users to locate games by their title (case-insensitive);
- [x] Task 12 - Once the data is available, the application identifies the genres returned and allows the user to select one of them to filter and display only games of the selected genre.

#### Phase 2

- [x] Task 1 - Use Firebase to perform authentication using email/password;
- [x] Task 2 - Have a heart icon for the user to favorite a game directly from the list, turning red when marked;
- [x] Task 3 - Save the user's favorite games on Firebase, either in Realtime or Firestore;
- [x] Task 4 - Have a "Favorites" button that displays only favorited games, still allowing the search and filtering of these games;
- [x] Task 5 - Next to the heart icon, have stars (★★★★) for the user to rate the game, being able to mark one at a time;
- [ ] Task 6 - Have a way to sort by rating, viewing the best (or worst) first, clicking again to reverse the order;
- [x] Task 7 - When loading the interface, have the heart icon in red for favorite items and the stars in yellow for rated items;
- [x] Task 8 - When accessing without being authenticated, the heart and star icons should be visible, but clicking will prompt for authentication;
- [x] Task 9 - When getting games from the API, present them without keeping the loading while obtaining the data from Firebase, because Firebase will return the data faster;
- [x] Task 10 - Authentication should take place at the /auth/ route using the "Email/password" provider from Firebase, where the user can create an account or access an existing account (staying only in this route);
- [x] Task 11 - Choose an item to apply a CSS animation to, it could be when favoriting, or rating, or when the items appear;
- [x] Task 12 - Publish your project online for us to test (at the same URL as before).

### Instructions

To run this project on your local machine, follow these steps:

1. Clone the repository to your local machine;
2. Navigate to the project directory using the command line;
3. Install the project dependencies by running the command: **npm i** or **npm install**.
4. Start the development server with the command: **npm run dev**.
5. Open your web browser and visit **http://localhost:5173** to access the application.

### Technologies

The technologies used in this project include:

- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript Icon" width="16" height="16" /> JavaScript
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React Icon" width="16" height="16" /> React JS
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" alt="Firebase Icon" width="16" height="16" /> Firebase
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML Icon" width="16" height="16" /> HTML
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS Icon" width="16" height="16" /> CSS

---

:vulcan_salute:
