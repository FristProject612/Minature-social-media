import { PropTypes } from 'prop-types'

function Notification({ message }) {

  return (
        <div className="z-3 alert alert-primary position-absolute top-0 start-50 translate-middle-x">
        {message}
        </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
