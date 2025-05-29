import { MainLayout } from "./layouts";
import {
  Homepage,
  Aboutpage,
  Watchpage,
  Subscriptionpage,
  Shortspage,
  Historypage,
} from "./pages";
import { Route, Routes } from "react-router-dom";
function App() {
  const vid = {
    id: "abc123",
    title: "How to Build a YouTube Clone",
    channelAvatar:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    channelName: "CodeWithDev",
    subscribers: "1.2M",
    views: "3.4M views",
    uploaded: "2 weeks ago",
    description:
      "In this video, we will build a YouTube clone using React... In this video, we will build a YouTube clone using React... In this video, we will build a YouTube clone using React...In this video, we will build a YouTube clone using React...In this video, we will build a YouTube clone using React...",
  };

  const exampleVideo = {
    thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    title: "React Crash Course React Crash course",
    channelName: "CodeWithAI",
    channelAvatar:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    views: "1.2M views",
    uploaded: "2 weeks ago",
    duration: "12:34", // 🕒 Add this
  };

  const suggestedVideos = Array.from({ length: 21 }, (_, i) => ({
    ...exampleVideo,
    title: `${exampleVideo.title} #${i + 1}`,
  }));

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="about" element={<Aboutpage />}>
          <Route path="history" element={<Historypage />} />
        </Route>
        <Route
          path="watch/:id"
          element={<Watchpage vid={vid} suggestedVideos={suggestedVideos} />}
        />
        <Route path="subscriptions" element={<Subscriptionpage />} />
        <Route path="shorts" element={<Shortspage />} />
      </Route>
    </Routes>
  );
}

export default App;
