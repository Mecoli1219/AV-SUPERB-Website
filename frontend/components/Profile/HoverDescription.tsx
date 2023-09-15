import React, { useState, useRef } from 'react';

const HoverDescription = ({ description, key }: {
    description: string,
    key: string
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeoutRef = useRef<number | null>(null);
    const handleMouseEnter = () => {
        hoverTimeoutRef.current = window.setTimeout(() => {
            setIsHovered(true);
        }, 1000); // 1000 milliseconds (1 second)
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current !== null) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovered(false);
    };
    return <td
        key={key}
        className={`px-6 py-4 border-b hover:bg-gray-100 transition-all duration-1000`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <div className={` ${isHovered ? 'max-w-xs break-words whitespace-pre-wrap' : 'w-32 truncate  m-auto'}`}>
            {description}
        </div>
    </td>
}

export default HoverDescription;