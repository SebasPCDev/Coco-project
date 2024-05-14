import Image from "next/image";
import styles from "./Banner.module.css"

export const Banner =()=>{
    

    return(
        <section className={`&{styles.section} ${styles.hero}`} aria-label="hero">
            <div className={styles.container}>

              <div className={styles.herobg}>
                <div className={styles.herocontent}>
                  <div className={styles.slogancont}>
                  <Image
                    className={styles.logoslogan}
                    src="/logo-slogan.png"
                    alt="logo" 
                    width={150} 
                    height={150} 
                    style={{filter: "invert(100%) brightness(200%)"}}
                  />

                  <h1 className={`${styles.h1} ${styles.herotitle}`}>
                    El Espacio Ideal. <br/> <span className={`${styles.span} ${styles.herotitlespan}`}>Coworking</span> Para tu empresa
                  </h1>

                  </div>

                  <p className={styles.herotext}>
                    ¡Descubre y reserva! Una infinidad de oficinas y espacios de Coworking que se adapten a tu ubicacion
                  </p>

                </div>
              </div>

            </div>
        </section>
    )


}

export default Banner;