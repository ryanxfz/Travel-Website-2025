# FWE-SS-25-1123134

## Project Overview:
This project is a full-stack travel planner application that allows users to create, view, and manage their travels and destinations. The backend is built with Node.js and Express, while the frontend uses React and TypeScript. Data is persisted in a PostgreSQL database, and Drizzle is used for Object Relational Mapping (ORM). The backend is run in Docker.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Getting the Project Running:
#### Step 1: Clone the Repository and go to the project directory
```sh
git clone https://code.fbi.h-da.de/stryzebua/fwe-ss-25-1123134.git
cd fwe-ss-25-1123134
```
#### Step 2: Setting up the Backend
Docker is used for the backend, so the first thing you need to do is to get it set up. From this step, make sure that docker desktop is already installed and running.

##### 2.1 Navigate to the backend directory
```sh
cd backend
```
##### 2.2 Build the docker container
```sh
docker-compose build
```
##### 2.3 Run the container
```sh
docker-compose up -d
```
##### 2.4 Generate & Migrate Database
Now that docker is up and running, the next step is to generate and migrate database. Run these commands:
```sh
npm install
npm run db:generate
npm run db:migrate
```
##### 2.5 Run the backend
Finally, we run the backend. On the same backend directory, run this command:
```sh
npm run dev
```
The backend will run on http://localhost:4000
#### Step 3: Run the frontend
On a separate terminal, go to the frontend directory:
```sh
cd fwe-ss-25-1123134
cd frontend
cd client
```
Once you are in this directory, simply run this command:
```sh
npm install
npm run dev
```
The frontend will run on http://localhost:5173 (or as shown in your terminal)

### Freestyle Task #1 (Without external API): Travel Grouping by Month/Year

- All travels are grouped and sorted by their timePeriod (date) into sections labeled by Month and Year (e.g., "May 2024").
- How it works:
The backend provides travel data with a timePeriod field. The frontend processes this data, groups travels by their Month/Year, and displays them in an organized, chronological order.
- Benefit:
This makes it easy to visually browse and find travels based on when they occur.

### Freestyle Task #2 (With external API): OpenWeather API Integration
- For each destination, the app can display the current weather in the destination city using the [OpenWeather API](https://openweathermap.org/api).
- How to enable:
    - Sign up for a free API key: [Click here](https://home.openweathermap.org/users/sign_up) to sign up and create a FREE account.
    - After signing up, go to the [API Keys Page](https://home.openweathermap.org/api_keys) and copy the key.
    - Configure the frontend: Create a .env file in frontend/client with the following content:
    ```sh
    VITE_OPEN_WEATHER_API_KEY=your_api_key_here
    ```
    - Restart the frontend server
- Usage: When vieweing a destination, the app will fetch and display the current weather & temperature for the city.
- Example Output
    <br>Weather: Cloudy, 16.78°C

## API Route Structure
The base URL for the backend API is [http://localhost:4000/](http://localhost:4000/). Adjust the endpoints accordingly by referring to these tables:
### Travel API Endpoints
| Method | Route                      | Description               |
|--------|----------------------------|---------------------------|
| GET    | `/api/travels`             | Get all travels           |
| GET    | `/api/travels/:travelId`   | Get travel by ID          |
| GET    | `/api/travels/name/:travelName` | Get travel by name    |
| POST   | `/api/travels`             | Create a new travel       |
| PUT    | `/api/travels/:travelId`   | Edit a travel             |
| DELETE | `/api/travels/:travelId`   | Delete a travel           |

### Destinations API Endpoints
| Method | Route                               | Description                  |
|--------|-------------------------------------|------------------------------|
| GET    | `/api/destinations`                 | Get all destinations         |
| GET    | `/api/destinations/:destinationId`  | Get destination by ID        |
| POST   | `/api/destinations`                 | Create a new destination     |
| PUT    | `/api/destinations/:destinationId`  | Edit a destination           |
| DELETE | `/api/destinations/:destinationId`  | Delete a destination         |

### Travel-Destination (Linking)
| Method | Route                               | Description                  |
|--------|-------------------------------------|------------------------------|
| POST    | `/api/travels/:travelId/destinations`                 | Add destination to travel ({ "destinationId": ["id"] })         |
| DELETE    | `/api/travels/:travelId/destinations`  | Remove destination from travel ({ "destinationId": ["id"] })

### How to test the API:
You can use Postman, ThunderClient, or a similar tool to test the API endpoints.

#### Example: Create a Travel

**POST** `http://localhost:4000/api/travels`  
**Body (JSON):**
```json
{
  "name": "Mediterranean Trip",
  "description": "Good foods and nice breeze by the beach",
  "timePeriod": "2024-07-05",
  "participants": "Jan, John, Bob",
  "images": "beach.jpg"
}
```
#### Example: Edit a travel

**PUT** `http://localhost:4000/api/travels/:travelId`

**Body (JSON)** 
```json
{
  "name": "Updated Europe Trip",
  "description": "Updated description",
  "timePeriod": "2024-08-01",
  "participants": "Alice, Bob, Charlie",
  "images": "updated.jpg"
}
```

## Support
Should any issues arise (e.g., problems with API keys), please open an issue or contact the maintainer (me) directly via email.