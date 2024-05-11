import "./style.css"

export const Service: React.FC<{ id: string }>= (props) => {
    return(
        <section id={props.id} className="section service" aria-label="service">
        <div className="container">

          <h2 className="h2 section-title">Como reservar</h2>

          <p className="section-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam eos repellendus necessitatibus deserunt repellendus necessitatibus deserunt 
          </p>

          <ul className="service-list">

            <li>
              <div className="service-card">

                <div className="card-icon">
                  1
                </div>

                <h3 className="h3 card-title">Encuentra Tu espacio ideal</h3>

                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet molestias modi id fugit adipisci 
                </p>

              </div>
            </li>

            <li>
              <div className="service-card">

                <div className="card-icon">
                  2
                </div>

                <h3 className="h3 card-title">Haz una reserva</h3>

                <p className="card-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet molestias modi id fugit adipisci 
                </p>

              </div>
            </li>

            <li>
              <div className="service-card">

                <div className="card-icon">
                  i
                </div>

                <h3 className="h3 card-title">Coordina el encuentro</h3>

                <p className="card-text">
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