export interface ICar {
	id: string
	img: string
	price: string
	name: string
}

export interface ICarData extends Omit<ICar, 'id'> {}
