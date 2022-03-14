## Requirements

A `constants.js` file in the `src` folder is required. It is gitingored and should contain the following local settings:
- SERVER_URL: The URL of the backend server
- OFFLINE: If `true` it bypasses the login and need for a backend server and directly gives the user access to the editor. In commandClips mode data that would be sent to the backend is provided as a download.

Example for `src/constants.js`:
```javascript
var SERVER_URL = "http://127.0.0.1:8000";
var OFFLINE = true;

export { SERVER_URL };
export { OFFLINE };
```

## Local Development Setup

1. Have `npm` installed.
2. Run `npm install` to install dependencies.
3. Run `npm run start` to start the local dev server.