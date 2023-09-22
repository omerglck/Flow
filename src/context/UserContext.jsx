import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3090";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState();
  const user_id = localStorage.getItem("token");

  // sayfa yüklendiğinde aktif kullanıcıyı çek
  useEffect(() => {
    if (user_id) {
      axios
        .get(`/users/${user_id}`)
        .then((res) => setActiveUser(res.data))
        .catch((err) =>
          toast.error("Hesap Bilgilerine erişirken hata oluştu.")
        );
    } else navigate("/login");
  }, []);

  const navigate = useNavigate();
  // kullanıcıyı veri tabanına ekler
  const uploadUser = (user) => {
    axios
      .post("/users", user)
      .then(() => {
        // kullanıcının id'sini local'storege'a ekle
        localStorage.setItem("token", user.id);
        // activeUser state'ini günceller
        setActiveUser(user);
        // anasayfaya yönlendir
        navigate("/home");
        // bildirim verme
        toast.success("Hesabınız oluşturuldu", { autoClose: 3000 });
      })
      .catch((err) => {
        console.log("Hesap oluşturulamıyor", err);
      });
  };

  // kullanıcının hesabına giriş yapar
  const loginToAccount = (email, pass) => {
    const params = {
      email,
      password: pass,
    };
    // parametreleri uzun uzun /users'ın devamına yazmak yerine params objesi ile
    // daha kolay bir şekilde tanımlarız
    axios
      .get(`/users`, { params })
      .then((res) => {
        if (res.data.length === 0) {
          toast.error("Bilgilerinizle eşleşen kullanıcı bulunamadı", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setActiveUser(res.data[0]);
          localStorage.setItem("token", res.data[0].id);
          navigate("/home");
          toast.success("Hesaba giriş yapıldı.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // kullanıcıyı hesaptan çıkar
  const logoutFromAccount = () => {
    localStorage.removeItem("token");

    navigate("/login");

    setActiveUser(null);

    toast.warn("Hesaptan çıkış yapıldı", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <UserContext.Provider
      value={{ uploadUser, activeUser, loginToAccount, logoutFromAccount }}
    >
      {children}
    </UserContext.Provider>
  );
};
