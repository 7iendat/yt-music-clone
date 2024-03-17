import React,{ useState} from "react";
import "./inputSearch.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const InputSearch = () => {
  const history = useNavigate()
  const [keyword , setKeyword] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    history(`search/${keyword}`)
    
  }
  return (
    <div className=" pl-[96px] font-sans">
      <form role="search" className="search-container ">
        <button  type="submit" onClick={handleSubmit}>
        <div className="search-icon text-white text-[20px]"><FontAwesomeIcon icon={faMagnifyingGlass} /></div></button>
        <input className="input-search text-white font-normal" value={keyword} onChange={(e) => {setKeyword(e.target.value)}} type="search" aria-label="Tìm kiếm..."
          placeholder="Tìm bài hát, nghệ sĩ, podcast" />
      </form>
    </div>
  );
};

export default InputSearch;
