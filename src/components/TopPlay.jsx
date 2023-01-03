import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import "swiper/css";
import "swiper/css/free-mode";
import { seeMore, topArtists, topCharts } from "../assets/constants";

const TopChartCard = (song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick) => {
	return (
		<div
			className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
			key={song?.key || i}
		>
			<h3 className="font-bold text-white text-base mr-3">{i + 1}</h3>
			<div className="flex-1 flex flex-row justify-between items-center">
				<img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
				<div className="flex-1 flex-col flex justify-center mx-3">
					<Link to={`/songs/${song?.key}`}>
						<p className="text-xl font-bold text-white">{song?.title}</p>
					</Link>
					<Link to={`/artists/${song?.artists[0]?.adamid}`}>
						<p className="text-base text-gray-300 mt-1">{song?.subTitle}</p>
					</Link>
				</div>
			</div>
			<PlayPause
				isPlaying={isPlaying}
				activdSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	);
};

const TopPlay = () => {
	const dispatch = useDispatch();
	const { activeSong, isPlaying } = useSelector((state) => state.player);

	const { data } = useGetTopChartsQuery();
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	});

	const topPlays = data ? data.slice(0, 5) : [];

	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong(song, data, i));
		dispatch(playPause(true));
	};

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	return (
		<div
			ref={divRef}
			className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
		>
			<div className="flex w-full flex-col">
				<div className="flex flex-row justify-between items-center">
					<h2 className="font-bold text-white text-2xl">{topCharts}</h2>
					<Link to="/top-charts">
						<p className="text-gray-300 text-base cursor-pointer">{seeMore}</p>
					</Link>
				</div>
				<div className="mt-4 flex flex-col gap-1">
					{topPlays?.map((song, i) => (
						<TopChartCard
							song={song}
							i={i}
							isPlaying={isPlaying}
							activdSong={activeSong}
							handlePauseClick={handlePauseClick}
							handlePlayClick={() => handlePlayClick(song, i)}
						/>
					))}
				</div>
			</div>

			<div className="w-full flex flex-col mt-12">
				<div className="flex w-full flex-col">
					<div className="flex flex-row justify-between items-center">
						<h2 className="font-bold text-white text-2xl">{topArtists}</h2>
						<Link to="/top-artists">
							<p className="text-gray-300 text-base cursor-pointer">{seeMore}</p>
						</Link>
					</div>

					<Swiper
						slidesPerView="auto"
						spaceBetween={15}
						freeMode
						centeredSlides
						centeredSlidesBounds
						modules={[FreeMode]}
						className="mt-4"
					>
						{topPlays?.map((song, i) => (
							<SwiperSlide
								song={song}
								i={i}
								style={{ width: "25%", height: "auto" }}
								className="shadow-lg rounded-full animate-slideright"
							>
								<Link to={`/artists/${artists[0]?.adamid}`}>
									<img
										src={song?.images.background}
										alt="name"
										className="rounded-full w-full object-cover"
									/>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default TopPlay;
