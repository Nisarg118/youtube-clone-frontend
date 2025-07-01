import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "./layouts";
import Spinner from "./components/Spinner";
import CheckAuth from "./utils/checkAuth";
import PublicOnlyRoute from "./utils/PublicOnlyRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Aboutpage = lazy(() => import("./pages/Aboutpage"));
const Historypage = lazy(() => import("./pages/Historypage"));
const Playlistspage = lazy(() => import("./pages/Playlistspage"));
const Loginpage = lazy(() => import("./pages/Loginpage"));
const Signuppage = lazy(() => import("./pages/Signuppage"));
const Uploadpage = lazy(() => import("./pages/Uploadpage"));
const Channelpage = lazy(() => import("./pages/Channelpage"));
const Dashboard = lazy(() => import("./pages/Dashboardpage"));
const Watchpage = lazy(() => import("./pages/Watchpage"));
const Subscriptionpage = lazy(() => import("./pages/Subscriptionpage"));
const Shortspage = lazy(() => import("./pages/Shortspage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Editpage = lazy(() => import("./pages/Editpage"));

// 👇 Lazy-load channel tab components
const ChannelVideos = lazy(() => import("./components/Channel/ChannelVideos"));
const ChannelPlaylists = lazy(() =>
  import("./components/Channel/ChannelPlaylists")
);
const ChannelPosts = lazy(() => import("./components/Channel/ChannelPosts"));

export default function App() {
  const exampleVideo = {
    thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    title: "React Crash Course",
    channelName: "CodeWithAI",
    channelAvatar:
      "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
    views: "1.2M views",
    uploaded: "2 weeks ago",
    duration: "12:34",
  };

  const suggestedVideos = Array.from({ length: 21 }, (_, i) => ({
    ...exampleVideo,
    title: `${exampleVideo.title} #${i + 1}`,
  }));

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public only routes */}
        <Route
          path="login"
          element={
            <PublicOnlyRoute>
              <Loginpage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicOnlyRoute>
              <Signuppage />
            </PublicOnlyRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <CheckAuth>
              <MainLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Homepage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route
            path="watch/:id"
            element={<Watchpage suggestedVideos={suggestedVideos} />}
          />
          <Route path="shorts" element={<Shortspage />} />
          <Route path="upload" element={<Uploadpage />} />
          <Route path="edit/:id" element={<Editpage />} />
          <Route path="profile/dashboard" element={<Dashboard />} />
          <Route path="history" element={<Historypage />} />
          <Route path="playlists/:playlistId" element={<Playlistspage />} />
          <Route path="subscriptions" element={<Subscriptionpage />} />

          {/* ✅ Channel nested tabs */}
          <Route path="channel/:userId" element={<Channelpage />}>
            <Route path="videos" element={<ChannelVideos />} />
            <Route path="playlists" element={<ChannelPlaylists />} />
            <Route path="posts" element={<ChannelPosts />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
