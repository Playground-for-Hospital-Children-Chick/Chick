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

const APPLICATION_SERVER_URL = "https://i8b207.p.ssafy.io/";

function MyPage() {
  const user = useSelector((state) => state.user);
  const [unblockUser, setUnblockUser] = useState(undefined);
  const [imageList, setImageList] = useState([]);
  const [modal, setModal] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [profilePath, setProfilePath] = useState(
    "/assets/characters/chick_01.svg"
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const modalOnOff = () => {
    setModal(!modal);
  };

  useEffect(() => {
    checkLogin();
    getPictureList();
    getBlockList();
    getProfile();
  }, []);

  const unblock = (email) => {
    Swal.fire({
      icon: "info",
      title: "차단 해제.",
      text: "차단을 해제할까요?.",
      showDenyButton: true,

      confirmButtonText: "차단 해제",
      denyButtonText: `취소`,
      confirmButtonColor: "#8cc8ff",
      denyButtonColor: "#ff82b3",

      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete 요청 메일", email);
        axios({
          method: "delete",
          url: APPLICATION_SERVER_URL + "api/report/unblock",
          data: {
            reportedPeople: email,
            reporter: user["userEmail"],
          },
          // headers: { "Content-Type": "application/json;charset=UTF-8" },
        }).then(() => {
          window.location.reload;
        });
      } else if (result.isDenied) {
        return;
      }
    });
    return;
  };

  function getProfile() {
    axios({
      method: "get",
      url: APPLICATION_SERVER_URL + "api/users/profile",
      params: {
        email: user["userEmail"],
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then((response) => {
      console.log("response", response);
      console.log("response.data", response.data);
      if (response.status == 200) {
        const filePath = response.data.filePath;
        setProfilePath(filePath);
      }
    });
  }

  function getPictureList() {
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
  }

  function getBlockList() {
    axios({
      method: "get",
      url: APPLICATION_SERVER_URL + "api/report/blockList",
      params: {
        userEmail: user["userEmail"],
      },
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then((response) => {
      console.log(
        "response!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        response.data[0].email
      );
      if (response.status == 200) {
        const blockedList = response.data;
        if (blockedList != null) {
          setBlockList((old) => [...old, ...blockedList]);
          console.log("blocklist~~~~~~~~~~~~~", blockedList);
        }
      }
    });
  }

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

  function withdrawal() {
    Swal.fire({
      title: "비밀번호 입력",
      input: "password",
      showCancelButton: false,
      confirmButtonText: "회원탈퇴",
      preConfirm: (password) => {
        axios({
          method: "delete",
          url: APPLICATION_SERVER_URL + "api/users",
          params: {
            email: user["userEmail"],
            password: password,
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        }).then((response) => {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: "회원 탈퇴 성공",
              confirmButtonText: "확인",
              confirmButtonColor: "#8cc8ff",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(DELETE_TOKEN());
                dispatch(DELETE_USER());
                navigate("/home");
                return;
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "회원 탈퇴 실패",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      },
    });
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
          <img src={profilePath} />
        </CircleBox>
      </button>
      {modal === true ? (
        <div className="-translate-x-[50%] -translate-y-[50%] left-[50%] top-[45%] absolute z-10">
          <SelectCharacter
            modal={modal}
            setModal={setModal}
            email={user["userEmail"]}
            setProfilePath={setProfilePath}
          />
        </div>
      ) : null}
      <div className="absolute left-96 top-14">
        <div className="text-start inline mt-8">
          <div className="font-chick text-lg">{user["userChName"]}</div>
          <div className="font-chick text-base">나이: {user["userAge"]}살</div>
          <div className="font-chick text-base">생일: {user["userBirth"]}</div>
          <div className="font-chick text-base">
            성별: {user["userSex"] == "M" ? "남자" : "여자"}
          </div>
          <div className="font-chick text-base">
            출석일수: {user["attendanceDay"]}일
          </div>
          <div className="font-chick text-base">
            이메일: {user["userEmail"]}
          </div>
        </div>
      </div>

      <div className="absolute left-44 top-64">
        <div className="text-start inline mt-8 mb-6">
          <div className="font-chick text-xl mb-2">사진 보관함</div>
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
      <div className="absolute right-64 top-64">
        <div className="text-start inline mt-8 mb-6">
          <div className="font-chick text-xl mb-2">
            {user["userChName"]}'s 차단 유저 리스트
          </div>
        </div>
        {blockList.length > 0 ? (
          <div className="flex justify-between h-[230px] overflow-y-scroll flex-col scrollbar-hide">
            {blockList.map((item, i) => (
              <div
                key={i}
                className="font-chick mt-3 p-6 rounded-lg shadow-lg bg-pink-300 max-w-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                onClick={() => {
                  unblock(item.email);
                }}
              >
                <div className="font-chick text-gray-900 text-xl leading-tight font-medium mb-2">
                  {item.name}
                </div>
                {item.reportDate}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="absolute right-5 top-14">
        <AiOutlineSetting size={60} />
      </div>
      <button onClick={withdrawal}>
        <div className="absolute bottom-5 right-5 font-chick text-lg">
          회원탈퇴
        </div>
      </button>
    </div>
  );
}

export default MyPage;
