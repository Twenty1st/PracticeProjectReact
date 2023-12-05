import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
const TrashBut = ({ click }: { click: () => void }) => {
	return (
		<>
			<IconButton
				onClick={click}
				size='small'
				sx={{ ml: 1 }}
				style={{
					padding: '0',
					margin: '0',
					width: 'min-content',
					position: 'absolute',
					left: 'auto',
					color: 'white',
				}}
			>
				<DeleteIcon fontSize='small' />
			</IconButton>
		</>
	)
}

export default TrashBut
