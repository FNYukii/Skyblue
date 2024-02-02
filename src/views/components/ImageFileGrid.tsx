interface Props {
	images: File[]
	className?: string
}

function ImageFileGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.images.length === 1 &&

				<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="w-80 aspect-square object-cover rounded-lg" />
			}



			{props.images.length === 2 &&

				<div className="flex aspect-square   max-h-80">

					<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="h-full w-1/2   pr-[0.12rem]   object-cover rounded-lg" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="Images for new Spot" className="h-full w-1/2   pl-[0.12rem]   object-cover rounded-lg" />
				</div>
			}



			{props.images.length === 3 &&

				<div className="flex aspect-square   max-h-80">

					<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="h-full w-1/2   pr-[0.12rem]   object-cover rounded-lg" />

					<div className="h-full w-1/2   pl-[0.12rem]   flex flex-col">

						<img src={window.URL.createObjectURL(props.images[1])} alt="Images for new Spot" className="w-full h-1/2   pb-[0.12rem]   object-cover rounded-lg" />
						<img src={window.URL.createObjectURL(props.images[2])} alt="Images for new Spot" className="w-full h-1/2   pt-[0.12rem]   object-cover rounded-lg" />
					</div>
				</div>
			}



			{props.images.length === 4 &&

				<div className="grid grid-cols-2 gap-1">

					{props.images.map(image => (

						<img src={window.URL.createObjectURL(image)} alt="Images for new Spot" className="aspect-square object-cover rounded-lg   max-h-40" />
					))}
				</div>
			}
		</div>
	)
}

export default ImageFileGrid