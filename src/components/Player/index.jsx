import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Slider from "rc-slider";
import { bindActionCreators } from "redux";
import {
  BiSkipPrevious,
  BiSkipNext,
  BiRepeat,
  BiShuffle,
} from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";

import * as PlayerActions from "../../store/actions/player";

import ContainerPlayer from "./style";
import "rc-slider/assets/index.css";

function Player({
  player,
  togglePlay,
  playNext,
  playPrevious,
  setPlayingState,
  clearPlayerState,
  toggleLoop,
  toggleShuffle,
}) {
  const { musicList, currentMusicIndex, isLooping, isPlaying, isShuffling } =
    player;
  const [progress, setProgress] = useState();
  const [playerIsShowed, setPlayerIsShowed] = useState(true);
  const audioRef = useRef();

  const music = musicList[currentMusicIndex];

  const hasNext = isShuffling || currentMusicIndex + 1 < musicList.length;

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function useProgressTime(amount) {
    const time = (amount / 100).toFixed(2).replace(".", ":");
    return time;
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  return (
    <ContainerPlayer playerIsOpen={music && playerIsShowed}>
      {music && (
        <>
          <div
            onClick={() => setPlayerIsShowed(!playerIsShowed)}
            className="icon-wrapper"
          >
            {!playerIsShowed ? (
              <IoIosArrowDropupCircle className="icon" />
            ) : (
              <IoIosArrowDropdownCircle className="icon" />
            )}
          </div>
          <div className="music-info">
            {music.track.preview_url ? (
              <>
                <img
                  src={music.track.album.images[1].url}
                  alt={music.track.name}
                />
                <div>
                  <strong>{music.track.name}</strong>
                  <span>{music.track.artists[0].name}</span>
                </div>
              </>
            ) : (
              <p>Amostra indisponível</p>
            )}
          </div>

          <div className="play-action">
            <button type="button" onClick={playPrevious}>
              <BiSkipPrevious />
            </button>
            <button type="button" className="play-button" onClick={togglePlay}>
              {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
            </button>
            <button type="button" onClick={playNext}>
              <BiSkipNext />
            </button>
          </div>

          <audio // eslint-disable-line
            src={music.track.preview_url}
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={handleEpisodeEnded}
            loop={isLooping}
            onLoadedMetadata={setupProgressListener}
            autoPlay
          />
          <div className="progress">
            <Slider
              max={30}
              onChange={handleSeek}
              value={progress}
              trackStyle={{ backgroundColor: "#FC575E" }}
              railStyle={{ backgroundColor: "#ccc" }}
              handleStyle={{ borderColor: "#FC575E", borderWidth: 4 }}
            />
            <span className="time">{useProgressTime(progress)}</span>
          </div>

          <div className="buttons">
            <button
              type="button"
              onClick={toggleLoop}
              className={isLooping ? "isActive" : ""}
            >
              <BiRepeat />
            </button>
            <button
              type="button"
              onClick={toggleShuffle}
              className={isShuffling ? "isActive" : ""}
            >
              <BiShuffle />
            </button>
          </div>
        </>
      )}
    </ContainerPlayer>
  );
}

Player.propTypes = {
  player: PropTypes.object.isRequired,
  togglePlay: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  setPlayingState: PropTypes.func.isRequired,
  clearPlayerState: PropTypes.func.isRequired,
  toggleLoop: PropTypes.func.isRequired,
  toggleShuffle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
  searchData: state.search.searchData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
