const conf = {
    firebaseApi : String(import.meta.env.VITE_API_KEY),
    firebaseAuthDomain : String(import.meta.env.VITE_AUTH_DOMAIN),
    firebaseUrl : String(import.meta.env.VITE_DATBASE_URL),
    firebaseProjectId : String(import.meta.env.VITE_PROJECT_ID),
    firebaseMessengerSenderId : String(import.meta.env.VITE_MESSENGER_SENDER_ID),
    firebaseAppId : String(import.meta.env.VITE_APP_ID),
}

export default conf