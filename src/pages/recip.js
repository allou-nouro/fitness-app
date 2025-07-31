import CardShow from "./cardShow";

export default function ricip({meal,ingredients}){
    return(
        <div style={{marginTop:"20px"}}>
          <h2>Ingredients:</h2>
        {ingredients.map((item, idx) => (
          <CardShow key={idx} title={item.ingredient} value={item.measure} ></CardShow>
        ))}
        <h2>Instructions:</h2>
        <p style={{fontSize:"20px",paddingBottom:"10px"}} > {meal.strInstructions}</p>
        </div>
    )
}