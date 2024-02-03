import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "../components/others/LoadingIcon"
import ImageGrid from "../components/sections/ImageGrid"
import URLSpotModal from "../components/others/URLSpotModal"
import UserIcon from "../components/others/UserIcon"

function SpotScreen() {

	document.title = "スポット - Skyline"

	const { spotId } = useParams()



	const [spot, setSpot] = useState<Spot | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		(async () => {

			const spot = await SpotService.readSpot(spotId ?? "")
			setSpot(spot)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	return (

		<URLSpotModal>

			<div className="h-full   w-fit">
				
				{!isLoaded &&
					<LoadingIcon center className="mt-16" />
				}

				{isLoaded && spot === null &&
					<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
				}

				{isLoaded && spot !== null &&

					<div className="bg-white/10    h-full  flex flex-col w-fit">

						<ImageGrid imagesUrls={spot.imageUrls} className="min-h-0 w-fit  bg-red-500/10     aspect-square"/>

						{/* <p className="text-white/50 h-full overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempore minus nemo rerum harum ducimus facilis, quo quaerat delectus eos ullam accusamus at amet dolorem tenetur soluta perferendis ipsa veritatis laboriosam nulla? Fuga laborum, officiis atque laboriosam magnam, eos ab quaerat voluptatum iure libero delectus perferendis expedita nihil quidem dolorum quas. Perspiciatis, tempora debitis dignissimos in hic aut distinctio rem, voluptates mollitia at praesentium architecto sequi rerum nihil fugiat eaque deserunt nostrum commodi optio dolores laudantium. Voluptatum omnis dicta, magnam numquam ipsum facere sunt, aliquid provident alias deserunt vel corrupti culpa quae unde fugiat animi nobis sapiente placeat. Nihil laudantium modi reprehenderit obcaecati nisi ea molestias ratione vero deserunt illo tempore quisquam, voluptates atque alias iste ipsam pariatur aperiam rem minus itaque quam? Itaque, natus odit unde incidunt praesentium mollitia ipsum, quod ipsam exercitationem, temporibus quasi ea voluptates perferendis modi eveniet quas delectus accusantium. Aspernatur nemo tenetur facilis quae! Alias labore vitae voluptatum maiores, fugit amet, officiis sunt voluptate sit ratione quibusdam consequatur adipisci a, eos aliquid omnis! Et perferendis, quo atque eos nisi assumenda ad sapiente neque animi. Omnis explicabo eum iusto labore deserunt dolorum voluptate tempora, cumque et rem nobis facere suscipit pariatur nam adipisci dolores repellat. Quaerat esse non laboriosam perspiciatis vero, provident corporis. Delectus ut recusandae eveniet ipsum harum nobis excepturi, quos accusamus deserunt officia hic, maiores dolorum commodi officiis esse eaque illum vitae animi quidem rem alias, dolores amet corporis. Beatae voluptas eaque soluta veniam nemo labore veritatis. Voluptates natus earum nemo aspernatur ratione rerum eos itaque temporibus cum dolores similique reprehenderit tempore amet numquam ipsam suscipit minima, totam cumque. Incidunt consequuntur itaque voluptatum nam possimus! Alias ipsa nihil animi vitae, veritatis accusamus distinctio autem libero possimus voluptatum dolores ab consequuntur provident doloribus impedit odit aliquam assumenda blanditiis voluptatibus officia dolorum maxime cumque accusantium qui. Fuga voluptatum atque, a dignissimos nulla cum ab beatae illum excepturi minus? Aut totam minima libero doloribus earum, doloremque numquam sint minus alias excepturi ad id provident aperiam deserunt enim, facilis blanditiis nihil quasi voluptates voluptatibus explicabo. Impedit, soluta! Quibusdam officiis inventore amet harum, voluptates, qui aliquam ad autem quas sapiente reprehenderit beatae rem numquam, cum explicabo ratione suscipit exercitationem. Provident et expedita facilis facere nesciunt labore eos temporibus illum quod accusamus sapiente officiis natus vel commodi ipsa blanditiis, saepe esse consequuntur voluptatem numquam nisi, tenetur ut obcaecati! Nam ipsum impedit sunt minus suscipit vero provident praesentium eligendi, illo saepe repudiandae architecto voluptatibus, blanditiis quo voluptate iure dignissimos vitae hic fugiat. Aliquid ut odio optio praesentium nihil beatae officiis quia! Totam cumque optio commodi, dolore aut mollitia ut aliquid illo consequatur quos sit quae fugiat sunt quas eaque consectetur amet illum neque aliquam ipsum hic accusantium itaque! Asperiores saepe ea cum distinctio ipsam ullam perspiciatis officia, id nulla explicabo odio accusamus voluptate laborum illum nobis inventore non, quae temporibus ipsa, eos reprehenderit voluptates in reiciendis. Consequatur laborum ab expedita alias aut tempore perspiciatis commodi, porro possimus. Ex sed rem ipsam pariatur, sapiente tenetur inventore perferendis maxime deleniti laudantium. Aut repudiandae quaerat quisquam tenetur corrupti? Rem enim minima quaerat esse, cum sit, dolores sequi quis corrupti modi provident vitae veritatis ea, quae laboriosam atque sed deserunt vero animi ipsa? Quod, eligendi facilis repellendus reiciendis ratione esse animi nemo neque, dignissimos vero, totam est doloribus excepturi aut quas vel labore! Veniam quo, magnam consequuntur aliquam ipsum mollitia labore repudiandae neque deserunt eum, alias quidem excepturi vitae similique eos facilis soluta provident saepe! Numquam deserunt dicta voluptatibus dolore. Accusamus recusandae, neque officia similique numquam assumenda laborum, expedita quas in, nam dolorum eos sapiente voluptatibus quasi! Veniam voluptates similique esse, deleniti tempora, ipsum, reiciendis laboriosam obcaecati recusandae voluptatum nemo quidem. Sint nulla, molestias libero ad adipisci eligendi nisi distinctio nobis possimus. Facilis est quae cumque. Ad porro quae doloremque vero ut aliquid modi nesciunt dignissimos corrupti minus? Fuga quasi optio earum error aliquid doloribus, ab deserunt animi veniam esse voluptatum tempore labore tempora, molestiae quo quisquam quidem totam cumque id harum! Laborum eum ducimus inventore ad. Maxime quos iste perferendis molestias recusandae tenetur at eaque nemo fugit! Architecto quas quia porro sequi in, laudantium minima perferendis modi vero officiis temporibus cum exercitationem iure quasi. Quo quod nobis nemo error delectus laudantium? Et iusto facilis magni numquam possimus enim veritatis autem minus incidunt dolor qui culpa blanditiis nobis, omnis deserunt perspiciatis facere perferendis. Mollitia optio ipsam distinctio eligendi ipsa cum quibusdam alias, sunt non facere. Odit est modi accusantium corporis iste ab facilis dolores voluptatum perferendis consequatur quidem nulla dolorum exercitationem, minima alias id similique rem explicabo temporibus, facere laudantium aut voluptate iusto! Totam voluptate alias sunt nam sapiente eligendi enim dolore esse incidunt, repellendus illum accusamus cum maxime, ipsam, sed tempora veritatis deleniti obcaecati maiores amet vero provident necessitatibus. Nobis molestias odit reiciendis illo, eveniet velit? Sit asperiores, voluptas autem eveniet repellat nobis eligendi dolor aspernatur cupiditate tenetur, suscipit distinctio illo labore provident perspiciatis consequatur recusandae? Hic iste delectus vero autem officia? Dolorum aut, nobis porro blanditiis ducimus id eaque maxime placeat quos quod labore, est natus eos obcaecati voluptates dicta, veritatis esse eveniet omnis quo laudantium ea debitis ratione? Laboriosam id inventore quaerat neque tenetur commodi eveniet ut sed architecto? Sequi harum esse tenetur praesentium vero aliquid itaque culpa neque reiciendis alias, ducimus et similique dolorum ad eveniet provident? Dicta quam, quod quae, totam quasi nulla laborum porro optio odit incidunt rerum adipisci libero deleniti cum illo ipsam odio? Illo dolorem ad ipsum qui, quibusdam odio asperiores repudiandae et explicabo debitis commodi culpa eveniet, possimus molestias aliquid tempore voluptates nesciunt fugiat quaerat esse nemo! Qui ipsum ipsam debitis. A quia laboriosam provident accusantium ea saepe cum, quas repudiandae impedit itaque tempore, repellendus nisi aliquid eligendi quibusdam quo alias temporibus at perferendis, placeat atque. Ea corrupti sequi expedita quam officiis libero, quis velit, repudiandae, sint consequuntur facilis. Fugit ex dignissimos architecto eum accusantium, similique velit veniam, harum sint repellendus necessitatibus asperiores assumenda nam, voluptate doloremque recusandae earum rem! Quo eius molestiae recusandae odit, ratione sit corrupti debitis, veritatis autem placeat optio tempore laboriosam doloremque!</p> */}


						<div className="mt-2 w-fit   flex justify-between items-center">

							<p className="text-white">{spot.title}</p>

							<UserIcon userId={spot.userId} className="w-8" />
						</div>
					</div>
				}
			</div>
		</URLSpotModal>
	)
}

export default SpotScreen