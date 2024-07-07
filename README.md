## MyJournalApp

### Purpose of this Application
The purpose of MyJournalApp is to enable users to log their day-to-day activities.

### How to Use

#### Backend Setup

1. **Prerequisites:**
   - Ensure you have MySQL installed and Node.js version v18.14.1 or higher.

2. **Database Setup:**
   - Navigate to the `models` folder inside the backend directory.
   - Copy the SQL code provided in the models folder and execute it in your MySQL server.
   - This will create the necessary database and tables.

3. **Configuration:**
   - In the `config` folder of the backend, update the database connection details (username and password) if needed. By default, it uses `root` as the username and `12345` as the password.

4. **Install Dependencies:**
   - Open your terminal and navigate to the root directory of `Personal-Journaling-App`.
   - Change directory to `Backend`.
   - Run `npm i` to install necessary dependencies.

5. **Start Backend Server:**
   - Run `npm run start` in the terminal to start the backend server.
   - Open CMD in Windows and type `ipconfig` to find your wireless IPv4 private IP address. Copy this address (e.g., `192.168.100.59`).

#### Frontend Setup

1. **Update Server URL:**
   - Navigate to the `config` folder in the frontend project.
   - Open the `serverUrl.jsx` file and paste your IPv4 address obtained earlier in the space marked `"http://192.168.100.59:8080"`. Save the file.

2. **Install Frontend Dependencies:**
   - Open a new terminal.
   - Ensure you are in the `Personal-Journaling-App` directory.
   - Change directory to `myJournalApp`.
   - Run `npm i` to install frontend dependencies.

3. **Start Frontend Development Server:**
   - After dependencies installation, run `npm run start`.
   - When prompted to choose a platform, press `a` for Android.
   - The application will build and install on your connected Android device.
   
4. **Usage:**
   - After installation, the initial screen will be the login screen.
   - Create your account using your email and password.
   - Upon successful login, you will be directed to the home screen.
   - Here, you can create, search, update, and delete journals.
   - Additionally, you can reset your password from the settings page.

**Note:** Ensure your Android device is connected to the Windows computer or laptop via USB during installation.
## MyJournalApp API Endpoints

### Register User
- **POST** `/register`

### Login User
- **POST** `/login`

### Verify User Token
- **GET** `/userverifier`

### Add New Journal Entry
- **POST** `/addJournal`

### Get User's Journals
- **GET** `/getJournals`

### Update Journal Entry
- **POST** `/updateJournal`

### Reset User Password
- **POST** `/resetpassword`

### Delete Journal Entry
- **POST** `/deleteJournal`

