import React, { useEffect, useState } from "react";
import moviesData from "./moviesData";
import bgImage from "../images/peakpx.jpg";

import {
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

const MoviesList = ({ direction, ...args }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [langDropdownOpen, setLangDropdownOpen] = useState([]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    setMovieDetails(moviesData);
    setLangDropdownOpen(Array(moviesData.length).fill(false));
    setCountryDropdownOpen(Array(moviesData.length).fill(false));
  }, []);

  const toggleLang = (index) => {
    setLangDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleCountry = (index) => {
    setCountryDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setSelectedLanguage("");
    setSelectedGenre("");
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setSearchTerm("");
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSearchTerm("");
  };

  const languages = [
    ...new Set(movieDetails.flatMap((data) => data.movielanguages)),
  ];

  const genres = [
    ...new Set(movieDetails.flatMap((data) => data.moviegenres)),
  ];

  const filteredMovies = movieDetails.filter((movie) => {
    const titleMatch = movie.movietitle.toLowerCase().includes(searchTerm);
    const languageMatch =
      selectedLanguage === "" ||
      movie.movielanguages.includes(selectedLanguage);
    const genreMatch =
      selectedGenre === "" || movie.moviegenres.includes(selectedGenre);
    return titleMatch && languageMatch && genreMatch;
  });

  return (
    <div>
      <div>
        <div>
          <img
            src={bgImage}
            alt="img"
            width={"100%"}
            className="bg-image"
          />
        </div>
        <Container className="search-container">
          <h2>Movies World</h2>
          <Input
            type="text"
            placeholder="Search Movies"
            onChange={handleSearch}
            value={searchTerm}
          />
          <div className="select-area">
            <Input
              className="mb-3"
              type="select"
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={selectedLanguage}
            >
              <option value="">Language</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </Input>
            <Input
              className="mb-3"
              type="select"
              onChange={(e) => handleGenreChange(e.target.value)}
              value={selectedGenre}
            >
              <option value="">Genre</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </Input>
          </div>
        </Container>
      </div>
      <Container className="main-row">
        <Row>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((data, index) => (
              <Col key={index} md={3} l className="card-container">
                <Card>
                  <div className="card-title">
                    <CardBody>
                      <h4>{data.movietitle}</h4>
                      <h6 className="mb-2 text-muted">{data.imdbmovieid}</h6>
                    </CardBody>
                  </div>
                  <img
                    alt="Card cap"
                    src={data.moviemainphotos[0]}
                    width="100%"
                  />
                  <CardBody>
                    <CardText>
                      <div className="card-dropdown-area">
                        <Dropdown
                          isOpen={langDropdownOpen[index]}
                          toggle={() => toggleLang(index)}
                          direction={direction}
                        >
                          <DropdownToggle caret color="success">
                            Languages
                          </DropdownToggle>
                          <DropdownMenu {...args}>
                            {data.movielanguages.map((item, languageIndex) => (
                              <div key={languageIndex}>
                                <DropdownItem header>{item}</DropdownItem>
                              </div>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                        <Dropdown
                          isOpen={countryDropdownOpen[index]}
                          toggle={() => toggleCountry(index)}
                          direction={direction}
                        >
                          <DropdownToggle caret color="warning">
                            Countries
                          </DropdownToggle>
                          <DropdownMenu {...args}>
                            {data.moviecountries.map((item, countryIndex) => (
                              <div key={countryIndex}>
                                <DropdownItem header>{item}</DropdownItem>
                              </div>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </CardText>
                    <div className="card-footer">
                      {data.moviegenres.map((item, genreIndex) => (
                        <div key={genreIndex} md={6} className="genre-list">
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12} className="nodata">
              <h2>No Data Found...!!</h2>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesList;

MoviesList.propTypes = {
  direction: PropTypes.string,
};
