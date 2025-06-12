import { MainLayout } from "./layouts";
import {
  Homepage,
  Aboutpage,
  Watchpage,
  Subscriptionpage,
  Shortspage,
  Historypage,
  Likedpage,
  Playlistspage,
  Loginpage,
  Signuppage,
  Uploadpage,
  Channelpage,
} from "./pages";
import { Route, Routes } from "react-router-dom";
function App() {
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
        <Route path="about" element={<Aboutpage />} />
        <Route path="history" element={<Historypage />} />
        <Route path="likedVideos" element={<Likedpage />} />
        <Route path="playlists" element={<Playlistspage />} />
        <Route path="login" element={<Loginpage />} />
        <Route path="signup" element={<Signuppage />} />
        <Route path="upload" element={<Uploadpage />} />
        <Route path="channel" element={<Channelpage />}></Route>
        <Route
          path="watch/:id"
          element={<Watchpage suggestedVideos={suggestedVideos} />}
        />
        <Route path="subscriptions" element={<Subscriptionpage />} />
        <Route path="shorts" element={<Shortspage />} />
      </Route>
    </Routes>
  );
}

export default App;
