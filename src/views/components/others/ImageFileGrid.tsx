interface Props {
	images: File[]
	className?: string
}

function ImageFileGrid(props: Props) {

	return (

		<div className={props.className}>

			{props.images.length === 1 &&

				<img src={window.URL.createObjectURL(props.images[0])} alt="For new Post" className="w-full aspect-square   object-cover border rounded-xl" />
			}



			{props.images.length === 2 &&

				<div className="w-full aspect-square   grid grid-cols-2 gap-1">

					<img src={window.URL.createObjectURL(props.images[0])} alt="For new Post" className="h-full   object-cover border rounded-s-xl" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="For new Post" className="h-full   object-cover border rounded-e-xl" />
				</div>
			}



			{props.images.length === 3 &&

				<div className="w-full aspect-square   grid grid-cols-2 gap-1">

					<img src={window.URL.createObjectURL(props.images[0])} alt="For new Post" className="h-full   object-cover border rounded-s-xl" />

					<div className="grid grid-rows-2 gap-1">

						<img src={window.URL.createObjectURL(props.images[1])} alt="For new Post" className="w-full h-full   object-cover border rounded-tr-xl" />
						<img src={window.URL.createObjectURL(props.images[2])} alt="For new Post" className="w-full h-full   object-cover border rounded-br-xl" />
					</div>
				</div>
			}



			{props.images.length === 4 &&

				<div className="w-full aspect-square   grid grid-cols-2 gap-1">

					<img src={window.URL.createObjectURL(props.images[0])} alt="For new Post" className="w-full aspect-square   object-cover border rounded-tl-xl" />
					<img src={window.URL.createObjectURL(props.images[1])} alt="For new Post" className="w-full aspect-square   object-cover border rounded-tr-xl" />
					<img src={window.URL.createObjectURL(props.images[2])} alt="For new Post" className="w-full aspect-square   object-cover border rounded-bl-xl" />
					<img src={window.URL.createObjectURL(props.images[3])} alt="For new Post" className="w-full aspect-square   object-cover border rounded-br-xl" />
				</div>
			}
		</div>
	)
}

export default ImageFileGrid