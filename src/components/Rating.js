import React from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Rating = ({ text, value, color }) => {
  return (
    <div className="rating">
        <span style={{color}}>
            {Array(5).fill([0]).map((item, index) => {
                if (parseInt(value) === index && value !== index) return <StarHalfIcon key={index} />;
                if (value >= index + 1) return <StarIcon key={index} />;
                return <StarBorderIcon key={index} />;
            })}
        </span>
        <span>{text && text}</span>
    </div>
  );
};

export default Rating;
