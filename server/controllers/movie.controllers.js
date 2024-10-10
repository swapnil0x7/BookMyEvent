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
    let queryFilter = {};
    const type = req.query.type;
    const title = req.query.title;

    // search query filter
    if (title) {
      queryFilter.title = new RegExp(title, "i");
    }

    // query filter for LIVE, UPCOMING movie list 
    switch (type) {
      case "UPCOMING":
        queryFilter.releaseDate = { $gte: new Date() };
        break;

      case "LIVE":
        queryFilter.releaseDate = { $lte: new Date() };
        break;

      default:
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
