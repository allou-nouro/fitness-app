export default function ResultAff({name,value,color}){
    return (
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            border:"1px solid #9f9e9e",
            width:"90%",
            padding:"20px 10px",
            borderRadius:"10px",
            backgroundColor:color,
            color:"white"

        }}>
            <h2>{name}</h2>
            <h3>{value}</h3>
        </div>
    )
}