import "../styles/buttonStyle.css"


function Button({ id, buttonName, onClick }) {
  return (
    <button id={id} onClick={onClick} class="playButtonStyle">
      {buttonName}
    </button>
  );
}

export default Button;
