import api from "@/api";

function MainPage() {
  const data = api.movie.fetchPopularMovies(1);
  console.log(data);
  return <main className="text-white">MainPage</main>;
}

export default MainPage;
