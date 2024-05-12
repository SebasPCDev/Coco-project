import Image from "next/image";
import "./style.css";
import Link from "next/link";
import Logout from "../header/logout";
export const NavBar = ()=>{
    return(
        <nav>
            <form action="#">
                <div className="container-bus">
                <div className="search-container">
                  <input placeholder="Search..." className="input" type="text"/>
                  <svg viewBox="0 0 24 24" className="search__icon">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                      </path>
                    </g>
                  </svg>
                </div>
                </div>
            </form>
            <input type="checkbox" id="theme-toggle" hidden/>
        
            <Link href="/" className="profile">
                  <Image
                    className="logo-norm"
                    src="/logo-norm.png"
                    alt="logo" 
                    width={150} 
                    height={150} 
                  />
                <Image
                    className="logo-responsive"
                    src="/logo-responsive.png"
                    alt="logo" 
                    width={150}
                    height={150}
                  />

            </Link>
            <Logout/>
        </nav>
    );
}

export default NavBar;