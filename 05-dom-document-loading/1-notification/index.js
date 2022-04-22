export default class NotificationMessage {

  millisecondToSecond = 1000;
  static notification;
  element;
  timerId;

  constructor (
    message = '',
    {
      duration = 2000,
      type = 'error'
    } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.element = this.render();

  }

  getTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / this.millisecondToSecond}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
          ${this.message}
          </div>
        </div>
      </div>`;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTemplate();
    const element = wrapper.firstElementChild;
    return element;
  }

  show(parent = document.body) {

    if (NotificationMessage.notification) {
      NotificationMessage.notification.remove();
    }

    NotificationMessage.notification = this.element;
    parent.append(this.element);
    this.timer();

  }

  timer() {
    setTimeout(() => {
      this.destroy();
    }, this.duration);
  } 

  remove() {
    if (NotificationMessage.notification) {
      NotificationMessage.notification.remove();
    }
  }

  destroy() {
    this.remove();
    NotificationMessage.notification = null;
    this.element = null;
  }
}
