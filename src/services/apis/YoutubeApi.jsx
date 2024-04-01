import axios from "axios";

export const fecthDataChannel = async (nameChannel, key) => {
  let res = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${nameChannel}&type=channel&key=${key}`
  );

  return res;
};
