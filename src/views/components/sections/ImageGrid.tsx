interface Props {
	imagesUrls: string[]
	className?: string
}

function ImageGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.imagesUrls.length === 1 &&

				<img src={props.imagesUrls[0]} alt="Image attached on Spot" className="h-full   aspect-square object-cover   bg-gray-200" />
			}



			{props.imagesUrls.length === 2 &&

				<div className="grid grid-cols-2 gap-2   aspect-square   h-full">

					<img src={props.imagesUrls[0]} alt="Image attached on Spot" className="h-full   object-cover bg-gray-200" />
					<img src={props.imagesUrls[1]} alt="Image attached on Spot" className="h-full   object-cover bg-gray-200" />
				</div>
			}



			{props.imagesUrls.length === 3 &&

				<div className="grid grid-cols-2 gap-2   aspect-square h-full">

					<img src={props.imagesUrls[0]} alt="Image attached on Spot" className="h-full   object-cover bg-gray-200" />

					<div className="grid grid-rows-2 gap-2">

						<img src={props.imagesUrls[1]} alt="Image attached on Spot" className="aspect-square   object-cover bg-gray-200" />
						<img src={props.imagesUrls[2]} alt="Image attached on Spot" className="aspect-square   object-cover bg-gray-200" />
					</div>
				</div>
			}



			{props.imagesUrls.length === 4 &&

				<div className="grid grid-cols-2 gap-2   aspect-square h-full">

					<img src={props.imagesUrls[0]} alt="Image attached on Spot" className="aspect-square object-cover bg-gray-200" />
					<img src={props.imagesUrls[1]} alt="Image attached on Spot" className="aspect-square object-cover bg-gray-200" />
					<img src={props.imagesUrls[2]} alt="Image attached on Spot" className="aspect-square object-cover bg-gray-200" />
					<img src={props.imagesUrls[3]} alt="Image attached on Spot" className="aspect-square object-cover bg-gray-200" />
				</div>
			}
		</div>
	)
}

export default ImageGrid