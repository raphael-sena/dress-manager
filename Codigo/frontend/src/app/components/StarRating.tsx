import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'; 

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
  const handleClick = (index: number) => {
    onChange(index); 
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div 
          key={star} 
          className="cursor-pointer py-2 transition-transform duration-200 transform hover:scale-125"
          onClick={() => handleClick(star)}
        >
          {star <= rating ? (
            <FaStar className="text-yellow-500 w-5 h-5" /> 
          ) : (
            <FaRegStar className="text-gray-300 w-5 h-5" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
