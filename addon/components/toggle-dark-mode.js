import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";

export default class DarkModeToggle extends Component {
  @service darkMode;

  get darkModeState() {
    return this.darkMode.isDark;
  }

  get statusTitle() {
    if (this.darkMode.isDarkOn) {
      return "Theme is set to dark mode";
    }

    if (this.darkMode.isDarkOff) {
      return "Theme is set to light mode";
    }

    return "Theme is system preference";
  }

  @action
  darkModeCycle() {
    if (this.darkMode.isDarkAuto) {
      this.darkMode.manualDarkModeOn();
    } else if (this.darkMode.isDarkOn) {
      this.darkMode.manualDarkModeOff();
    } else if (this.darkMode.isDarkOff) {
      this.darkMode.manualDarkModeRevoke();
    }
  }
}
