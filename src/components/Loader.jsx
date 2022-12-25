import { loader } from "../assets/index";
import { loading } from "../assets/constants";

const Loader = ({ title }) => (
	<div className="w-full flex justify-center items-center flex-col">
		<img src={loader} alt="loader" className="w-32 h-32 object-contain" />
		<h1 className="font-bold text-white text-2xl mt-2">{title || loading}</h1>
	</div>
);

export default Loader;
