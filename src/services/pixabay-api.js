function fetchImage(name, page) {
  const BASE_URL = "https://pixabay.com/api";
  const API_KEY = "21721855-87ebe3c583662dfcae4faca3d";
  const url = `${BASE_URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json().then((data) => data.hits);
    }

    return Promise.reject(new Error(`No image`));
  });
}

const api = {
  fetchImage,
};

export default api;
