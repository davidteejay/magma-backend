import EventEmitter from 'events';
import sendEmail from './email';
import transporter from './transporter';
import Helper from './Helper';


class Notifications extends EventEmitter {
  constructor() {
    super();
    this.on('notification', this.handleNotification);
  }

  handleNotification({ type, payload }) {
    type in this ? this[type](payload) : new Error('undefined notification type');
  }

  addNotification(type, handler = () => {}) {
    if (!this.hasOwnProperty(type)) {
      this[type] = handler;
    }
  }

  newRequest({ emailDetails }) {
    const emailOptions = Helper.constructNewRequestEmail(emailDetails);
    sendEmail(transporter, emailOptions);
    console.log(true);
  }

  approvedRequest(payload = {}) {
    const emailOptions = Helper.constructNewApprovalEmail(payload.email);
    sendEmail(transporter, emailOptions);
    this.emit('inAppNotifications', {});
  }

  requestComment(payload = {}) {
    const emailOptions = Helper.constructRequestCommentEmail(payload.email);
    sendEmail(transporter, emailOptions);
    this.emit('inAppNotifications', {});
  }

  closedRequest(payload = {}) {
    const emailOptions = Helper.constructClosedRequestEmail(payload.email);
    sendEmail(transporter, emailOptions);
    this.emit('inAppNotifications', {});
  }
}

export default new Notifications();
