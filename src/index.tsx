import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { ClerkProvider } from '@clerk/react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const clerkPubKey = "pk_test_bmVhcmJ5LXN3aWZ0LTcyLmNsZXJrLmFjY291bnRzLmRldiQ";
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
