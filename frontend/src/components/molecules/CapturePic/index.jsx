import { Hidden } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useRef } from "react";
import AlertBox from "../../atoms/AlertBox";
import CloseMark from "./../../../assets/favicon/closemark.svg";

function CapturePic({ imageList, selectImg, setToggle, toggle }) {
  const modalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (toggle && !modalRef.current.contains(event.target)) {
      setToggle(false);
    }
  };
  return (
    <>
      <AlertBox color="bg-white">
        <div className="ml-[0.5em] mr-[1em] mt-[1em] flex flex-row justify-between">
          <div className="ml-[0.5em] mt-[0.5em] font-chick text-3xl">
            사진 확대
          </div>
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <img
              className="inline after:mr-5 w-[3em]"
              src={CloseMark}
              alt="x표시"
            />
          </button>
        </div>
        <hr />
        <div className="ml-[5em] h-[300px] max-h-5">
          <ImageList
            sx={{ width: 650, scrollbar: "hidden" }}
            hideScrollbar
            cols={1}
            rowHeight={460}
          >
            {imageList.map((item, i) =>
              selectImg == i ? (
                <ImageListItem key={i}>
                  <img
                    src={`${item.s3Url}?w=650&h=400&fit=crop&auto=format`}
                    className="border-2 border-black border-opacity-75"
                    loading="lazy"
                  />
                </ImageListItem>
              ) : null
            )}
          </ImageList>
        </div>
      </AlertBox>
    </>
  );
}

export default CapturePic;
