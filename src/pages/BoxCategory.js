import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useMediaQuery } from '@mui/material';
export default function BoxCategory({ category, active, setActive, equalWidth = false }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const mTop = isDesktop ? "30px" : "20px";

  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        marginTop: mTop,
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        paddingBottom: "5px",
      }}
    >
      {category.map((cate, index) => (
        <Button
          key={index}
          variant={active === index ? "contained" : "text"}
          onClick={() => setActive(index)}
          sx={{
            color: active === index ? "#fff" : red[600],
            backgroundColor: active === index ? red[600] : "transparent",
            fontWeight: "600",
            padding: "5px",
            borderRadius: "10px",
            borderColor: red[600],
            flexShrink: 0,
            ...(equalWidth && { flex: 1 }), 
            '&:hover': {
              backgroundColor: active === index ? red[700] : red[50],
            },
          }}
        >
          {cate.label ?? cate}
        </Button>
      ))}
    </div>
  );
}
