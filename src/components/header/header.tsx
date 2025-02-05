import './header.css';
import logo from '../../assets/logo-updated.png'
import * as React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const changeStyle = () => {
        console.log("click");
        setIsOpen(!isOpen);
    }

    return (
        <div className='container'>
            <div className='logo'>
                <img src={logo} alt='logo' className='logoImage' />
            </div>

            <div className='nav'>
                <span><Link to='/' className={'active'}>Home</Link></span>
                <span><Link to='/support'>Support</Link></span>
                <span><Link to='/blog'>Blog</Link></span>
                <span><Link to='/about'>About us</Link></span>
            </div>

            <div className='nav'>
                <span><Link to='/login'>Login</Link></span>
                <span><Link to='/register'>Register</Link></span>
            </div>

            <div className={isOpen ? 'smallNav' : 'smallNavHidden'}>
                <span><Link to='/' className={isOpen ? 'show' : 'hide'}>Home</Link></span>
                <span><Link to='/support' className={isOpen ? 'show' : 'hide'}>Support</Link></span>
                <span><Link to='/blog' className={isOpen ? 'show' : 'hide'}>Blog</Link></span>
                <span><Link to='/about' className={isOpen ? 'show' : 'hide'}>About us</Link></span>
                <span><Link to='/login' className={isOpen ? 'show' : 'hide'}>Login</Link></span>
                <span><Link to='/register' className={isOpen ? 'show' : 'hide'}>Register</Link></span>
            </div>

            <div className='bars' onClick={changeStyle}>
                <div className={isOpen ? 'barClose' : 'bar'}></div>
                <div className={isOpen ? 'barClose' : 'bar'}></div>
                <div className={isOpen ? 'barClose' : 'bar'}></div>
            </div>
        </div>
    );
};

export default Header;
