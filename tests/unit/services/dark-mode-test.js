import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | dark-mode', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:dark-mode');
    assert.ok(service);
  });

  test('should correctly concat foo', function(assert) {
    const darkMode = this.owner.lookup('service:dark-mode');

    assert.equal(darkMode.isDark, 'auto-off');
  });

  test('should set isDark to "on" when manualDarkModeOn is called', function(assert) {
    const darkMode = this.owner.lookup('service:dark-mode');

    darkMode.manualDarkModeOn();

    assert.equal(darkMode.isDark, 'on');
  });
});
