import { red } from "@mui/material/colors"
export default function CardShow({title,value}){
    return (
        <div style={{
            width:"100%",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            height:"40px",
            background:"#c6c5c5ff",
            borderRadius:"10px",
            padding:"10px 0px",
            color:"white",
            margin:"10px 0"
        }}>
            <h3 style={{color:'black',margin:'0px 10px'}} >{title}</h3>
            <h3 style={{color:'gray',margin:'0px 10px'}} >{value}</h3>
        </div>
    )
}