export function initialize(appInstance) {
  const darkMode = appInstance.lookup('service:dark-mode');

  darkMode.initialise();
}

export default {
  initialize,
};
