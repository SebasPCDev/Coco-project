
import "./style.css"

export const Coworks: React.FC<{ id: string }>= (props) => {
    return(
        <section id={props.id} className="section property" aria-label="property">
        <div className="container">

          <h2 className="h2 section-title">Espacios destacados</h2>

          <p className="section-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet molestias modi id fugit adipisci 
          </p>

          <ul className="property-list">
            
          </ul>

        </div>
      </section>
    )
}

export default Coworks;