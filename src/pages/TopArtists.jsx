import React, { useEffect, useState } from "react";
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";
import { discoverTopCharts, loadingSongsAroundYou, topArtists } from "../assets/constants";

const TopArtists = () => {
	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title={loadingSongsAroundYou} />;

	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-3xl text-white text-left mt-4 mb-4">
				{topArtists} <span className="font-black">{country}</span>
			</h2>

			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.map((track, i) => (
					<ArtistCard key={track?.key || i} track={track} />
				))}
			</div>
		</div>
	);
};

export default TopArtists;
