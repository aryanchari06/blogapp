import React from 'react';
import { Container, Logo, LogOutBtn } from '../index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All posts', slug: '/all-posts', active: authStatus },
    { name: 'Add post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className='py-4 shadow-lg bg-gray-800 text-white'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo className="h-10" />
            </Link>
          </div>

          <ul className='flex space-x-6'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className='inline-block px-4 py-2 bg-gray-700 rounded-full transition duration-300 transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg'
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogOutBtn className="px-4 py-2 bg-red-600 rounded-full transition duration-300 transform hover:bg-red-500 hover:scale-105 hover:shadow-lg" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
