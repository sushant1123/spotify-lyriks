import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { loadingSongs } from "../assets/constants";

const Discover = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetTopChartsQuery();

	// console.log({ data, error });

	const [genreTitle, setGenreTitle] = useState(genres[0].title);

	if (isFetching) return <Loader title={loadingSongs} />;

	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
				<h2 className="font-bold text-white text-3xl text-left">Discover {genreTitle}</h2>
				<select
					value={genreTitle}
					onChange={(e) => {
						let { value } = e.target;
						let genre = genres.find((gn) => gn.value === value);
						setGenreTitle(genre.title);
					}}
					className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
				>
					{genres?.map((genre) => (
						<option value={genre.value} key={genre.value}>
							{genre.title}
						</option>
					))}
				</select>
			</div>

			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{[...new Array(10)].map((song, idx) => (
					<SongCard
						key={song?.key || idx}
						song={song}
						i={idx}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
					/>
				))}
			</div>
		</div>
	);
};

export default Discover;
