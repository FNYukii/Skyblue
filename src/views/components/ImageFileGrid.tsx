interface Props {
	images: File[]
	className?: string
}

function ImageFileGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.images.length === 1 &&

				<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="aspect-square object-cover rounded-xl" />
			}



			{props.images.length === 2 &&

				<div className="flex aspect-square">

					<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="h-full w-1/2   pr-[0.12rem]   object-cover rounded-s-xl" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="Images for new Spot" className="h-full w-1/2   pl-[0.12rem]   object-cover rounded-e-xl" />
				</div>
			}



			{props.images.length === 3 &&

				<div className="flex aspect-square">

					<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="h-full w-1/2   pr-[0.12rem]   object-cover rounded-s-xl" />

					<div className="h-full w-1/2   pl-[0.12rem]   flex flex-col">

						<img src={window.URL.createObjectURL(props.images[1])} alt="Images for new Spot" className="w-full h-1/2   pb-[0.12rem]   object-cover rounded-tr-xl" />
						<img src={window.URL.createObjectURL(props.images[2])} alt="Images for new Spot" className="w-full h-1/2   pt-[0.12rem]   object-cover rounded-br-xl" />
					</div>
				</div>
			}



			{props.images.length === 4 &&

				<div className="grid grid-cols-2 gap-1">

					<img src={window.URL.createObjectURL(props.images[0])} alt="Images for new Spot" className="aspect-square object-cover rounded-tl-xl" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="Images for new Spot" className="aspect-square object-cover rounded-tr-xl" />
					<img src={window.URL.createObjectURL(props.images[2])} alt="Images for new Spot" className="aspect-square object-cover rounded-bl-xl" />
					<img src={window.URL.createObjectURL(props.images[3])} alt="Images for new Spot" className="aspect-square object-cover rounded-br-xl" />
				</div>
			}
		</div>
	)
}

export default ImageFileGrid