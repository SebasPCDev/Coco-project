import "./style.css"

export const About = ()=>{
    return(
        <section className="section" aria-label="prodmin">
        <div className="container prodmin">

          <div className="prodmin-banner img-holder" style={{width: "600", height: "700"}}>
            <img src="/coco-about.jpg" alt="" />
          </div>

          <div className="prodmin-content">

            <h2 className="h2 section-title">Nuestra Historia y compromiso</h2>

            <p className="section-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus tenetur aliquam molestiae, recusandae aut magnam eveniet, magni dolore eos, suscipit id! Nobis iste, delectus aspernatur debitis molestiae architecto? Aliquid.
            </p>

            <a href="#" className="btn btn-primary">Ver mas</a>

          </div>

        </div>
      </section>
    )
}