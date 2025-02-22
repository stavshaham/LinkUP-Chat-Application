import './header.css';
import logo from '../../assets/logo-updated.png'
import * as React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const changeStyle = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 200); // Match this with the animation duration
        } else {
            setIsOpen(true);
        }
        document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    }

    // Clean up the body style when component unmounts
    React.useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <header>
            <nav className='headerContainer'>
                <div className='left-section'>
                    <div className='logo'>
                        <img src={logo} alt='logo' className='logoImage' />
                    </div>
                </div>

                <div className='center-section'>
                    <div className='nav'>
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            style={{ outline: 'none' }}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to='/support' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            style={{ outline: 'none' }}
                        >
                            Support
                        </NavLink>
                        <NavLink 
                            to='/blog' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            style={{ outline: 'none' }}
                        >
                            Blog
                        </NavLink>
                        <NavLink 
                            to='/about' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            style={{ outline: 'none' }}
                        >
                            About us
                        </NavLink>
                    </div>
                </div>

                <div className='right-section'>
                    <div className='auth-buttons'>
                        <NavLink 
                            to='/login' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            style={{ outline: 'none' }}
                        >
                            Login
                        </NavLink>
                        <NavLink 
                            to='/register' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            style={{ outline: 'none' }}
                        >
                            Register
                        </NavLink>
                    </div>
                    <button className='bars' onClick={changeStyle}>
                        <div className={isOpen ? 'barClose' : 'bar'}></div>
                        <div className={isOpen ? 'barClose' : 'bar'}></div>
                        <div className={isOpen ? 'barClose' : 'bar'}></div>
                    </button>
                </div>

                {(isOpen || isClosing) && (
                    <div className={`smallNav ${isClosing ? 'smallNavHidden' : ''}`}>
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={changeStyle}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to='/support' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={changeStyle}
                        >
                            Support
                        </NavLink>
                        <NavLink 
                            to='/blog' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={changeStyle}
                        >
                            Blog
                        </NavLink>
                        <NavLink 
                            to='/about' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={changeStyle}
                        >
                            About us
                        </NavLink>
                        <NavLink 
                            to='/login' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={changeStyle}
                        >
                            Login
                        </NavLink>
                        <NavLink 
                            to='/register' 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                            onClick={changeStyle}
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
