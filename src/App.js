import { useRef, useState } from "react";
import './App.css';
import { ImageCrallery } from './ImageCrallery';

function App() {
  //取得した文字列を格納
  const [fetchData, setFetchData] = useState([]);
  //入力された文字列を監視する
  const ref = useRef();

  const handlesubmit = (e) => {
    //更新防ぐ
    e.preventDefault();
    console.log(ref.current.value);

    //API URL
    const endpointURL = `https://pixabay.com/api/?key=ユーザが入力&q=${ref.current.value}&image_type=photo`;

    //APIをたたく（データフェッチング）
    fetch(endpointURL)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      setFetchData(data.hits);
    });

  };


  return (
    <div className="container">
      <h2>My Pixabay</h2>
      {/*Enter時に入力された値を関数に渡す */}
      <form onSubmit ={(e)=>handlesubmit(e)}>
        <input 
          type="text" 
          placeholder='画像を探す' 
          ref={ref}
        />
      </form>
      <ImageCrallery fetchData={fetchData} />
    </div>
  );
}

export default App;
