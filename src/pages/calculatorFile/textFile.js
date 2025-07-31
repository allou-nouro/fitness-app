export default function TextFile({name,value,setvalue}){
    return (
        <div>
            <h2>{name}</h2>
            <input type="number" value={value} onChange={(event)=>{setvalue(event.target.value)}} style={{border:"1px solid #9f9e9e",background:"transparent",width:"150px",padding:"30px 0",fontSize:"40px",borderRadius:"20px",textAlign:"center"}}></input>
        </div>
    )
}