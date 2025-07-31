import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const SearchBar = ({value,setvalue}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const width = isDesktop ? "50%" : "90%";
  const marginTop=isDesktop ? "80px" : "50px";
  const navigate = useNavigate();
  let val;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="search"
        value={value}
        onChange={(event)=>{setvalue(event.target.value)}}
        sx={{
          marginTop: marginTop,
          width: width,
          backgroundColor: '#f5f5f5',
          borderRadius: '30px',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          direction: 'ltr',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <SearchIcon onClick={()=>{ if(value !==""){ navigate(`/home/serche/${value}`);}}} sx={{ color: 'red',cursor:"pointer" }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
