import React,{ useState} from "react";
import "./inputSearch.css";
import { useNavigate } from "react-router-dom";



const InputSearch = () => {
  const history = useNavigate()
  const [keyword , setKeyword] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    history(`search/${keyword}`)
    
  }
  return (
    <div className="">
      <form role="search" className="search-container">
        <button  type="submit" onClick={handleSubmit}>
        <div className="search-icon"></div></button>
        <input className="input-search" value={keyword} onChange={(e) => {setKeyword(e.target.value)}} type="search" aria-label="Tìm kiếm..."
          placeholder="Tìm bài hát, nghệ sĩ, podcast" />
      </form>
    </div>
  );
};

export default InputSearch;
