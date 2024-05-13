import { useState } from 'react';
import SVGLight from '../stars/SVGLight';
import { SVGSolid } from '../stars/SVGSolid';

function StarRating({
    starsCount = 3,
    color,
    size,
    onUserRating,
    userRating
}: {
    starsCount?: number;
    color?: string;
    size?: number;
    userRating?: number;
    onUserRating: (rating: number) => void;
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
        onUserRating(index + 1);
        setStarsActive(index);
    };
    return (
        <div className=''>
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
                )
            )}
            <div>{userRating}</div>
        </div>
    );
}

export default StarRating;
