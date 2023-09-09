import { Link, useNavigate } from "react-router-dom";
import InputArea from "../components/InputArea";
import { saveToLocal, validate } from "../utils/helpers";
import { toast } from "react-toastify";
import { v4 as id } from "uuid";
import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3090";

const RegisterPage = () => {
  const [img, setImg] = useState();
  const navigate = useNavigate();
  // formu gönderme
  const handleSubmit = (e) => {
    e.preventDefault();
    // form verisi oluşturma
    const form = new FormData(e.target);
    // form verilerini objeye çevirme
    const formData = Object.fromEntries(form.entries());

    // resmi stringe çevirme
    const strImg = imageToString(formData.image);
    //! FORM KONTROL ETME
    if (validate(formData) && strImg) {
      // kullanıcıya benzersiz id verme
      formData.id = id();

      formData.image = strImg;

      // kullanıcıyı veri tabanına ekleme
      uploadUser(formData);
    } else {
      toast.info("Lütfen form alanını doldurunuz", {
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
    console.log(formData);
  };
  // resmi stringe çevirir
  const imageToString = (file) => {
    // dosya tipini doğrulama
    if (file.type === "image/jpeg" || file.type === "image/png") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // filereader class'ının resmi stringe çevirmesine yarayan komut
        reader.readAsDataURL(file);
        // resmi stringe çevirme olayı hemen olmuyor arka planda bir işlem yapıyor
        // bu işlemi izliyor
        reader.onload = () => {
          // işlem bitiğinde state'e aktarıyor
          setImg(reader.result);
        };
        reader.onerror = () => {
          toast("resmi yüklemeh hatası");
          reject(null);
        };
      });
    } else {
      toast.error("Lütfen geçerli bir dosya tipi giriniz: jpeg / png", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return null;
    }
  };

  // kullanıcıyı veri tabanına ekler
  const uploadUser = (user) => {
    axios
      .post("/users", user)
      .then((res) => {
        //kullanıcının id'sini localstorage ekle
        saveToLocal("token", user.id);
        // anasayfaya yönlendir
        navigate("/home");
        // bildirim verme
        toast.success("Hesabınız başarıyla oluşturuldu", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .then((err) => console.log(err));
  };
  return (
    <section className="bg-gray-900 ">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Link className="flex items-center mb-6 transition hover:scale-105">
          <img className="w-8 h-8 mr-2 " src="/logo.svg" />
          <span className="text-2xl font-semibold text-white">Flow</span>
        </Link>

        <div className="w-full sm:max-w-md bg-gray-800 border border-gray-500 rounded-lg shadow ">
          <div className="p-6 text-gray-300 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="border border-gray-500 text-center font-bold py-2 rounded-lg">
              Kayıt Ol
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputArea
                label={"İsim:"}
                holder={"Örn:Ahmet..."}
                name={"name"}
                type={"text"}
              />
              <InputArea
                label={"Email:"}
                holder={"example@example.com"}
                name={"email"}
                type={"email"}
              />

              <InputArea
                label={"Şifre:"}
                holder={"••••••••"}
                name={"password"}
                type={"password"}
              />
              <InputArea
                label={"Profil Fotoğrafı:"}
                name={"image"}
                type={"file"}
              />

              <button className="w-full bg-blue-800 transition hover:bg-blue-900 font-medium rounded-lg px-5 py-2.5 text-sm">
                Kayıt Ol
              </button>
              <p className="text-sm text-gray-400">
                Hesabınız var mı ?
                <Link
                  to={"/login"}
                  className="mx-2 text-gray-300 hover:underline hover:text-white"
                >
                  Giriş Yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
