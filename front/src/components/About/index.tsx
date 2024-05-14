import styles from "./About.module.css"

export const About = ()=>{
    return(
        <section className={styles.section} aria-label="prodmin">
        <div className={`${styles.container} ${styles.prodmin}`}>

          <div className={`${styles.prodminbanner} ${styles.imgholder}`} style={{width: "600", height: "700"}}>
            <img src="/coco-about.jpg" alt="" />
          </div>

          <div className={styles.prodmincontent}>

            <h2 className={`${styles.h2} ${styles.sectiontitle}`}>Nuestra Historia y compromiso</h2>

            <p className={styles.sectiontext}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus tenetur aliquam molestiae, recusandae aut magnam eveniet, magni dolore eos, suscipit id! Nobis iste, delectus aspernatur debitis molestiae architecto? Aliquid.
            </p>

            <a href="#" className={`${styles.btn} ${styles.btnprimary}`}>Ver mas</a>

          </div>

        </div>
      </section>
    )
}