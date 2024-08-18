export const transformPhotos = (items) => {
  delete items?.logos;

  for (let key in items) {
    items[key] = items[key].map((item) => item.file_path);
  }

  return items;
};

export const transformVideos = (items) => {
  return items.map(({ key, name, type, published_at }) => ({
    key,
    name,
    type,
    published_at,
  }));
};

export const transformReviews = (items) => {
  return items.map(({ id, author, content }) => ({
    id,
    author,
    content,
  }));
};
