import { Button } from "./Button";
import errorImg from "../assets/error-img.svg";
import './ErrorHandler.css';

export const ErrorHandler = ({ errorMessage, errorCode }) => (
  <div className="error">
    <div className="error-img-code">
      <img src={errorImg} alt="" />
      <span className="error-code">{errorCode}</span>
    </div>
    <h2>{errorMessage}</h2>
    <Button classType={'error-button'} onClickFunction={() => { window.location.reload(false) }}>Reload page</Button>
  </div>
)