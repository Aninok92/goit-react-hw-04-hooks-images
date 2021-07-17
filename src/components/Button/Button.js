import s from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.Button}>
      Load more
    </button>
  );
};

Button.defaultProps = {
  onClick: () => null,
};

Button.propType = {
  onClick: PropTypes.func,
};

export default Button;
