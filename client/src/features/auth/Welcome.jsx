import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Clock from './Clock'
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs'
import { TbFilePencil } from 'react-icons/tb'
import { FaUsersCog, FaUserPlus } from 'react-icons/fa'

const Welcome = () => {

	const { username, isManager, isAdmin } = useAuth()

 	const content = (
	  	<section className="welcome">

      	<p><Clock /></p>

	    <h1>Welcome {username}!</h1>

	    <div className="menu-container">
	    	<Link to="/dash/notes" className="menu">
    			<TbFilePencil className="menu-icon"/>
	    		<p>View Notes</p>
	    	</Link>
	    	<Link className="menu" to="/dash/notes/new">
	    		<BsFillFileEarmarkPlusFill className="menu-icon" />
	    		<p>Add New Notes</p>
	    	</Link>
	    	
    		{
    			(isManager || isAdmin) && <Link to="/dash/users" className="menu"><FaUsersCog className="menu-icon" /><p>View User Settings</p></Link>
    		}

    		{
    			(isManager || isAdmin) && <Link to="/dash/users/new" className="menu"><FaUserPlus className="menu-icon" /><p>Add New User</p></Link>
    		}
	    </div>
	  	</section>
 	)

 	return content
}

export default Welcome