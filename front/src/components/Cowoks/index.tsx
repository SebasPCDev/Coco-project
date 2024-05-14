import CoworksRoute from "@/app/(rootLayout)/coworkings/CoworksRoute";
import styles from "./Coworks.module.css";

/////////////
// Santiago
////////////

export const Coworks: React.FC<{ id: string }> = (props) => {
  return (
    <section id={props.id} className={`${styles.section} ${styles.property}`} aria-label="property">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${styles.sectiontitle}`}>Nuestras oficinas</h2>
        <CoworksRoute />
      </div>
    </section>
  );
};

export default Coworks;
