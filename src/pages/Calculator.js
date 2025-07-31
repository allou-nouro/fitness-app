import { useEffect, useState } from 'react';
import Gender from './calculatorFile/gendrer';
import TextFile from './calculatorFile/textFile';
import useMediaQuery from '@mui/material/useMediaQuery';
import SelectFile from './calculatorFile/selectFIle';
import { useResults } from './calculatorFile/resultContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { motion } from "framer-motion";

export default function GenderSelect() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const width = isDesktop ? "50%" : "100%";

  const [gender, setGender] = useState('0');
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [goal, setGoal] = useState(0.85);

  const { setResults } = useResults();
  const navigate = useNavigate();

  const activityLevels = [
    { label: "Sedentary", value: 1.2 },
    { label: "Lightly Active", value: 1.375 },
    { label: "Moderately Active", value: 1.55 },
    { label: "Very Active", value: 1.725 },
    { label: "Super Active", value: 1.9 }
  ];

  const goals = [
    { label: "Lose Weight", value: 0.85 },
    { label: "Maintain Weight", value: 1 },
    { label: "Gain Muscle", value: 1.15 }
  ];
    const isDisabled = !age || !height || !weight;
  const handleCalculate = () => {
    if (!age || !height || !weight) {
      alert("Please enter all fields.");
      return;
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const bmr = gender === "0"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const maintenanceCalories = bmr * activityLevel;
    const finalCalories = maintenanceCalories * goal;

    const protein = (finalCalories * 0.3) / 4;
    const carbs = (finalCalories * 0.45) / 4;
    const fat = (finalCalories * 0.25) / 9;

    const calculatedResults = {
      bmi: bmi.toFixed(2),
      bmr: Math.round(bmr),
      calories: Math.round(finalCalories),
      macros: {
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat)
      }
    };

    setResults(calculatedResults);
    navigate('/calculator/result'); // تنتقل لصفحة عرض النتائج
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}       
      animate={{ opacity: 1 }}      
      exit={{ opacity: 0 }}           
      transition={{ duration: 0.5 }}  
    >
        <div style={{width:width,margin:"auto",marginTop:"70px",minHeight:"100vh"}}>
      <h1 style={{ marginBottom: "20px" }}>MacroTrack</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
        <h2>Gender and Age</h2>
        <Gender gender={gender} setGender={setGender} value={age} setvalue={setAge} name={"Age (years)"} />
        <div style={{ display: "flex", justifyContent: "center", width: "90%", gap: "20px" }}>
          <TextFile value={height} setvalue={setHeight} name={"Height (cm)"} />
          <TextFile value={weight} setvalue={setWeight} name={"Weight (kg)"} />
        </div>
        <SelectFile file={activityLevels} setvalue={setActivityLevel} />
        <SelectFile file={goals} setvalue={setGoal} />
        <Button variant="contained" 
        disabled={isDisabled}
         onClick={handleCalculate} style={{ marginTop: "20px", padding: "10px 20px",
             fontSize: "16px" ,
             backgroundColor:red[600]
             }}>
          Calculate
        </Button>
      </div>
    </div>
    </motion.div>
  );
}
