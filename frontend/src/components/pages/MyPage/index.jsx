import CircleBox from "../../atoms/CircleBox";
import SelectCharacter from "./../../molecules/CharacterSelect/index";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import Chick from "../../../assets/characters/chick_01.svg";

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";
function MyPage() {
  const user = useSelector((state) => state.user);
  const [imageList, setImageList] = useState([]);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const modalOnOff = () => {
    setModal(!modal);
  };

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
        allowOutsideClick: false,
        allowEscapeKey: false,
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
        allowOutsideClick: false,
        allowEscapeKey: false,
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
    <div>
      <button
        onClick={() => {
          modalOnOff();
        }}
        className="absolute left-44 top-14"
      >
        <CircleBox>
          <img src={Chick} />
        </CircleBox>
      </button>
      {modal === true ? (
        <div className="-translate-x-[50%] -translate-y-[50%] left-[50%] top-[45%] absolute z-10">
          <SelectCharacter modal={modal} setModal={setModal} />
        </div>
      ) : null}
      <div className="absolute left-96 top-14">
        <div className="text-start inline mt-8">
          <div className="font-chick text-lg">{user["userChName"]}</div>
          <div className="font-chick text-base">나이: {user["userAge"]}</div>
          <div className="font-chick text-base">생일: {user["userBirth"]}</div>
          <div className="font-chick text-base">성별: {user["userSex"]}</div>
          <div className="font-chick text-base">
            출석일수: {user["attendanceDay"]}
          </div>
          <div className="font-chick text-base">
            이메일: {user["userEmail"]}
          </div>
        </div>
      </div>
      <div className="absolute left-44 top-64">
        <div className="text-start inline mt-8 mb-6">
          <div className="font-chick text-xl mb-2">저장한 사진</div>
        </div>
        {imageList.length > 0 ? (
          <ImageList sx={{ width: 600, height: 190 }} cols={2} rowHeight={170}>
            {imageList.map((item) => (
              <ImageListItem key={item.s3Url}>
                <img
                  src={`${item.s3Url}?w=164&h=164&fit=crop&auto=format`}
                  className="border-2 border-black border-opacity-75"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : null}
      </div>
      {/* 차단 유저 리스트 */}
      <div className="absolute right-44 top-64">
        <div className="text-start inline mt-8 mb-6">
          <div className="font-chick text-xl mb-2">정온's 차단 유저 리스트</div>
        </div>
        <div class="flex justify-center">
          <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
              엄희원
            </li>
            <li class="px-6 py-2 border-b border-gray-200 w-full">김주성</li>
            <li class="px-6 py-2 border-b border-gray-200 w-full">한재욱</li>
            <li class="px-6 py-2 border-b border-gray-200 w-full">김민준</li>
            <li class="px-6 py-2 w-full rounded-b-lg">ex-girlfriend</li>
          </ul>
        </div>
      </div>

      <div className="absolute right-5 top-14">
        <AiOutlineSetting size={60} />
      </div>
    </div>
  );
}

export default MyPage;
