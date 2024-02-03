interface Props {
	imagesUrls: string[]
	className?: string
}

function ImageGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.imagesUrls.length === 1 &&

				<img src={props.imagesUrls[0]} alt="Attached on Spot" className="h-full w-full   aspect-square object-cover   bg-gray-200" />
			}



			{props.imagesUrls.length === 2 &&

				<div className="grid grid-cols-2 gap-2   aspect-square   h-full">

					<img src={props.imagesUrls[0]} alt="Attached on Spot" className="h-full w-full   object-cover bg-gray-200" />
					<img src={props.imagesUrls[1]} alt="Attached on Spot" className="h-full w-full   object-cover bg-gray-200" />
				</div>
			}



			{props.imagesUrls.length === 3 &&

				<div className="grid grid-cols-2 gap-2   aspect-square h-full">

					<img src={props.imagesUrls[0]} alt="Attached on Spot" className="h-full w-full  object-cover bg-gray-200" />

					<div className="grid grid-rows-2 gap-2">

						<img src={props.imagesUrls[1]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
						<img src={props.imagesUrls[2]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
					</div>
				</div>
			}



			{props.imagesUrls.length === 4 &&

				<div className="grid grid-cols-2 gap-2   aspect-square h-full">

					<img src={props.imagesUrls[0]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
					<img src={props.imagesUrls[1]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
					<img src={props.imagesUrls[2]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
					<img src={props.imagesUrls[3]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
				</div>
			}
		</div>
	)
}

export default ImageGrid