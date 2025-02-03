import { useState } from "react";
import { BsStars } from "react-icons/bs";

function App() {
  const [download, setDownload] = useState(false);
  const [text, setText] = useState("");

  const getHtml = async () => {
    const res = await fetch("https://chatgpt.com/c/679e4e85-5200-800b-b476-8a81b866eb18");
    const html = await res.text();
    setText(html);
  };

  return (
    // <div className="w-full h-full">
    //   <p className="text-white">{text}</p>
    //   <div className="absolute top-12 right-4 flex flex-col justify-center items-center gap-1 text-black">
    //     <div className={`${download ? "opacity-100" : "opacity-0"} w-60 h-20 bg-white rounded-lg transition-all duration-500`}></div>
    //     <button
    //       className="rounded-full text-gray-100 bg-gray-800 border-[1px] border-[hsla(0, 0%, 100%, .15)] text-[.875rem] leading-[1.25rem] py-2 px-2 flex gap-1.5 justify-center items-center w-30 cursor-pointer"
    //       onClick={() => {
    //         setDownload((prev) => !prev);
    //       }}
    //     >
    //       <p>Add Note</p>
    //       <BsStars color="purple" size={20} />
    //     </button>
    //   </div>
    // </div>
    <span className="border-4 ">
      <button
        className="rounded-full text-gray-100 bg-gray-800 border-2 border-gray-100 text-[.875rem] leading-[1.25rem] py-2 px-1 flex gap-1 justify-center items-center w-30 cursor-pointer font-normal"
        onClick={() => {
          setDownload((prev) => !prev);
          extractHtml();
        }}
      >
        <div>Add Note</div>
        <BsStars color="white" size={20} />
      </button>
      <div className={`${download ? "opacity-100" : "opacity-0"} w-60 h-20 bg-white rounded-lg transition-all duration-500`}></div>
    </span>
  );
}

export default App;
