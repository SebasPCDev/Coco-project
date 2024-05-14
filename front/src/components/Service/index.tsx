import styles from "./Service.module.css"

export const Service: React.FC<{ id: string }>= (props) => {
    return(
        <section id={props.id} className="section service" aria-label="service">
        <div className={styles.container}>

          <h2 className={`${styles.h2} ${styles.sectiontitle}`}>Como reservar</h2>

          <p className={styles.sectiontext}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam eos repellendus necessitatibus deserunt repellendus necessitatibus deserunt 
          </p>

          <ul className={styles.servicelist}>

            <li>
              <div className={styles.servicecard}>

                <div className={styles.cardicon}>
                  1
                </div>

                <h3 className={`${styles.h3} ${styles.cardtitle}`}>Encuentra Tu espacio ideal</h3>

                <p className={styles.cardtext}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet molestias modi id fugit adipisci 
                </p>

              </div>
            </li>

            <li>
              <div className={styles.servicecard}>

                <div className={styles.cardicon}>
                  2
                </div>

                <h3 className={`${styles.h3} ${styles.cardtitle}`}>Haz una reserva</h3>

                <p className={styles.cardtext}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet molestias modi id fugit adipisci 
                </p>

              </div>
            </li>

            <li>
              <div className={styles.servicecard}>

                <div className={styles.cardicon}>
                  i
                </div>

                <h3 className={`${styles.h3} ${styles.cardtitle}`}>Coordina el encuentro</h3>

                <p className={styles.cardtext}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet molestias modi id fugit adipisci 
                </p>

              </div>
            </li>

          </ul>

        </div>
      </section>
    )
}

export default Service;