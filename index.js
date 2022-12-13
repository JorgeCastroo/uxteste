/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import * as Sentry from "@sentry/react-native";

AppRegistry.registerComponent(appName, () => App);



Sentry.init({
    dsn: "https://9f1d52e4ccdb4442a8ade9332019bf43@o1030646.ingest.sentry.io/4504141287194624",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
