import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyC-wQRkTYQokjy2gkuU7dXWWePA__rIEug',
    authDomain: 'apec-2021-nz.firebaseapp.com',
    projectId: 'apec-2021-nz',
    storageBucket: 'apec-2021-nz.appspot.com',
    messagingSenderId: '782342361518',
    appId: '1:782342361518:web:7f112dbc355a83ff24b83f',
    measurementId: 'G-4324QXGC5X',
}

if (firebase.apps.length === 0) {
    // Prevent initialising firebase again
    firebase.initializeApp(firebaseConfig)
}

export default firebase
