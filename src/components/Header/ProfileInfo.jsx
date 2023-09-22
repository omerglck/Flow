import { useState } from "react";

const ProfileInfo = ({ activeUser, logoutFromAccount }) => {
  const [show, setShow] = useState(false);
  let countDown;
  return (
    <div
      onMouseEnter={() => {
        // saniye bitmeden tekrar mouse üzerine gelirse geri sayımı durdur
        clearTimeout(countDown);
        setShow(true);
      }}
      onMouseLeave={() => {
        // mouse'u üzerinden çektiğimiz anda geri sayımı başlat
        countDown = setTimeout(() => {
          setShow(false);
        }, 700);
      }}
      className="relative flex items-center gap-4 cursor-pointer p-1 rounded-md transition hover:bg-gray-700 "
    >
      <img src={activeUser.image} className="w-10 h-10 rounded-full" />
      <h2 className="font-bold">{activeUser.name}</h2>

      {show && (
        <div className="absolute top-16 w-[180px] -start-10 bg-gray-600 rounded-md  p-1">
          <p className="rounded p-2">{activeUser.email}</p>
          <p className="rounded p-2 hover:bg-gray-400">Profili Göster</p>
          <p
            className="rounded p-2 hover:bg-gray-400"
            onClick={logoutFromAccount}
          >
            Çıkış Yap
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
