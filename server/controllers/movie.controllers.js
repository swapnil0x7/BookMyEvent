import Movie from "../models/movie.models.js";

export const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const movie = await Movie.create(movieData);

    res
      .status(201)
      .send({ status: true, message: "Movie created successfully!" });
  } catch (error) {
    res.status(500).send({ status: false, message: error });
  }
};

export const getMovies = async (req, res) => {
  try {
    const type = req.query.type;
    let queryFilter;

    switch (type) {
      case "UPCOMING":
        queryFilter = { releaseDate: { $gte: "2024-10-11" } };
        break;

      case "LIVE":
        queryFilter = { releaseDate: { $lte: "2024-10-10" } };
        break;

      default:
        queryFilter = {};
        break;
    }

    const list = await Movie.find(queryFilter);
    res.status(200).send({
      status: true,
      message: "Movie fetched successfully!",
      data: list,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error });
  }
};
