const Endpoint = {
  //videos
  ALLVIDEOS: "videos",
  VIDEO_BY_ID: (id) => `videos/${id}`,
  VIDEOS_OF_CHANNEL: (id) => `videos/u/${id}`,
  UPLOAD_VIDEO: "videos",
  DELETE_VIDEO_BY_ID: (id) => `videos/${id}`,
  EDIT_VIDEO_BY_ID: (id) => `videos/${id}`,

  //user
  SIGNUP: "users/register",
  SIGNIN: "users/login",
  LOGOUT: "users/logout",
  USERCHANNELPROFILE: (userId) => `users/c/${userId}`,

  //subscription
  SUBSCRIBERSNO: (id) => `subscriptions/c/${id}`,
  CHANGESUBSCRIPTION: (id) => `subscriptions/c/${id}`,
  SUBSCRIBECHANNELS: "subscriptions/u/",

  //like
  TOGGLE_LIKE: (mediaId) => `likes/toggle/v/${mediaId}?targetType=video`, //here mediaId can be of video as well as post
  GET_LIKE_COUNTS: (mediaId) => `likes/${mediaId}?targetType=video`,
  GET_LIKED_VIDEOS: "likes/videos",

  //playlist
  CREATE_PLAYLIST: "playlist",
  USER_PLAYLISTS: (id) => `playlist/user/${id}`, //This will fetch a channel's playlists
  PLAYLIST_BY_ID: (playlistId) => `playlist/${playlistId}`,
  UPDATE_PLAYLIST: (playlistId) => `playlist/${playlistId}`,
  DELETE_PLAYLIST: (playlistId) => `playlist/${playlistId}`,
  ADD_VIDEO_TO_PLAYLIST: (videoId, playlistId) =>
    `playlist/add/${videoId}/${playlistId}`,
  REMOVE_VIDEO_FROM_PLAYLIST: (videoId, playlistId) =>
    `playlist/remove/${videoId}/${playlistId}`,

  //tweet
  CREATE_TWEET: "tweets",
  GET_USER_TWEETS: (id) => `tweets/user/${id}`,
  UPDATE_TWEET: (id) => `tweets/${id}`,
  DELETE_TWEET: (id) => `tweets/${id}`,

  //comment
  ADD_COMMENT: (videoId) => `comments/${videoId}`,
  GET_COMMENTS: (videoId) => `comments/${videoId}`,
  UPDATE_COMMENT: (commentId) => `comments/c/${commentId}`,
  DELETE_COMMENT: (commentId) => `comments/c/${commentId}`,
};

Object.freeze(Endpoint);

export default Endpoint;
