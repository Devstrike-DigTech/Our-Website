'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faUserTie, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import logo from '@/assets/images/logo.svg'
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from '@formkit/auto-animate/react'



export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [animationParent] = useAutoAnimate()

  function openSideMenu(){
    setIsOpen(true);
  }


  function closeSideMenu(){
    setIsOpen(false);
  }

  function getMenuClasses() {
    let menuClasses: string[] = [];
    if (isOpen) {
      menuClasses = [
        'flex',
        'absolute',
        'top-[60px]',
        'bg-gray-800',
        'w-full',
        'p-4',
        'left-0',
        'gap-6',
        'flex-col',
      ];
    } else {
      menuClasses.push('mx-auto, hidden', 'md:flex');
    }

    return menuClasses.join(' ');
  }

  return (
 <nav className='bg-white text-white p-4 sm:p-4 md:flex md:justify-between md:items-center'>
  <div ref={animationParent} className='container flex justify-between items-center'>
    {/* Image at the start */}
    <a href='/' className='text-2xl font-bold'>
      <Image
        src={logo}
        alt="Devstrike"
        width={60}
        height={60}
        className="object-cover rounded-lg"
      />
    </a>
    {isOpen && <MobileNav closeSideMenu={closeSideMenu}/>}
    
    {/* Center navigation items */}
    <div className='hidden md:flex justify-center items-center space-x-4 transition-all'>
      <Link href='/' className='mx-2 hover:text-[#951E59] text-black font-bold'>
        Home
      </Link>
      <Link href='/how-it-works' className='mx-2 hover:text-[#951E59] text-black font-bold'>
        Projects
      </Link>
      
 {/* Careers dropdown */}
<div className='flex items-center gap-4 transaction-all'>
  <Link href={''} className='group relative px-2 py-3 transition-all'>
  <p className='flex cursor-pointer items-center gap-2 font-bold text-black group-hover:text-[#951E59]'>
    <span>Careers</span>
    <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0'/>
  </p>
  <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">

     {/* First dropdown item (Vacancies) */}
      <div className='flex items-center p-2 hover:bg-gray-100 w-auto'>
        {/* Briefcase icon for Vacancies */}
        <FontAwesomeIcon icon={faBriefcase} className='w-6 h-6 mr-2 text-[#951E59]' />
        <div className='flex-1'>
          <p className='text-black font-bold'>Vacancies</p>
          <p className='text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis'>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
       {/* Second dropdown item (Management) */}
      <div className='flex items-center p-2 hover:bg-gray-100 w-auto'>
        {/* Person with tie icon for Management */}
        <FontAwesomeIcon icon={faUserTie} className='w-6 h-6 mr-2 text-[#951E59]' />
        <div className='flex-1'>
          <p className='text-black font-bold'>Management</p>
          <p className='text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis'>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
  </div>
  </Link>
 
</div>

      
      <Link href='/testimonials' className='mx-2 hover:text-[#951E59] text-black font-bold'>
        Content
      </Link>
    </div>

    {/* Contact Us button at the end */}
    <div className=' hidden md:flex md:items-center'>
      <Link
        href='/auth'
        className='mx-2 bg-gradient-to-b from-[#951E59] to-[#353B77] hover:from-[#353B77] hover:to-[#951E59] text-white font-bold px-4 py-2 rounded-md shadow-md transition-all'
      >
        Contact Us
      </Link>
    </div>

    {/* Mobile menu button */}

    <BiMenuAltRight onClick={openSideMenu} className='cursor-pointer text-4xl text-black md:hidden'/>
    {/* <div className='md:hidden flex items-center'>
      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          {isOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          )}
        </svg>
      </button>
    </div> */}
  </div>
 </nav>

  );
};

function MobileNav({closeSideMenu}: {closeSideMenu:()=>void}) {
  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);
    const [animationParent] = useAutoAnimate()


  function toggleItem() {
    return setIsItemOpen(!isItemOpen);
  }

  return(
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className='h-full w-[65%] bg-white px-4 py-4'>
        <section className="flex justify-end">
          <AiOutlineClose onClick={closeSideMenu} className='cursor-pointer text-4xl text-black'/>
        </section>
          <div className='flex flex-col justify-center gap-2 transition-all'>
      <Link href='/' className='mx-2 hover:text-[#951E59] text-black text-base font-bold gap-2'>
        Home
      </Link>
      <Link href='/how-it-works' className='mx-2 hover:text-[#951E59] gap-2 text-base text-black font-bold'>
        Projects
      </Link>
      
 {/* Careers dropdown */}
<div className='flex items-center gap-4 transaction-all'>
  <Link href={''} ref={animationParent} onClick={toggleItem} className='group relative px-2 py-3 transition-all'>
  <p className='flex cursor-pointer items-center gap-2 font-bold text-base text-black group-hover:text-[#951E59]'>
    <span>Careers</span>
    <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0'/>
  </p>
  {isItemOpen && (
    <div className=" right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all group-hover:flex">

     {/* First dropdown item (Vacancies) */}
      <div className='flex items-center p-2 hover:bg-gray-100 w-auto'>
        {/* Briefcase icon for Vacancies */}
        <FontAwesomeIcon icon={faBriefcase} className='w-6 h-6 mr-2 text-[#951E59]' />
        <div className='flex-1'>
          <p className='text-black font-bold'>Vacancies</p>
        
        </div>
      </div>
       {/* Second dropdown item (Management) */}
      <div className='flex items-center p-2 hover:bg-gray-100 w-auto'>
        {/* Person with tie icon for Management */}
        <FontAwesomeIcon icon={faUserTie} className='w-6 h-6 mr-2 text-[#951E59]' />
        <div className='flex-1'>
          <p className='text-black font-bold'>Management</p>
          
        </div>
      </div>
  </div>
  )}
  
  </Link>
 
</div>

      
      <Link href='/testimonials' className='mx-2 hover:text-[#951E59] text-base text-black font-bold'>
        Content
      </Link>
    </div>
<div className='flex flex-col items-center mt-4 gap-8'>
      <Link
        href='/auth'
        className=' w-full max-w-[200px] mx-2 bg-gradient-to-b from-[#951E59] to-[#353B77] hover:from-[#353B77] hover:to-[#951E59] text-white font-bold px-4 py-2 rounded-md shadow-md transition-all'
      >
        Contact Us
      </Link>
    </div>
      </div>
    </div>
  )
}
