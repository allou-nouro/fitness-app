import { useNavigate } from "react-router-dom";

export default function RicipCadre({ title, image, id,from="home" }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/${from}/details/${id}`)}
      style={{
        cursor:"pointer",
        width: "170px",
        height: "70px",
        background: "#b1b1b1",
        borderRadius: "10px",
        boxShadow: "0 0px 8px 0px #00000087",
        position: "relative",
        flexShrink: "0",
        paddingTop: "60px",
        textAlign: "center"
      }}
    >
      <div
        style={{
          cursor:"pointer",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #ddd",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          left: "50%",
          top: "-30px",
          transform: "translateX(-50%)",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
          zIndex: "2"
        }}
      />

      <div
        style={{
          
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "20px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {title}
      </div>
    </div>
  );
}
