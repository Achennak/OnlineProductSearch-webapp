import { NavLink, useNavigate } from 'react-router-dom';
import './index.css'
import teamLogo from '../../assets/team-52-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton } from '@mui/material';
import { logoutThunk } from '../../services/user-thunks';

function NavbarComponent() {

    const { currentUser } = useSelector((state) => state.user);

    const isAnonymous = !(currentUser.role === 'Admin' || currentUser.role === 'Buyer' || currentUser.role === 'Seller')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogoutClick = () => {
        dispatch(logoutThunk())
        navigate('/')
    }
    return (
        <div className="top-nav">
            <div className='team-logo-container'>
                <div className='team-logo-team-text'> TEAM </div> {' '}
                <div className='team-logo-second-container'> 52 </div>

            </div>
            <div className='navigation-left-container'>
                <NavLink to="/" className='nav-link'>Home</NavLink>
                {
                    !isAnonymous && (

                        <NavLink to="/account" className='nav-link'>{currentUser.firstName}</NavLink>
                    )
                }
                {
                    isAnonymous &&
                    <NavLink to="/login" className='nav-link'>Login</NavLink>
                }
                {
                    !isAnonymous &&
                    <IconButton aria-label="logout" onClick={onLogoutClick}>
                        <PowerSettingsNewIcon />
                    </IconButton>
                }


            </div>
        </div >
    );
}

export default NavbarComponent;