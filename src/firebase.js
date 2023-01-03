import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcFaURPqvA-Wse-8cfSjmhUWbIxGfd30I',
  authDomain: 'sentiment-analysis-frontend.firebaseapp.com',
  projectId: 'sentiment-analysis-frontend',
  storageBucket: 'sentiment-analysis-frontend.appspot.com',
  messagingSenderId: '543501614849',
  appId: '1:543501614849:web:5ae8a51778016dbece6500',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);