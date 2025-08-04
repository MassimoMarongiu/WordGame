function Button({ id, buttonName, onClick }) {
  return (
    <button id={id} onClick={onClick}>
      {buttonName}
    </button>
  );
}

export default Button;
