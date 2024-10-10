import Movie from "../models/movie.models.js";
import Theatre from "../models/theatre.models.js";

export const createMovie = async (req, res) => {
  try {
    const movieData = req.body;

    // First check if there is a theatre with the given details
    // If not, create the theatre first then proceed to add the movie
    const { theatre } = movieData;
    const theatreDetails = theatre;

    let existingTheatre = await Theatre.findOne({ name: theatreDetails.name });
    if (!existingTheatre) {
      existingTheatre = await Theatre.create(theatreDetails);
    }

    // Adding movie
    const movie = await Movie.create({
      ...movieData,
      theatre: existingTheatre._id,
    });

    res
      .status(201)
      .send({ status: true, message: "Movie created successfully!" });
  } catch (error) {
    console.error(error); // Log the actual error to the console
    res.status(500).send({ status: false, message: error.message });
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
      case "ALL":
        break;
      case "UPCOMING":
        queryFilter.releaseDate = { $gte: new Date() };
        break;

      case "LIVE":
        queryFilter.releaseDate = { $lte: new Date() };
        break;

      default:
        break;
    }

    const list = await Movie.find(queryFilter).populate("theatre");
    res.status(200).send({
      status: true,
      message: "Movie fetched successfully!",
      data: list,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error });
  }
};
