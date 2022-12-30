import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { lyrics, lyricsNotFound, searchingSongDetails } from "../assets/constants";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCoreApi";

const SongDetails = () => {
	const dispatch = useDispatch();
	const { songid } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

	const {
		data: relatedSongs,
		isFetching: isFetchingRelatedSongs,
		error,
	} = useGetSongRelatedQuery({
		songid,
	});

	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong(song, data, i));
		dispatch(playPause(true));
	};

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	if (isFetchingSongDetails || isFetchingRelatedSongs) {
		return <Loader title={searchingSongDetails} />;
	}

	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<DetailsHeader artistId={artistId || ""} songData={songData} />
			<div className="mb-10">
				<h2 className="text-white text-3xl font-bold">{lyrics}:</h2>
				<div className="mt-5">
					{songData?.sections[1]?.type === "LYRICS" ? (
						songData?.sections[1]?.text.map((line, i) => (
							<p key={i} className="text-gray-400 text-base my-1">
								{line}
							</p>
						))
					) : (
						<p className="text-gray-400 text-base my-1">{lyricsNotFound}</p>
					)}
				</div>
			</div>

			<RelatedSongs
				data={data}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	);
};

export default SongDetails;
