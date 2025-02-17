import { useState } from "react"
import logo from "../assets/images/logo.svg"


function Header() {
    const [toggleNav, setToggleNav] = useState(false)


    const handleButtonNav = () => {
        const menu = document.getElementById("burgerMenu")
        setToggleNav(!toggleNav)
        if (!toggleNav) {

            menu!.classList.remove("translate-x-0"); 
            menu!.classList.add("translate-x-full");
        } else{
            menu!.classList.remove("translate-x-full"); 
            menu!.classList.add("translate-x-0");
        }
    }

    
    
    
  return (

    <header className="">
        <div className="bg-secondary ">
            <div className="container font-inter text-primary mx-auto flex items-center justify-between px-4 py-2">
                <div>
                    <p>+0012345678</p>
                </div>
                <div>Language</div>
            </div>

        </div>
        <div className="shadow w-full relative z-10">
            <div className="container  mx-auto flex items-center justify-between lg:justify-normal lg:flex-row p-4">
                <div className="lg:mr-10">
                    <img className=""src={logo} alt="logo Recycloo"/>
                </div>
                <div className="hidden lg:w-full lg:flex lg:flex-row lg:justify-between items-center">
                    <div>
                        <ul className="flex flex-row font-inter text-tertiary font-medium">
                            <li className="px-5 font-semibold hover:text-zinc-400 transition-all ease-in duration-200">Catégories</li>
                            <li className="px-5 font-semibold hover:text-zinc-400 transition-all ease-in duration-200">Bons plans</li>
                            <li className="px-5 font-semibold hover:text-zinc-400 transition-all ease-in duration-200">Nouveaux</li>
                            <li className="px-5 font-semibold hover:text-zinc-400 transition-all ease-in duration-200">Livraison</li>
                        </ul>
                    </div>
                    <div className="relative w-xl">
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6 absolute right-4 top-1.5 text-gray-500">
                            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                        </svg>
                        <input type='text' className=" w-full py-1 px-3 border-2 focus-visible:outline-blue-600 border-gray-500 rounded-xl" placeholder="Rechercher un produit "></input>
                    </div>
                    <div>
                    <ul className="flex flex-row font-inter text-tertiary font-medium">
                            <li className="px-5 flex flex-row font-semibold hover:text-zinc-400 transition-all ease-in duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>

                                Compte
                            </li>
                            <li className="px-5 flex flex-row font-semibold hover:text-zinc-400 transition-all ease-in duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-2 size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                                Panier
                            </li>
                    </ul>
                    </div>
                </div>
                <button className="lg:hidden" onClick={handleButtonNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>

        <nav id="burgerMenu" className="absolute right-0 w-full h-full bg-primary shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden">
            
        <div className="relative p-4 w-4xs mx-auto">
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6 absolute right-6 top-5 text-gray-500">
                            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                        </svg>
                        <input type='text' className=" w-full py-1 px-3 border-2 focus-visible:outline-blue-600 border-gray-500 rounded-xl" placeholder="Rechercher un produit "></input>
                    </div>
            <hr className="w-32 mx-auto text-secondary mt-2 mb-2" />

            <ul className=" flex flex-col items-center text-secondary font-semibold font-inter">
                <li className="nav-burger-button text-center">Accueil</li>
                <li className="nav-burger-button text-center">Catalogues</li>
                <li className="nav-burger-button text-center">azeazezae</li>
                <li className="nav-burger-button text-center">azeazezae</li>
            </ul>
            <hr className="w-32 mx-auto text-secondary mt-2 mb-2" />
            <ul className="flex flex-col items-center text-secondary font-semibold font-inter">
                <li className="nav-burger-button text-center flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    Compte
                </li>
                <li className="nav-burger-button text-center flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-1 size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>

                    Panier
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header