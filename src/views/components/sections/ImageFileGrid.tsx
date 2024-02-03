interface Props {
	images: File[]
	className?: string
}

function ImageFileGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.images.length === 1 &&

				<img src={window.URL.createObjectURL(props.images[0])} alt="For new Spot" className="aspect-square object-cover rounded-xl" />
			}



			{props.images.length === 2 &&

				<div className="grid grid-cols-2 gap-1 aspect-square">

					<img src={window.URL.createObjectURL(props.images[0])} alt="For new Spot" className="h-full   object-cover rounded-s-xl" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="For new Spot" className="h-full   object-cover rounded-e-xl" />
				</div>
			}



			{props.images.length === 3 &&

				<div className="grid grid-cols-2 gap-1   aspect-square">

					<img src={window.URL.createObjectURL(props.images[0])} alt="For new Spot" className="h-full   object-cover rounded-s-xl" />

					<div className="grid grid-rows-2 gap-1">

						<img src={window.URL.createObjectURL(props.images[1])} alt="For new Spot" className="aspect-square   object-cover rounded-tr-xl" />
						<img src={window.URL.createObjectURL(props.images[2])} alt="For new Spot" className="aspect-square   object-cover rounded-br-xl" />
					</div>
				</div>
			}



			{props.images.length === 4 &&

				<div className="grid grid-cols-2 gap-1">

					<img src={window.URL.createObjectURL(props.images[0])} alt="For new Spot" className="aspect-square object-cover rounded-tl-xl" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="For new Spot" className="aspect-square object-cover rounded-tr-xl" />
					<img src={window.URL.createObjectURL(props.images[2])} alt="For new Spot" className="aspect-square object-cover rounded-bl-xl" />
					<img src={window.URL.createObjectURL(props.images[3])} alt="For new Spot" className="aspect-square object-cover rounded-br-xl" />
				</div>
			}
		</div>
	)
}

export default ImageFileGrid