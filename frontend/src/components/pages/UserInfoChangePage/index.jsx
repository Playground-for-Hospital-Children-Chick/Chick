import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";

import InputBox from "../../atoms/Input";
import CommonBtn from "../../atoms/CommonBtn";

function UserInfoChangePage(params) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="form-entire w-full mb-[7em] justify-center flex flex-row"></div>
    </>
  );
}

export default UserInfoChangePage;
