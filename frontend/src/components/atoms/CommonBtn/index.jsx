import { StyledCommonBtn } from "./CommonBtn.styled";

const CommonBtn = ({ buttonName }) => {
  return <StyledCommonBtn>{buttonName}</StyledCommonBtn>;
};

CommonBtn.defaultProps = {
  buttonName: "default",
};

export default CommonBtn;
