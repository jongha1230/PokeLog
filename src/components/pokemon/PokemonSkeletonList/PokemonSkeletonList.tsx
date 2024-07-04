const PokemonSkeletonList = ({ count = 12 }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <li
          key={index}
          className="border shadow-md p-4 m-4 rounded-3xl w-48 bg-white"
        >
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </li>
      ))}
  </>
);

export default PokemonSkeletonList;
