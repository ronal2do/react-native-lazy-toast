import React, { PureComponent, Fragment } from 'react';
import NotificationComponent from './NotificationComponent'

export const withNotification = ({ title, message, action }) => {
  return Component => {
    return class extends PureComponent {
      render() {
        return (
          <Fragment>
            <Component notify={ () => this.child.showNotify() } {...this.props} />
            <NotificationComponent
              ref={ el =>  this.child = el }
              title={title}
              action={action}
              message={message }       
            />
          </Fragment>
        );
      }
    }
  }
}
