const Endpoint = {
  ALLVIDEOS: "videos",
  VIDEO_BY_ID: (id) => `videos/${id}`,
  VIDEOS_OF_CHANNEL: (id) => `videos/u/${id}`,
  UPLOAD_VIDEO: "videos",
  DELETE_VIDEO_BY_ID: (id) => `videos/${id}`,
  EDIT_VIDEO_BY_ID: (id) => `videos/${id}`,
};

Object.freeze(Endpoint);

export default Endpoint;
