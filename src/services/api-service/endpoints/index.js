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

  //subscription
  SUBSCRIBERSNO: (id) => `subscriptions/c/${id}`,
  CHANGESUBSCRIPTION: (id) => `subscriptions/c/${id}`,
  SUBSCRIBECHANNELS: "subscriptions/u/",

  //like
  TOGGLELIKE: (id) => `likes/toggle/v/${id}`,
  GETLIKECOUNTS: (id) => `likes/${id}`,
  GETLIKEDVIDEOS: "likes/videos",
};

Object.freeze(Endpoint);

export default Endpoint;
