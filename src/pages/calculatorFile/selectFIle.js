export default function SelectFile({file,setvalue}){
    const filelist=file.map((ele)=>{
        return <option key={ele.label} value={ele.value} >{ele.label}</option>
    })
    return (
            <select style={{
        width:"90%",
        padding:"10px 5px",
        border:"1px solid #9f9e9e",
        borderRadius:"10px",
        backgroundColor:"transparent",
        padding:"15px 0"

    }}
    onChange={(e)=>{
        setvalue(e.target.value)
    }}
    >
        {filelist}
    </select>
    )
}