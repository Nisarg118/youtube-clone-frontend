import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "./layouts";
import Spinner from "./components/Spinner"; // Loading fallback
import CheckAuth from "./utils/checkAuth";
import PublicOnlyRoute from "./utils/PublicOnlyRoute";
import { Editpage } from "./pages";
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

export default function App() {
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
    <Suspense fallback={<Spinner />}>
      <Routes>
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
          <Route path="channel" element={<Channelpage />} />
          <Route path="upload" element={<Uploadpage />} />
          <Route path="edit/:id" element={<Editpage />} />
          <Route path="profile/dashboard" element={<Dashboard />} />
          <Route path="history" element={<Historypage />} />
          <Route path="playlists" element={<Playlistspage />} />
          <Route path="subscriptions" element={<Subscriptionpage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
