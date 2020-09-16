import app from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.db = app.firestore();
    app.firestore().settings({experimentalForceLongPolling: true});
  }
}

const firebase = new Firebase();
export default firebase;
