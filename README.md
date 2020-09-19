ember-dark-mode
==============================================================================

An addon to handle dark mode implementation for an EmberJS application through the application of a [data-theme] attribute on the html tag.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-dark-mode
```


Usage
------------------------------------------------------------------------------

To begin with, it's recommended to use CSS variables to implement the dynamic change to colours based on the theme applied, rather than specifying in multiple locations a direct colour change. This will save you from having to update values throughout you app based on a parent attribute.

```
:root {
  --body-background-colour: #fff;
}

:root[data-theme="dark"] {
  --body-background-colour: #000;
}

html {
  background-color: var(--body-background-colour, #000);
}
```

Remember that, if you're using sass, you need to wrap the variable definition in a literal wrapper i.e.

```
$background-colour-light: #fff;
$background-colour-dark: #000;

:root {
  --body-background-colour: #{$background-colour-light};

  &[data-theme="dark"] {
    --body-background-colour: #{$background-colour-dark};
  }
}
```

### Theme options

The two data-theme options are `light` and `dark` respectively.

### Included component

A pre-built component to handle the three states available (`dark`, `light` and (OS specified) `auto`) is included with this package. It will cycle through each option respectively.

It will sit with a fixed position in the top right of your page (as of writing this is not configurable without implementing your own CSS with `!important` or something similar).


```
<ToggleDarkMode />
```

### Implementing your own toggle
You can use either the prebuilt cycle action from the dark-mode service or build your own implementation (perhaps you want to toggle on and off and reset to system preference with a separate button).


```
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ExampleComponent extends Component {
  @service darkMode;

  // An example of a getter to set a label
  // based on the dark mode state.
  get darkModeLabel() {
    let label;

    if (this.darkMode.isDarkOn) {
      label = 'Dark mode on';
    } else if (this.darkMode.isDarkOff) {
      label = 'Dark mode off';
    } else if (this.darkMode.isDarkAuto) {
      label = 'Dark mode auto';
    }

    return label;
  }

  @action
  darkModeCycle() {
    // There are checks for each state as visible
    // below, e.g. this.darkMode.isDarkAuto which is the system preference.
    if (this.darkMode.isDarkAuto) {
      this.darkMode.manualDarkModeOn();
    } else if (this.darkMode.isDarkOn) {
      this.darkMode.manualDarkModeOff();
    } else if (this.darkMode.isDarkOff) {
      this.darkMode.manualDarkModeRevoke();
    }
  }

  @action
  toggleDarkMode() {
      // This uses the prebuild toggle that will
      // cycle through each state sequentially.
      this.darkMode.cycleDarkMode();
  }
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
