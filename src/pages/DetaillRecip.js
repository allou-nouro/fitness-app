import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from '@mui/material';
import Nutrition from "./Nutrition";
import { red } from "@mui/material/colors";
import BoxCategory from "./BoxCategory";
import Recip from "./recip";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "./FavoritProvider";
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function Details() {

  const [cashow,setcashow]=useState(0);
  const deuxcas = [
  { label: "Recipe Details" },
  { label: "Nutrition" }
];
const navigate = useNavigate();

const handleBack = () => {
  navigate(-1); // ترجع للصفحة السابقة
};

  const { id } = useParams();
  const [meal, setMeal] = useState(null);
const isDesktop = useMediaQuery('(min-width: 768px)');
  const width = isDesktop ? "50%" : "90%";
  const widthimg=isDesktop ? "500px" : "100%";
  const heightimg=isDesktop ? "300px" : "200px";
  const flexible= isDesktop ? "row" :"column"


     const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        if (res.data.meals) {
          setMeal(res.data.meals[0]);
        }
      })
      .catch((err) => console.error("Error fetching details:", err));
  }, [id]);

  if (!meal) return <p>Loading...</p>;

const ingredients = [];
for (let i = 1; i <= 20; i++) {
  const ingredient = meal[`strIngredient${i}`];
  const measure = meal[`strMeasure${i}`];

  if (ingredient && ingredient.trim() !== "") {
    const normalized = normalizeIngredient({
      ingredient: ingredient.trim(),
      measure: measure ? measure.trim() : ""
    });

    ingredients.push({
      ingredient: ingredient.trim(),
      measure: measure ? measure.trim() : "",
      normalized // هذا الذي سترسله لـ API
    });
  }
}


function normalizeIngredient({ ingredient, measure }) {
  const normalizedMap = {
    "a pinch": "1/8 tsp",
    "pinch": "1/8 tsp",
    "some": "1 tbsp",
    "a handful": "1 cup",
    "handful": "1 cup",
    "few": "3",
    "half": "0.5",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  let normalizedMeasure = measure ? measure.toLowerCase().trim() : "1";

  // استبدال القيم الغامضة إن وجدت
  Object.keys(normalizedMap).forEach(key => {
    if (normalizedMeasure.includes(key)) {
      normalizedMeasure = normalizedMeasure.replace(key, normalizedMap[key]);
    }
  });

  // إزالة أي فاصلة غير ضرورية مثل "1,5"
  normalizedMeasure = normalizedMeasure.replace(",", ".");

  return `${normalizedMeasure} ${ingredient}`.trim();
}


  return (
    <motion.div
      initial={{ opacity: 0 }}       
      animate={{ opacity: 1 }}      
      exit={{ opacity: 0 }}          
      transition={{ duration: 0.5 }} 
    >
      <div style={{ minHeight:"100vh", padding: "10px",width:width,margin:"auto",paddingTop:"70px",paddingBottom:"80px"}}>
      <div onClick={handleBack}>
              
        <ArrowBackIcon  style={{position:"fixed",top:"30px",left:"10px",cursor:"pointer",zIndex:"100",background:"white",padding:"8px",borderRadius:"50%"}}/>
      </div>
      <div style={{
        width:"100%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:"60px"
      }}>
        <h1>{meal.strMeal} </h1>
        <div onClick={toggleFavorite} style={{ cursor: "pointer" }}> 
        <FavoriteIcon sx={{ color: isFavorite(id) ? 'red':"gray" ,
          fontSize:"35px"
        }} />
      </div>
      </div>
      <div style={{
        display:"flex",
        flexDirection:flexible,
        alignItems:"center",
        gap:"10px",
        marginBottom:"40px"
      }}>
        <div
  style={{
    width:widthimg,
    height:heightimg,
    overflow: "hidden",          
    display: "flex",              
    justifyContent: "center",
    alignItems: "center",
    background:"black",
    borderRadius:"20px",
    marginTop:"10px",
    
  }}
>
  <img
    src={meal.strMealThumb}
    alt={meal.strMeal}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain"       
    }}
  />
        </div>
        {meal.strYoutube && (
        <div style={{ marginTop: "20px" }}>
          <a 
            href={meal.strYoutube} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: red[600],
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Watch Recipe Video ▶
          </a>
        </div>
      )}
      </div>
      <BoxCategory category={deuxcas} active={cashow} setActive={setcashow} equalWidth={true} ></BoxCategory>
      {
        cashow===0 ?<Recip meal={meal} ingredients={ingredients} ></Recip>:<Nutrition ingredients={ingredients} ></Nutrition>
      }
      
    </div>
    </motion.div>
  );
}
