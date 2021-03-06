import { Permissions, Notifications } from 'expo';
import Server from './constants/Server';

let server = Server.address;
let port = Server.port;
const PUSH_ENDPOINT = 'http://' + server + ':' + port + '/api/auth/set-token/';

export default (async function registerForPushNotificationsAsync(user) {

  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') return;
  let token = await Notifications.getExpoPushTokenAsync();
  if(token == user.push_token) return;

  return fetch(PUSH_ENDPOINT + user._id, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': user.token //JWT Token
    },
    body: JSON.stringify({
      token: token
    }),
  });
});
