    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import HomeIcon from '@mui/icons-material/Home';
    import CalculateIcon from '@mui/icons-material/Calculate';
    import FavoriteIcon from '@mui/icons-material/Favorite';
    import { red } from '@mui/material/colors';
    


    export default function Navigation({value,setValue}) {
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate('/home');
        else if (newValue === 1) navigate('/calculator');
        else if (newValue === 2) navigate('/favorites');
    };
    const select={
        position:"relative",
        zIndex:"2",
        color:"white",
        fontSize:32,
        transition: 'font-size 0.5s ease',
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        transform: "translateY(-25px)",
        transition: 'font-size 0.6s ease',
    }
    const nonSelect={
        
        color:"gray",
        fontSize:27,
        transition: 'font-size 0.6s ease',
    }
    const styleBtnm={
      
      flex:1,
      display:"flex",
        justifyContent:"center",
        alignItems:"center",
      flexDirection: "column"
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
      fontSize:"15px",
    }
    
    return (
        <div style={{position:"fixed",width:"100%",left:"0px",bottom:"0px",zIndex:"100"}} onChange={handleChange} >
            <div style={{width:"100%",position:"relative",display:"flex",justifyContent:"start",alignItems:"center",border:"0px solid #aca9a9",height:"45px",background:'white'}} >
                <div  style={styleBtnm} onClick={(e)=>(handleChange(e,0))} >
                  <HomeIcon style={value===0 ? select:nonSelect} ></HomeIcon>
                  <p style={{ display: value === 0 ? "block" : "none" ,...textstyle }} >home</p>
                </div>
                
                <div style={styleBtnm} onClick={(e)=>(handleChange(e,1))} >
                  <CalculateIcon style={value===1 ? select:nonSelect} ></CalculateIcon>
                  <p style={{ display: value === 1 ? "block" : "none" ,...textstyle }} >Calculate</p>
                </div>
                <div style={styleBtnm} onClick={(e)=>(handleChange(e,2))}>
                  <FavoriteIcon style={value===2 ? select:nonSelect} ></FavoriteIcon>
                  <p style={{ display: value === 2 ? "block" : "none" ,...textstyle }} >Favorite</p>
                </div>
                <div className='circle' style={{
                  width:"45px",
                  height:"45px",
                  borderRadius:"50%",
                  background:red[600],
                  position:"absolute",
                  border:"4px solid white",
                  
                  left:posCircle.left,
                  transform: `translate(${posCircle.pos},-30px)`,
                  transition: ' 0.55s ease',
                }}>

                </div>
            </div>
        </div>
    )
    }
