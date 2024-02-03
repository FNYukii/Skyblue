function LoadingSpotGrid() {

	return (

		<div className="grid grid-cols-3 gap-2">

			{Array(12).fill(0).map((_item, index) => (

				<div>
					{index % 2 === 0 &&
						<div key={index} className="w-full aspect-square grid grid-cols-2 gap-2">
							<div className="w-full h-full bg-gray-200"></div>
							<div className="w-full h-full bg-gray-200"></div>
							<div className="w-full h-full bg-gray-200"></div>
							<div className="w-full h-full bg-gray-200"></div>
						</div>
					}

					{index % 2 !== 0 &&
						<div className="w-full aspect-square bg-gray-200"></div>
					}
				</div>
			))}
		</div>
	)
}

export default LoadingSpotGrid