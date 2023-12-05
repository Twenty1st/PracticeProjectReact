import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import * as React from 'react'
import { ICar } from '../../types/cars.interface'
import styles from '../Album/Album.module.css'
import CreateCarFormMUI from '../CreateCar/CreateCarFormMUI'

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

interface CreateCarFormProps {
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
}

const CreateDialogF: React.FC<CreateCarFormProps> = ({ setCars }) => {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<React.Fragment>
			<button onClick={handleClickOpen} className={styles.plusBut}>
				<AddIcon className={styles.plusik} sx={{ fontSize: 30 }} />
			</button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>{'Add a new car model'}</DialogTitle>
				<DialogContent>
					<CreateCarFormMUI setCars={setCars} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Back</Button>
					{/* <Button onClick={handleClose}>Agree</Button> */}
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}

export default CreateDialogF
