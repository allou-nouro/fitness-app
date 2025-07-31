import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ResultPage from "./resultPage";


export default function SearchPage() {
  const stopWords = ["and", "or", "the", "in", "on", "at", "a", "an", "of", "to", "with", "for", "is", "are","&"];
    const {query}=useParams()
  const cleanedWords = query
    ?.toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .filter((word) => !stopWords.includes(word));
const [value,setvalue]=useState([])
  useEffect(() => {
  if (!cleanedWords || cleanedWords.length === 0) return;

  const requests = cleanedWords.map((word) =>
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
      .then((res) => res.data.meals || [])
      .catch((err) => {
        console.error(`Error fetching "${word}":`, err);
        return [];
      })
  );

  Promise.all(requests).then((results) => {
    const allMeals = results.flat(); 
    const uniqueMeals = Array.from(new Map(allMeals.map(item => [item.idMeal, item])).values());
    setvalue(uniqueMeals);
  });
}, [query]);

const navigate = useNavigate();
const handleBack = () => {
  navigate(-1); 
};

const isDesktop = useMediaQuery('(min-width: 768px)');
const width= isDesktop ? "50%":"100%";
  return (
    <motion.div
      initial={{ opacity: 0 }}       
      animate={{ opacity: 1 }}      
      exit={{ opacity: 0 }}          
      transition={{ duration: 0.5 }}
    >
      <div style={{width:width,height:"fit-content",margin:"auto"}} >
      <div onClick={handleBack}>
        <ArrowBackIcon  style={{position:"fixed",top:"5px",left:"10px",cursor:"pointer",zIndex:"100",background:"white",padding:"8px",borderRadius:"50%"}}/>
      </div>
        <h2 style={{marginTop:"20px"}} >Searching for: "{query}"</h2>
       {value.length !==0 ? <ResultPage value={value}/>:<h1 style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",color:"gray"}} >No result</h1>}
    </div>
    </motion.div>
  );
}
