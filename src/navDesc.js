import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
export default function NavigationDesc({value,setValue}) {

const navigate = useNavigate();

const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/home');
    else if (newValue === 1) navigate('/calculator');
    else if (newValue === 2) navigate('/favorites');

}


function Valeft(){
if (value===0){
    return "16.66%"
}else if (value===1){
    return "50%"
}
else {
    return "83.34%"
}
}


const posCircle={
left:Valeft(),
pos:"-50%"
}
const textstyle={
color:red[600],
fontSize:"20px",
}
const styleBtnm={
    flex:1,
      display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
        zindex:"2",
        height:"100%"
}
return (
    <div style={{position:"fixed",width:"50%",left:"50%",top:"0",transform:"translatex(-50%)",zIndex:"100"}} onChange={handleChange} >
        <div style={{width:"100%",position:"relative",display:"flex",justifyContent:"start",alignItems:"center",border:"0px solid #aca9a9",height:"60px",background:'white',borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}} >
            <div  style={styleBtnm} onClick={(e)=>(handleChange(e,0))} >
            < h4 style={{position:"relative",zIndex:"2",color:value===0?"white":"black"}} >home</h4>
            </div>
            <div style={styleBtnm} onClick={(e)=>(handleChange(e,1))} >
            <h4 style={{position:"relative",zIndex:"2",color:value===1?"white":"black"}} >Calculate</h4>
            </div>
            <div style={styleBtnm} onClick={(e)=>(handleChange(e,2))}>
            <h4 style={{position:"relative",zIndex:"2",color:value===2?"white":"black"}} >Favorite</h4>
            </div>
        <div style={
            {
                position:"absolute",
                width:"33.33%",
                height:"100%",
                transition: ' 0.6s ease',
                left:`${value*33.33}%`,
                background:red[600],
                borderBottomLeftRadius:"20px",
                borderBottomRightRadius:"20px",

            }
        }>

        </div>
        </div>
    </div>
)
}
