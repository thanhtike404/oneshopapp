import 'expo-constants';

declare module 'expo-constants' {
  export interface AppManifest {
    extra?: {
      firebaseApiKey?: string;
      firebaseAuthDomain?: string;
      firebaseProjectId?: string;
      firebaseStorageBucket?: string;
      firebaseMessagingSenderId?: string;
      firebaseAppId?: string;
    };
  }
}