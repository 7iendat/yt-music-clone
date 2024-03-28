import { useParams } from "react-router-dom";
import "./TopicScreen.css";
import keyTopic from "../../utils/keyTopic";
import { useState, useEffect } from "react";
import axios from "axios";
import Song from "../../components/Song";

const TopicScreen = () => {
  const { topicName } = useParams();
  const [songTopic, setSongTopic] = useState([]);
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function fecthData() {
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?key=${key}&part=snippet&maxResults=25&topicId=${keyTopic[topicName]}&type=video`
      );

      setSongTopic(res.data.items);
    }

    fecthData();
  }, []);
  console.log("SONG TOPIC", songTopic);
  return (
    <div className="topic-screen">
      <h2 style={{ fontSize: "24px" }}>Chủ đề {topicName}:</h2>
      {songTopic.map((item, index) => {
        return <Song key={index} item={item} />;
      })}
    </div>
  );
};

export default TopicScreen;
