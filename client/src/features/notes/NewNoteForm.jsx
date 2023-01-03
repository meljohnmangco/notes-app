import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FaSave } from 'react-icons/fa'

const NewNoteForm = ({ users }) => {

	const [addNewNote, {
		isLoading,
		isSuccess,
		isError,
		error
	}] = useAddNewNoteMutation()

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [userId, setUserId] = useState(users[0].id)

	useEffect(() => {
		if(isSuccess) {
			setTitle('')
			setText('')
			setUserId('')
			navigate('/dash/notes')
		}
	},[isSuccess, navigate])

	const onTitleChanged = e => setTitle(e.target.value)
	const onTextChanged = e => setText(e.target.value)
	const onUserIdChanged = e => setUserId(e.target.value)

	const canSave = [title, text, userId].every(Boolean) && !isLoading

	const onSaveNoteClicked = async (e) => {
		e.preventDefault()
		if (canSave) {
			await addNewNote({ user: userId, title, text })
		}
	}

	const options = users.map(user => {
		return(
			<option value={user.id} key={user.id}>{user.username}</option>
		)
	})

	const errClass = isError ? "errmsg" : "offscreen"
	const validTitleClass = !title ? "form__input--incomplete" : ''
	const validTextClass = !text ? "form__input--incomplete" : ''

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>

			<form onSubmit={onSaveNoteClicked} className="form">
				<div className="form__title-row">
					<h2>New Note</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button"
							title="Save"
							disabled={!canSave}
						>
							<FaSave />
						</button>
					</div>
				</div>
				<label htmlFor="title" className="form__label">Title:</label>
				<input  
					className={`form__input ${validTitleClass}`}
					id="title"
					name="title"
					type="text"
					autoComplete="off"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="title" className="form__label">Text:</label>
				<input 
					type="text"
					className={`form__input ${validTextClass}`}
					id="text"
					name="text"
					value={text}
					onChange={onTextChanged}
				/>
				<label htmlFor="username" className="form__label form__checkbox-container">
					ASSIGNED TO:
				</label>
				<select 
					name="username" 
					id="username"
					className="form__select"
					value={userId}
					onChange={onUserIdChanged}
				>
					{options}
				</select>
			</form>
		</>
	)

	return content
}

export default NewNoteForm