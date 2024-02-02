import dayjs from "dayjs"
import Spot from "../entities/Spot"

class DummySpotService {

	static dummySpots(): Spot[] {
		return [
			{
				id: "fdajflakdjldkjlfjalifjao",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-04-11").toDate(),

				images: ["https://images.unsplash.com/photo-1443527394413-4b820fd08dde"],
				title: "Alpha Tower",
				comment: "かっこいい"
			},
			{
				id: "yotiuoiauofajo",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-01-16").toDate(),

				images: ["https://images.unsplash.com/photo-1528810289438-283f885c31ef"],
				title: "Bravo Building",
				comment: "壮麗"
			},
			{
				id: "hlkjfldakjlfajlafa",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-01-20").toDate(),

				images: ["https://images.unsplash.com/photo-1428366890462-dd4baecf492b"],
				title: "Charlie Center",
				comment: "重厚"
			},

			{
				id: "iuliuoifauoiuoafa",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-01-21").toDate(),

				images: ["https://images.unsplash.com/photo-1490351267196-b7a67e26e41b"],
				title: "Delta Data Center",
				comment: "頑丈"
			},
			{
				id: "opofafpaofoaeafafaf",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-01-22").toDate(),

				images: ["https://images.unsplash.com/photo-1479839672679-a46483c0e7c8"],
				title: "Echo Education School",
				comment: "巨大"
			},
			{
				id: "tydatuyftaudaufafafa",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-01-24").toDate(),

				images: ["https://images.unsplash.com/photo-1462396240927-52058a6a84ec"],
				title: "Foxtrot Factory",
				comment: "機械的"
			},

			{
				id: "gjdhgkajhgkahkgjafga",
				userId: "alphaijoauroaijora",
				createdAt: dayjs("2024-01-26").toDate(),

				images: ["https://images.unsplash.com/photo-1606005426472-d4503e8b1387"],
				title: "Golf Global Center",
				comment: "便利"
			},
		]
	}

	static readSpots(): Spot[] {

		let spots = this.dummySpots()

		spots = spots.concat(spots)

		return spots
	}
}

export default DummySpotService