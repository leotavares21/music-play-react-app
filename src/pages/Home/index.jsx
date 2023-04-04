import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { AiFillCheckCircle } from "react-icons/ai";

import { AiFillPlayCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

import List from "../../components/List";

import * as SpotifyActions from "../../store/actions/fetchSpotify";
import * as MyListActions from "../../store/actions/myList";
import * as PlayerActions from "../../store/actions/player";
import * as SearchActions from "../../store/actions/search";

function Home({
  data,
  myList,
  searchTerm,
  searchData,
  loadMoreSearch,
  isLoading,
  searchIsLoading,
  isLoadingMore,
  resetOffset,
  getData,
  handleAddItem,
  handleRemoveItem,
  playListMusic,
}) {
  const observer = useRef();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [myList]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMoreSearch();
      }
    }, options);

    if (observer.current && searchData.length > 0) {
      observer.current.observe(document.querySelector("#end-of-list"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [searchData, loadMoreSearch]);

  useEffect(() => {
    resetOffset();
  }, [searchTerm]);

  return (
    <main>
      {isLoading || searchIsLoading ? (
        <div className="loader">
          <strong>Carregando...</strong>
        </div>
      ) : (
        <></>
      )}
      {searchData.length === 0 ? (
        <>
          <h1>Top 50 músicas Brasil</h1>
          <List>
            <div className="scroller">
              {data.map((music, index) => (
                <li key={index}>
                  <img
                    src={music.track.album.images[1].url}
                    alt={music.track.name}
                  />
                  <div className="song-info">
                    <h2>{music.track.name}</h2>
                    <strong>{music.track.artists[0].name}</strong>
                    <span>{music.track.duration}</span>

                    <div className="buttons">
                      <a
                        href={music.track.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ouvir no Spotify
                      </a>
                      <button
                        type="button"
                        onClick={() => playListMusic(data, index)}
                      >
                        <AiFillPlayCircle />
                      </button>

                      {!music.isIncluded ? (
                        <button
                          type="button"
                          onClick={() => handleAddItem(music, music.track.id)}
                        >
                          <IoAddCircleOutline />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(music.track.id)}
                          className={music.isIncluded ? "isIncluded" : ""}
                        >
                          <AiFillCheckCircle />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </List>
        </>
      ) : (
        <>
          <h1>Resultado da pesquisa</h1>
          <List>
            <div className="scroller">
              {searchData.map((music, index) => (
                <li key={index}>
                  <img
                    src={music.track.album.images[1].url}
                    alt={music.track.name}
                  />
                  <div className="song-info">
                    <h2>{music.track.name}</h2>
                    <strong>{music.track.artists[0].name}</strong>
                    <span>{music.track.duration}</span>

                    <div className="buttons">
                      <a
                        href={music.track.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ouvir no Spotify
                      </a>
                      <button
                        type="button"
                        onClick={() => playListMusic(searchData, index)}
                      >
                        <AiFillPlayCircle />
                      </button>

                      {!music.isIncluded ? (
                        <button
                          type="button"
                          onClick={() => handleAddItem(music, music.track.id)}
                        >
                          <IoAddCircleOutline />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(music.track.id)}
                          className={music.isIncluded ? "isIncluded" : ""}
                        >
                          <AiFillCheckCircle />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              <div id="end-of-list"></div>
              {isLoadingMore ? (
                <div>Carregando...</div>
              ) : (
                <div>A lista chegou ao fim</div>
              )}
            </div>
          </List>
        </>
      )}
    </main>
  );
}

Home.propTypes = {
  data: PropTypes.array.isRequired,
  myList: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  searchData: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  loadMoreSearch: PropTypes.func.isRequired,
  resetOffset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchIsLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  playListMusic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: state.spotify.data,
  isLoading: state.spotify.isLoading,
  searchTerm: state.search.searchTerm,
  searchData: state.search.searchData,
  searchIsLoading: state.search.searchIsLoading,
  searchOffset: state.search.searchOffset,
  isLoadingMore: state.search.isLoadingMore,
  myList: state.myList.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...SpotifyActions, ...MyListActions, ...PlayerActions, ...SearchActions },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
