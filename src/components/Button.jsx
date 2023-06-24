export const Button = ({ onClickFunction, children, classType }) => (
  <button className={classType} onClick={onClickFunction}>
    {children}
  </button>
);