import "./inputSearch.css";

const InputSearch = () => {
  return (
    <div className="search-container">
      <div className="search-icon"></div>
      <input
        className="input-search"
        placeholder="Tìm bài hát, nghệ sĩ, podcast"
      ></input>
    </div>
  );
};

export default InputSearch;
