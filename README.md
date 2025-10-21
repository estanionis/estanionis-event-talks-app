# Tech Event Website

A single-page web application to display the schedule for a 1-day technical event. Users can view the schedule, see talk details, and filter talks by category.

## Features

- Dynamic schedule generated from a JSON data file.
- Expandable talk details.
- Filter talks by category.
- Automatic calculation of talk timings, including breaks.
- Responsive design using Bootstrap.

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript, Bootstrap

## Installation and Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/estanionis/estanionis-event-talks-app.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd estanionis-event-talks-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   node server.js
   ```

5. **Open your browser:**
   Open your web browser and go to `http://localhost:3000`.

## Project Structure

```
.
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── talks.json
```
