import Raven from 'raven-js';

const sentry_key = 'a90e5256eb14444a80f12bd0ea44652e';
const sentry_app = '123088';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}

export function setRavenUser(user = {}) {
  Raven.setUserContext({
    email: 'matt@example.com',
    id: '123',
    name: '张三'
  })
}