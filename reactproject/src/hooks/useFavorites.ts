import { useTypeSelector } from './useTypeSelector'

//хук для выбора избранных рецептов

export const useFavorites = () => {
	const favorites = useTypeSelector(state => state.favorites)

	return { favorites }
}
