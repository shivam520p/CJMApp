import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const BagIcon: React.FC<SvgProps> = (props) => {
    return (
        <Svg
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="none"
            {...props}
        >
            <Path
                d="M32 40V8C32 6.93913 31.5786 5.92172 30.8284 5.17157C30.0783 4.42143 29.0609 4 28 4H20C18.9391 4 17.9217 4.42143 17.1716 5.17157C16.4214 5.92172 16 6.93913 16 8V40"
                stroke="white"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M40 12H8C5.79086 12 4 13.7909 4 16V36C4 38.2091 5.79086 40 8 40H40C42.2091 40 44 38.2091 44 36V16C44 13.7909 42.2091 12 40 12Z"
                stroke="white"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default BagIcon;
