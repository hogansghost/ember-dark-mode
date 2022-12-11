import { action } from "@ember/object";
import { bind } from "@ember/runloop";
import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

const darkMediaQuery = "screen and (prefers-color-scheme: dark)";

export const DarkModeStates = {
  Auto: "auto",
  AutoOn: "auto-on",
  AutoOff: "auto-off",
  Off: "off",
  On: "on",
};

export default class DarkModeService extends Service {
  @tracked isDark = DarkModeStates.Auto;

  initialise() {
    this.attachListeners();
    this.applyDarkMode();
    this.setForcedDarkModeFromStorage();
  }

  attachListeners() {
    window
      ?.matchMedia(darkMediaQuery)
      .addEventListener("change", bind(this, this.applyDarkMode));
  }

  setForcedDarkModeFromStorage() {
    const storedPreference = window?.localStorage?.getItem("darkMode");

    if (storedPreference === DarkModeStates.On) {
      this.manualDarkModeOn();
    } else if (storedPreference === DarkModeStates.Off) {
      this.manualDarkModeOff();
    }
  }

  applyDarkMode() {
    const windowPreference = window?.matchMedia(darkMediaQuery).matches
      ? DarkModeStates.AutoOn
      : DarkModeStates.AutoOff;

    if (
      [
        DarkModeStates.Auto,
        DarkModeStates.AutoOff,
        DarkModeStates.AutoOn,
      ].includes(this.isDark)
    ) {
      this.isDark = windowPreference;
    }

    this.toggleDataTheme(this.isDark);
  }

  setDarkModeState(state) {
    this.isDark = state;
  }

  toggleDataTheme(darkMode) {
    if ([DarkModeStates.On, DarkModeStates.AutoOn].includes(darkMode)) {
      this.setDarkModeState(darkMode);
      document?.documentElement?.setAttribute("data-theme", "dark");
    } else if (
      [DarkModeStates.Off, DarkModeStates.AutoOff].includes(darkMode)
    ) {
      this.setDarkModeState(darkMode);
      document?.documentElement?.setAttribute("data-theme", "light");
    }
  }

  setCurrentState(state) {
    this.isDark = state;

    if (state === DarkModeStates.Auto) {
      window?.localStorage?.removeItem("darkMode");
    } else {
      window?.localStorage?.setItem("darkMode", state);
    }

    this.applyDarkMode();
  }

  get isDarkOn() {
    return this.isDark === DarkModeStates.On;
  }

  get isDarkOff() {
    return this.isDark === DarkModeStates.Off;
  }

  get isDarkAuto() {
    return [
      DarkModeStates.Auto,
      DarkModeStates.AutoOff,
      DarkModeStates.AutoOn,
    ].includes(this.isDark);
  }

  @action
  manualDarkModeOn() {
    this.setCurrentState(DarkModeStates.On);
  }

  @action
  manualDarkModeOff() {
    this.setCurrentState(DarkModeStates.Off);
  }

  @action
  manualDarkModeRevoke() {
    this.setCurrentState(DarkModeStates.Auto);
  }

  @action
  cycleDarkMode() {
    if (this.isDarkAuto) {
      this.manualDarkModeOn();
    } else if (this.isDarkOn) {
      this.manualDarkModeOff();
    } else if (this.isDarkOff) {
      this.manualDarkModeRevoke();
    }
  }
}
