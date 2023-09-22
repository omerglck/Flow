import { BiSolidDownArrowCircle } from "react-icons/bi";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { categories } from "../../utils/constants";
import { PostContext } from "./../../context/PostContext";
import { v4 } from "uuid";
import { UserContext } from "./../../context/UserContext";
const Form = () => {
  const { addPost } = useContext(PostContext);
  const { activeUser } = useContext(UserContext);
  // kaçıncı seviyedeki inputların ekrana basılacağını belirler
  const [inputLevel, setInputLevel] = useState(0);
  // başlığın state'i
  const [title, setTitle] = useState("");
  //textarea
  const [content, setContent] = useState("");
  // category
  const [category, setCategory] = useState({
    title: "Genel Tartışma",
  });

  //   formu gönderme
  const handleSubmit = () => {
    toast.success("Tebrikler! Form gönderildi.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const newPost = {
      author: { ...activeUser, password: null },
      title,
      content,
      category,
      id: v4(),
      date: new Date(),
      comments: [],
    };
    console.log(newPost);
    // addPost(newPost);
  };
  return (
    <div>
      <div className="grid grid-cols-5 items-center  gap-4">
        <input
          disabled={inputLevel > 0}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full col-span-4 rounded p-1 text-gray-950 outline-none  font-bold"
          placeholder="Başlık..."
          type="text"
        />
        <BiSolidDownArrowCircle
          onClick={() => {
            title && setInputLevel(1);
          }}
          size={30}
          className="cursor-pointer hover:text-gray-400"
        />
      </div>

      {inputLevel > 0 && (
        <div className="grid grid-cols-5 items-center gap-4 my-5 disabled:resize-none">
          <textarea
            disabled={inputLevel > 1}
            onChange={(e) => setContent(e.target.value)}
            className="w-full col-span-4 rounded-md p-2 text-gray-950 outline-none  font-bold min-h-[150px] max-h-[400px] placeholder:text-gray-600"
            placeholder="Konu içeriğini giriniz.."
          />
          <div className="flex  gap-3">
            <BiSolidDownArrowCircle
              onClick={() => {
                content && setInputLevel(2);
              }}
              size={30}
              className="cursor-pointer hover:text-gray-400"
            />
            <AiFillCloseCircle
              onClick={() => setInputLevel(0)}
              size={30}
              className="cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}

      {inputLevel > 1 && (
        <div className="grid grid-cols-5 items-center gap-4 my-5">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full col-span-4 rounded p-1 text-gray-950 outline-none  font-bold"
          >
            {categories.map((item) => (
              <option key={item.id}>{item.title}</option>
            ))}
          </select>
          <div className="flex gap-3">
            <AiFillCheckCircle
              onClick={() => {
                category && handleSubmit();
              }}
              size={30}
              className="cursor-pointer hover:text-gray-400"
            />
            <AiFillCloseCircle
              onClick={() => setInputLevel(1)}
              size={30}
              className="cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
