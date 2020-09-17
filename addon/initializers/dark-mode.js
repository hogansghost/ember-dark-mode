export function initialize(application) {
  const darkMode = application.lookup('service:dark-mode');

  darkMode.initialise();
}

export default {
  initialize
};
