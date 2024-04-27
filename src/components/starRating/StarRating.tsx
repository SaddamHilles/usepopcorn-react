import { useState } from 'react';
import SVGLight from '../stars/SVGLight';
import { SVGSolid } from '../stars/SVGSolid';

function StarRating({
  starsCount = 3,
  color,
  size,
}: {
  starsCount?: number;
  color?: string;
  size?: number;
}) {
  const [hoverNumber, setHoverNumber] = useState(0);
  const [hover, setHover] = useState(false);
  const [starsActive, setStarsActive] = useState(0);

  const handleMouseOver = (index: number) => {
    setHover(true);
    setHoverNumber(index);
  };
  const handleMouseOut = () => {
    setHover(false);
    setHoverNumber(0);
  };
  const handleClick = (index: number) => {
    setStarsActive(index);
  };
  return (
    <div>
      {Array.from({ length: starsCount }, (_, i) =>
        (hover ? hoverNumber : starsActive) >= i ? (
          <SVGSolid
            size={size}
            onMouseOut={handleMouseOut}
            onMouseOver={() => handleMouseOver(i)}
            onClick={() => handleClick(i)}
            color={color}
            key={i}
          />
        ) : (
          <SVGLight
            size={size}
            onMouseOut={handleMouseOut}
            onMouseOver={() => handleMouseOver(i)}
            onClick={() => handleClick(i)}
            color={color}
            key={i}
          />
        ),
      )}
    </div>
  );
}

export default StarRating;
