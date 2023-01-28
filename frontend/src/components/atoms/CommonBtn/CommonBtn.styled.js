import styled from "styled-components";
import tw from "tailwind-styled-components";

export const StyledCommonBtn = tw.div`
    flex
    inline-flex
    items-center
    border
    border-transparent
    text-sm
    bg-yellow-500
    font-medium
    rounded
    shadow-sm
    text-white

    hover:bg-indigo-700
    focus:outline-none
`;
