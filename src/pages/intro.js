import '../App.css'
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function Intero(){
    return (
        <div className="intero" >
            <div className='intero_text'>
            <h1>Welcome to FitBite</h1>
            <p>
            Start your journey towards a healthier, stronger you.
            Discover nutritious, high-protein recipes designed to support your fitness goals — whether you’re building muscle, losing weight, or simply staying in shape.
            🥗 Every recipe is crafted to fuel your body and keep you on track.
            </p>
            <Link to="/home">
            <Button variant="contained" sx={{padding:"10px",width:"200px",background:red[600],fontWeight:"400"}} >Get start</Button>
            </Link>

            </div>
        </div>
    )
}