import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { loadingArtistDetails, lyrics, lyricsNotFound, searchingSongDetails } from "../assets/constants";
import {
	useGetArtistDetailsQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
} from "../redux/services/shazamCoreApi";

const ArtistDetails = () => {
	const { id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const {
		data: artistData,
		isFetching: isFetchingArtistDetails,
		error,
	} = useGetArtistDetailsQuery(artistId);

	if (isFetchingArtistDetails) {
		return <Loader title={loadingArtistDetails} />;
	}

	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<DetailsHeader artistId={artistId} artistData={artistData} />
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
				data={Object.values(artistData?.songs)}
				artistId={artistId}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	);
};

export default ArtistDetails;
