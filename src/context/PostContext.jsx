import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  });

  const addPost = (newPost) => {
    axios.post("/posts", newPost).then(() => {
      toast.success("Gönderildi");
    });
  };
  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
