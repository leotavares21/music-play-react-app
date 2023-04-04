import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { AiFillPlayCircle, AiFillCloseCircle } from "react-icons/ai";

import List from "../../components/List";

import * as MyListActions from "../../store/actions/myList";
import * as PlayerActions from "../../store/actions/player";

function MyList({ list, handleRemoveItem, playListMusic }) {
  const [customList, setCustomList] = useState([]);

  function getList() {
    setCustomList(list);
  }

  useEffect(() => {
    getList();
  }, [list]);

  return (
    <main>
      <h1>Minha lista</h1>
      {customList.length > 0 ? (
        <List>
          <div className="scroller">
            {customList.map((music, index) => (
              <li key={music.track.id}>
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
                      onClick={() => playListMusic(customList, index)}
                    >
                      <AiFillPlayCircle />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(music.track.id, true)}
                      className="isIncluded"
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </List>
      ) : (
        <h2>Sua lista está vazia</h2>
      )}
    </main>
  );
}

MyList.propTypes = {
  list: PropTypes.array.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  playListMusic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  list: state.myList.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...MyListActions, ...PlayerActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
