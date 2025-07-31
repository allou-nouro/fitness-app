import Navigation from "./nav";
import NavigationDesc from "../navDesc";
import { useMediaQuery } from '@mui/material';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function FinalNav() {
  const location = useLocation(); 

  const fullPath = location.pathname;

   
  const basePath = '/' + fullPath.split('/')[1];

  function basestat(path) {
    if (path === "/home") return 0;
    if (path === "/calculator") return 1;
    if (path === "/favorites") return 2;
    return 0;
  }
  console.log(basestat(basePath))

  const [value, setValue] = useState(()=>{return basestat(basePath)});
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop
    ? <NavigationDesc value={value} setValue={setValue} />
    : <Navigation value={value} setValue={setValue} />;
}
