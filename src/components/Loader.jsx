import './Loader.css';

export const Loader = () => (
  <div className='loader'>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5rem"
      height="5rem"
      preserveAspectRatio="xMidYMid"
      style={{
        margin: "auto",
        background: "0 0",
        display: "block",
        shapeRendering: "auto",
      }}
      viewBox="0 0 100 100"
    >
      <path fill="#646cff" d="M10 50a40 40 0 0 0 80 0 40 42 0 0 1-80 0">
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 51;360 50 51"
        />
      </path>
    </svg>
  </div>
)