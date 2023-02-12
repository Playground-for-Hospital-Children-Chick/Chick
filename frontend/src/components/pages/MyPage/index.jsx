import CircleBox from "../../atoms/CircleBox";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";
function MyPage() {
  const user = useSelector((state) => state.user);
  const [imageList, setImageList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
    axios({
      method: "get",
      url: APPLICATION_SERVER_URL + "api/s3/list",
      params: {
        email: user["userEmail"],
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then((response) => {
      console.log("response", response);
      console.log("response.data", response.data);
      if (response.status == 200) {
        const fileList = response.data.filelist;
        if (fileList != null) {
          setImageList((old) => [...old, ...fileList]);
        }
      }
    });
  }, []);

  // useEffect(() => {
  // }, [imageList]);

  function checkLogin() {
    if (!user["login"]) {
      Swal.fire({
        icon: "info",
        title: "로그인이 필요한 서비스입니다.",
        text: "내 정보를 확인하려면 로그인이 필요합니다.",
        confirmButtonText: "로그인하러가기",
        confirmButtonColor: "#8cc8ff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });

      return;
    }

    if (user["userType"] === "guest") {
      Swal.fire({
        icon: "info",
        title: "게스트 로그인",
        text: "내 정보를 확인하려면 사용자 로그인이 필요합니다.",
        confirmButtonText: "로그인하러가기",
        confirmButtonColor: "#8cc8ff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
          return;
        }
      });

      return;
    }
  }

  return (
    <div className="absolute left-40 top-14">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2">
          <CircleBox />
          <div className="text-start inline ml-4 mt-8">
            <span className="font-chick text-lg">{user["userChName"]}</span>
            <div className="font-chick text-base">나이: {user["userAge"]}</div>
            <div className="font-chick text-base">
              생일: {user["userBirth"]}
            </div>
            <div className="font-chick text-base">성별: {user["userSex"]}</div>
            <div className="font-chick text-base">
              이메일: {user["userEmail"]}
            </div>
          </div>
          <div className="mt-12">
            {imageList.length > 0 ? (
              <ImageList
                sx={{ width: 1194, height: 370 }}
                cols={2}
                rowHeight={340}
              >
                {imageList.map((item) => (
                  <ImageListItem key={item.s3Url}>
                    <img
                      src={`${item.s3Url}?w=164&h=164&fit=crop&auto=format`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : null}
          </div>
        </div>
        <div>
          <AiOutlineSetting size={60} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
