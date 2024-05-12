import CoworksRoute from "@/app/(rootLayout)/coworkings/CoworksRoute";
import "./style.css";

export const Coworks: React.FC<{ id: string }> = (props) => {
  return (
    <section id={props.id} className="section property" aria-label="property">
      <div className="container">
        <h2 className="h2 section-title">Nuestras oficinas</h2>

        <CoworksRoute />
      </div>
    </section>
  );
};

export default Coworks;
