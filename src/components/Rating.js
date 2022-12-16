import React from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Rating = ({ text=null, value, color, className }) => {
  return (
    <div className={`rating ${className}`}>
        <span style={{color}}>
            {Array(5).fill([0]).map((item, index) => {
                if (parseInt(value) === index && value !== index) return <StarHalfIcon key={index} />;
                if (value >= index + 1) return <StarIcon key={index} />;
                return <StarBorderIcon key={index} />;
            })}
        </span>
        {text && <span>{text}</span>}
    </div>
  );
};

export default Rating;




Rating.defaultProps = {
  color:"orange"
}