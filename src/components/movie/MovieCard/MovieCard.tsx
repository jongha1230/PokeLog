import { Movie } from "@/types/MovieType";

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="mx-4">
      <li className="border px-4 shadow-md ">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 min-h-14">{movie.title}</h3>
          <p className="text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Rating: {movie.vote_average}
            </span>
            <span className="text-sm text-gray-600">
              Votes: {movie.vote_count}
            </span>
          </div>
        </div>
      </li>
    </div>
  );
}

export default MovieCard;
