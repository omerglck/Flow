import { Link } from "react-router-dom";
import InputArea from "../components/InputArea";
import { validate } from "../utils/helpers";
import { toast } from "react-toastify";
import { v4 as id } from "uuid";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { uploadUser } = useContext(UserContext);

  if (localStorage.getItem("token")) {
    navigate("/home");
  }
  // formu gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    // form verisi oluşturma
    const form = new FormData(e.target);
    // form verilerini objeye çevirme
    const formData = Object.fromEntries(form.entries());

    // resmi stringe çevirme
    const strImg = await imageToString(formData.image);

    // console.log(strImg);
    //! FORM KONTROL ETME
    if (validate(formData) && strImg) {
      // kullanıcıya benzersiz id verme
      formData.id = id();

      formData.image = strImg;

      // kullanıcıyı veri tabanına ekleme
      uploadUser(formData);
      console.log(uploadUser(formData));
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
    // console.log(formData);
  };
  // resmi stringe çevirir
  const imageToString = async (file) => {
    // dosya tipini doğrulama
    if (file.type === "image/jpeg" || file.type === "image/png") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = () => {
          toast.error("Resim yüklenirken hata oluştu, tekrar deneyiniz", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
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
