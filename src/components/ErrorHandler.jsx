import { Button } from "./Button";
import './ErrorHandler.css';

export const ErrorHandler = ({ children }) => (
  <div className="error">
    <h2>{children}</h2>
    <Button classType={'error-button'} onClickFunction={() => { window.location.reload(false) }}>Reload page</Button>
  </div>
)