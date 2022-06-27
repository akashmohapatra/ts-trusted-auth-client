// Import stylesheets
import './style.css';

// Import ThoughtSpot SDK
import {
  init,
  LiveboardEmbed,
  Action,
  RuntimeFilterOp,
  EmbedEvent,
  AuthType,
  logout,
  Action,
} from '@thoughtspot/visual-embed-sdk';

const tsClusterUrl = 'https://nebula-tse-akash-test.thoughtspotdev1.cloud/';
const authSecret = 'e5fc3593-7a43-4b74-b609-a68934fd3927';
const userName = 'tsadmin';

// Add Cors setting in the security settings in TS if needed

// Initialize embed configuration
init({
  thoughtSpotHost: tsClusterUrl,
  authType: AuthType.AuthServer,
  username: userName,
  getAuthToken: () => {
    return fetch(`${tsClusterUrl}callosum/v1/tspublic/v1/session/auth/token`, {
      method: 'POST',
      body: `secret_key=${authSecret}&username=${userName}&access_level=FULL`,
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.text())
      .catch((error) => {
        console.error('Error:', error);
      });
  },
});

const embed = new LiveboardEmbed('#embed', {
  frameParams: { height: '100vh' },
  liveboardId: '32060a7c-5984-49c9-845c-9a27d185d710',
});

embed.render();

embed.on(EmbedEvent.AuthExpire, () => {
  // Do something
});

document.getElementById('logout').addEventListener('click', () => {
  logout();
});
