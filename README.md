📱 CJM – Contractor Job Management App

CJM is a React Native CLI mobile application that helps contractors manage jobs, notes, and site videos with a true offline-first architecture.
The app works seamlessly without internet and automatically syncs data when connectivity is restored.

✨ Key Features
🧰 Job Management

Create, edit, and view jobs

Offline job creation & updates

Automatic background sync when online

Local-first rendering (no UI blocking)

📝 Job Notes

Add notes to jobs

Offline note creation

Notes sync automatically when online

🎥 Site Video Management

Upload site videos from device gallery

Offline video queue support

Automatic upload when network restores

Watch uploaded videos in a native video player

🌐 Offline-First Architecture

App fully usable without internet

Cached data loads instantly

Sync queues for jobs, notes, and videos

Client-generated IDs to prevent conflicts

📶 Network Awareness

Online/offline detection using NetInfo

“Back Online” sync banner

Graceful fallback when API fails

🎨 UI & UX

Clean, modern UI

Gradient cards and floating action button

Consistent design across Android & iOS

SafeArea-aware layouts

🛠 Tech Stack
Frontend

React Native CLI

TypeScript

React Navigation

react-native-linear-gradient

react-native-video

react-native-image-picker

State & Storage

React Context API

AsyncStorage

Offline queues with sync handlers

Networking

Axios

REST APIs

NetInfo for connectivity detection

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/CJMApp.git
cd CJMApp

2️⃣ Install dependencies
yarn install

3️⃣ iOS setup
cd ios
pod install
cd ..

4️⃣ Run the app
Android
yarn android

iOS
yarn ios

🧪 Testing Offline Mode (Important)

⚠️ Note: React Native debug mode requires Metro bundler.

✅ Correct way to test offline behavior

Use a release build.

Android Release APK
cd android
./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk


Then:

Turn off internet

Create jobs / notes / upload videos

Turn internet back on

Data syncs automatically

📁 Project Structure
src/
├── api/                     # API layer
├── assets/                  # Fonts, icons, images
├── components/              # Reusable UI components
│   ├── notes/
│   ├── overview/
│   └── video/
├── context/                 # Global app contexts
├── navigation/              # React Navigation setup
├── screens/                 # App screens
│   ├── auth/
│   └── jobs/
├── storage/                 # AsyncStorage logic
├── sync/                    # Offline → online sync handlers
├── theme/                   # Typography & theme
└── utils/                   # Shared utilities

🔁 Sync Logic Overview
Jobs

Created/updated offline → saved with _syncStatus

Synced automatically when online

Local cache updated after server response

Notes

Stored locally when offline

Synced using queued operations

Videos

Offline uploads stored in a queue

Uploaded automatically when network restores

UI updates reflect server state

🧠 Architecture Principles Used

Local-first UI rendering

Client-generated IDs (clientJobId, clientNoteId, clientVideoId)

Queue-based sync strategy

Focus-based screen refresh (useFocusEffect)

Clear separation of concerns:

api/ → server communication

storage/ → persistence

sync/ → background sync

🚀 Future Enhancements

Offline video playback

Multiple site videos per job

Sync conflict resolution

Job search & filters

Push notifications

Cloud backup

👨‍💻 Author

Shivam Pandey
React Native

📜 License

This project is licensed under the MIT License.

⭐ Final Note

CJM is built with production-grade offline handling, not demo logic.
It demonstrates real-world mobile engineering patterns used in scalable React Native applications.