import Form from "./Form";
const MainPage = () => {
  return (
    <div className="bg-gray-900 h-screen text-white grid grid-cols-4">
      <div>left-area</div>
      <div className="col-span-3 p-4 pe-20 md:col-span-2 md:pe-0">
        <Form />
      </div>
      <div className="hidden md:block">right-area</div>
    </div>
  );
};

export default MainPage;
