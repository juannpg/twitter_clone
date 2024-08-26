# Twitter Clone

<img src="https://drive.google.com/uc?export=view&id=1RE1gWFAEAarFZPMAIXBmLkEVrfVRdRHw" align="right"
     alt="Twitter Clone by juannpg" width="260" height="260">

Twitter Clone is a web project based on the original [X (Twitter)](https://x.com/). It includes:

* **Login** and **Register** pages.
* Utilities for **Writing** tweets and **Replying** to tweets.
* The capability to display **post feeds** for tweets and their replies.
* Effective handling of **localStorage**.
* Easy **navigation** through the pages and **logout** function.
* **Error handling** and management of unexpected site entries.

## How it works
1. The `register page` makes a **POST request** to the backend server, which creates a user by sending the `email`, `username`, and `password` of the user through three inputs and the `useState` hook.
2. The `login page` also makes a **POST request**, this time finding a user who matches the `username` and `password`. It then saves the user's `token` and `username` given by the server in the `localStorage`.
3. The `dashboard page` is shown, which automatically makes a **GET request** to fetch all the tweets from the database and displays each one in its respective component, using the `map()` function.
4. If you click the `logout button` on the top of the page, it will delete both the `token` and `username` of the user from the `localStorage` and redirect them to the `login page`. Every time the `register page` or `login page` is reached, the entire `localStorage` is cleared.
5. On the `dashboard page`, the `write section` is shown. This section allows the user to write content in a `textarea`, saving the content with the `useState` hook. When the user clicks the `Create button`, a **POST request** is made to the server to create a tweet, and then the page reloads to display the new tweet in the feed.
6. When you click the `see replies` or `reply` buttons on any tweet in the feed, that tweet's `id`, `username`, and `content` are saved in `localStorage`. A new page is then shown, which creates a component with the previous tweet's information.
7. If that page is the `replies page`, it makes a **GET request** for all the replies under the tweet's id. If the page is the `reply page`, it loads a `write section` for you to write a reply and then makes a **POST request**.
8. If you click a `cancel button` at any time, a `custom hook` deletes all `localStorage` data except for the `username` and `token`. Every time you enter the `dashboard page`, this same behavior occurs.
9. Whenever an error happens, like not providing all the fields on a form, an alert is shown.

## Installation (will be updated with MySQL)
1. **Install PostgreSQL:**
   - Using the pgAdmin tool, create a password for the `postgres` user.
   - Create a database named `nextjs-twitter`.

2. **Setup Environment Variables:**
   - Create a file named `.env` in the `backend` folder with the following content:
     ```
     DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/nextjs-twitter?schema=public"
     ```
     Replace `PASSWORD` with the actual password you set for the `postgres` user.

3. **Run Migrations and Start Server:**
   - Navigate to the `backend` directory and run:
     ```
     npx prisma migrate dev
     npm run dev
     ```

4. **Start Frontend Server:**
   - For better performance, navigate to the `frontend` directory and run:
     ```
     npx next build
     npx next start
     ```
   - For slower performance but quicker access, run:
     ```
     npm run dev
     ```

## Future Plans
### Adding Likes
* I plan to implement a feature to like a tweet and view its like count.

### MySQL
* I plan to migrate the project to use MySQL instead of PostgreSQL to simplify the installation process.

### Next API Routing
* I plan on adding **Next API Routing** for every fetch on the frontend.
