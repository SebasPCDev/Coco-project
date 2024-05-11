import Image from "next/image";
import "./style.css"

export const Banner =()=>{
    

    return(
        <section className="section hero" aria-label="hero">
            <div className="container">

              <div className="hero-bg">
                <div className="hero-content">
                  <div className="slogan-cont">
                  <Image
                    className="logo-slogan"
                    src="/logo-slogan.png"
                    alt="logo" 
                    width={150} 
                    height={150} 
                    style={{filter: "invert(100%) brightness(200%)"}}
                  />

                  <h1 className="h1 hero-title">
                    El Espacio Ideal. <span className="span">Coworking</span> Para tu empresa
                  </h1>

                  </div>

                  <p className="hero-text">
                    ¡Descubre y reserva! Una infinidad de oficinas y espacios de Coworking que se adapten a tu ubicacion
                  </p>

                </div>
              </div>

            </div>
        </section>
    )


}

export default Banner;