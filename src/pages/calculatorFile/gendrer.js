import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

export default function Gender({ gender, setGender ,name,value,setvalue }) {
    const handleChange = () => {
  setGender(gender === "1" ? "0" : "1");
};

  return (
   <div
   style={{
    
    display:"flex",
    justifyContent:"space-between",
    width:"90%",
    alignItems:"center",
    border:"1px solid #b6b3b3ff",
    padding:"10px",
    borderRadius:"10px",
    backgroundColor:"transparent"
   }}
   
   >
     <div
    onClick={handleChange}
      style={{
        cursor:"pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "fit-content",
        width: "100px",
        background: "#e0e0e0",
        gap: "5px",
        borderRadius: "40px",
        padding: "4px",
        position: "relative",
        boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          zIndex: 10,
          color: gender === "0" ? "#1976d2" : "#555",
          transition: "color 0.3s",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <MaleIcon sx={{ fontSize: 32 }} />
      </div>

      <div
        style={{
          cursor: "pointer",
          zIndex: 10,
          color: gender === "1" ? "#d81b60" : "#555",
          transition: "color 0.3s",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <FemaleIcon sx={{ fontSize: 32 }} />
      </div>

      <div
        style={{
          width: "40px",
          height: "40px",
          background: "white",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: gender === "0" ? "4px" : "calc(100% - 44px)",
          transition: "left 0.4s",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        }}
      />
    </div>

    <div>
            <input type="number" value={value} onChange={(event)=>{setvalue(event.target.value)}} style={{ border:"1px solid #9a9999ff",background:"#cac8c8ff",width:"100px",padding:"5px 0",fontSize:"20px",borderRadius:"10px",textAlign:"center"}}></input>
        </div>
   </div>
  );
}
