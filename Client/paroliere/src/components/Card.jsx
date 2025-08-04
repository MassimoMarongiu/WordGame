const Card = ({ id, value, imgUrl, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      // style={{
      //   background: selected ? "red" : "white", // Stile condizionale
      //   color: "black",
      //   padding: "10px",
      //   margin: "5px",
      //   border: "1px solid #ccc",
      //   cursor: "pointer",
      //   borderRadius: "2 px"
      // }}
    >
      {value}
      {imgUrl && <img src={imgUrl} alt={value} />}
    </div>
  );
};

export default Card;