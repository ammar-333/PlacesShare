# PlaceShare

PlaceShare is a basic website built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It uses the **Google Maps API** and allows users to share their favorite places with others.

## Features

* Users can share their favorite places.
* Each place includes:

  * Title
  * Image
  * Location (shown using Google Maps API)
* Users can view a list of all registered users.
* Users can view the places shared by each user.

## Tech Stack

* **MongoDB** – Database for storing users and places
* **Express.js** – Backend framework
* **React** – Frontend UI
* **Node.js** – Backend runtime
* **Google Maps API** – Displaying location for each place

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ammar-333/PlacesShare.git
   ```

2. Install dependencies for backend and frontend:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Add your Google Maps API key in the environment configuration.

4. Run the development servers:

   ```bash
   # Backend
   npm start

   # Frontend (in another terminal)
   npm start
   ```

## License

This project is open-source and available under the MIT License.
