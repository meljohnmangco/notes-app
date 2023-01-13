
import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import SyncLoader from 'react-spinners/SyncLoader'


const NewNote = () => {
	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map(id => data?.entities[id])
		}),
	})


	if (!users?.length) return <SyncLoader color={"#FFF"} />

	const content = <NewNoteForm users={users} />

	return content
}

export default NewNote