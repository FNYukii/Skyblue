interface Props {
	imagesUrls: string[]
	className?: string
}

function ImageGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.imagesUrls.length === 1 &&

				<img src={props.imagesUrls[0]} alt="Images for new Spot" className="aspect-square object-cover rounded-xl   bg-gray-100" />
			}



			{props.imagesUrls.length === 2 &&

				<div className="flex aspect-square">

					<img src={props.imagesUrls[0]} alt="Images for new Spot" className="h-full w-1/2   pr-[0.12rem]   object-cover rounded-s-xl   bg-gray-100" />
					<img src={props.imagesUrls[1]} alt="Images for new Spot" className="h-full w-1/2   pl-[0.12rem]   object-cover rounded-e-xl   bg-gray-100" />
				</div>
			}



			{props.imagesUrls.length === 3 &&

				<div className="flex aspect-square">

					<img src={props.imagesUrls[0]} alt="Images for new Spot" className="h-full w-1/2   pr-[0.12rem]   object-cover rounded-s-xl   bg-gray-100" />

					<div className="h-full w-1/2   pl-[0.12rem]   flex flex-col">

						<img src={props.imagesUrls[1]} alt="Images for new Spot" className="w-full h-1/2   pb-[0.12rem]   object-cover rounded-tr-xl   bg-gray-100" />
						<img src={props.imagesUrls[2]} alt="Images for new Spot" className="w-full h-1/2   pt-[0.12rem]   object-cover rounded-br-xl   bg-gray-100" />
					</div>
				</div>
			}



			{props.imagesUrls.length === 4 &&

				<div className="grid grid-cols-2 gap-1">

					<img src={props.imagesUrls[0]} alt="Images for new Spot" className="aspect-square object-cover rounded-tl-xl   bg-gray-100" />
					<img src={props.imagesUrls[1]} alt="Images for new Spot" className="aspect-square object-cover rounded-tr-xl   bg-gray-100" />
					<img src={props.imagesUrls[2]} alt="Images for new Spot" className="aspect-square object-cover rounded-bl-xl   bg-gray-100" />
					<img src={props.imagesUrls[3]} alt="Images for new Spot" className="aspect-square object-cover rounded-br-xl   bg-gray-100" />
				</div>
			}
		</div>
	)
}

export default ImageGrid