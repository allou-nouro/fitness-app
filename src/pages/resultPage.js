import RicipCadre from "./ricipCadre"
import { useMediaQuery } from '@mui/material';
export default function ResultPage({value,from="home"}) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
const width= isDesktop ? "50%":"100%";
const grid= isDesktop ? "180px":"170px"
    const listPla=value.map(ele=>{
        return <RicipCadre title={ele.strMeal} id={ele.idMeal} image={ele.strMealThumb} from={from} ></RicipCadre>
    })
    return (
        <div style={{
          display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${grid}, 1fr))`,
  gap: '20px',
  marginTop:"40px",
  justifyItems: "center", 
alignItems: "center"
    }}>
        {listPla}
    </div> 
    )
}