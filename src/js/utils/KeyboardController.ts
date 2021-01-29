interface Timers {
  [key: string]: NodeJS.Timer | null;
}
interface Keys {
  [key: string]: { (code: string): void };
}

export default class KeyboardController {
  timers: Timers;

  keys: Keys;

  interval: number;

  constructor(keys: Keys, interval: number) {
    this.timers = {};
    this.keys = keys;
    this.interval = interval;
  }
  // Lookup of key codes to timer ID, or null for no repeat
  //

  // When key is pressed and we don't already think it pressed, call the
  // key action callback and set a timer to generate another one after a delay
  //
  keyDown(event: KeyboardEvent): boolean {
    const key = event.code;
    if (!(key in this.keys)) return true;
    if (!(key in this.timers)) {
      this.timers[key] = null;
      this.keys[key](key);
      if (this.interval !== 0)
        this.timers[key] = setInterval(() => {
          this.keys[key](key);
        }, this.interval);
    }
    return false;
  }

  // Cancel timeout and mark key as released on keyup
  //
  keyUp = function keyUpController(event: KeyboardEvent): void {
    const key = event.code;
    if (key in this.timers) {
      if (this.timers[key] !== null) clearInterval(this.timers[key]);
      delete this.timers[key];
    }
  };

  // When window is unfocused we may not get key events. To prevent this
  // causing a key to 'get stuck down', cancel all held keys
  //
  // window.onblur = function () {
  //   for (key in timers) if (timers[key] !== null) clearInterval(timers[key]);
  //   timers = {};
  // };
}
