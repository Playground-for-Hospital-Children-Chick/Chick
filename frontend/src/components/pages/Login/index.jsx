function LoginScreen() {
  return (
    <div className="flex-initial">
      <div>
        <input className="bg-blue-100" type="text" placeholder="ID :" />
      </div>
      <div>
        <input className="bg-blue-100" type="password" placeholder="PSWD :" />
      </div>
      <button onClick="LoginProcess">로그인</button>
    </div>
  );
}

function LoginProcess() {}
