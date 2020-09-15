import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DarkModeToggle extends Component {
  @service darkMode;

  get darkModeState() {
    return this.darkMode.isDark;
  }

  get statusTitle() {
    let status = 'Auto';

    if (this.darkMode.isDarkOn) {
      status = 'Dark';
    } else if (this.darkMode.isDarkOff) {
      status = 'Light';
    }

    return status;
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
