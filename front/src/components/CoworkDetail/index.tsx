"use client"
import { useState } from "react";
import styles from "./CoworkDetail.module.css"

const slides = [
    { url: "https://www.thedigitalnomad.asia/wp-content/uploads/2022/02/Coworking-spaces.jpeg", title: "Imagen cowork 1" },
    { url: "https://coworkingmag.com/wp-content/uploads/sites/76/2019/07/district-28-e1563430078466.jpg", title: "boat" },
    { url: "https://dr3h7ptpe31k5.cloudfront.net/Assets/images/2333/Creative-Serviced-Office-Taipei-Zhongzheng-District-119-Chongqing-South-Road-583741.jpg", title: "Imagen cowork 2" },
    { url: "https://officehub.s3-ap-southeast-2.amazonaws.com/Assets/images/2333/Creative-Serviced-Office-Taipei-Zhongzheng-District-119-Chongqing-South-Road-728863.jpg", title: "Imagen cowork 3" },
    { url: "https://assets-global.website-files.com/605baba32d94435376625d33/650cb9a6f4a5283dccb4288d_ho_chi_minh_city_cowork-sharespace_vietnam.jpg", title: "Imagen cowork 4" },
  ];

  const containerStyles = {
    width: "500px",
    height: "400px",
    margin: "0 auto",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    border: "1px solid #868686",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#0f4b00",
    background: "#efefefcf",
    border: "1px solid #fff",
    borderRadius: "7px",
    padding: "7px",
    zIndex: 1,
    cursor: "pointer",
    marginRight: "-2.4rem",
  };
  
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#0f4b00",
    background: "#efefefcf",
    border: "1px solid #fff",
    borderRadius: "7px",
    padding: "7px",
    zIndex: 1,
    cursor: "pointer",
    marginLeft: "-2.4rem",
  };
  
  const sliderStyles = {
    position: "relative",
    height: "100%",
    boxShadow: "0px 0px 26px -7px rgba(0, 0, 0, 0.44)", 
    borderRadius: "10px",
};
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };




export const CoworkDetail =({...cowork})=>{



    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${slides[currentIndex].url})`,
    };


    return(
        <>
            <main>
                <section className={`${styles.section} ${styles.prodmin}`} aria-label="prodmin">
                  <div className={`{styles.contenedor} ${styles.contproducto}`}>

                    <div className={styles.imagenesdeslizable}>
                

                      {/* =============== swiper IMAGENES-DESLIZABLE THUMBNAIL ===============  */}
                      <div className={styles.imagenesdeslizable__overflow}>
                    <div className="" style={containerStyles}>
                    <div style={sliderStyles}>
                        <div>
                            <div onClick={goToPrevious} style={leftArrowStyles}>
                              ❰
                            </div>
                            <div onClick={goToNext} style={rightArrowStyles}>
                              ❱
                            </div>
                          </div>
                          <div style={slideStylesWidthBackground}></div>
                          <div style={dotsContainerStyles}>
                            {slides.map((slide, slideIndex) => (
                              <div
                                style={dotStyle}
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                              >
                                ●
                              </div>
                            ))}
                          </div>
                        </div>
                    </div>

                      </div>
                  </div>

                      <div className={styles.prodmincontent}>


                      <h2 style={{marginBottom: "1rem"}} className={`${styles.h2} ${styles.sectiontitle}`}>{cowork.name}</h2>

                      <article className={styles.jobcard}>
                          <div>
                            <p className={styles.texttitle}>{cowork.address}</p>
                            <p className={styles.postdate}>Posted on 23 Dec, 2023</p>
                          </div>

                          <div className={styles.budgetexp}>
                            <div>
                              <p className={styles.value}>Apertura</p>
                              <p className={styles.label}>{cowork.open}</p>
                            </div>
                            <div>
                              <p className={styles.value}>Cierre</p>
                              <p className={styles.label}>{cowork.open}</p>
                            </div>
                            <div>
                              <p className={styles.value}>Capacidad</p>
                              <p className={styles.label}>{cowork.capacity}</p>
                            </div>
                          </div>

                          <p className={styles.textbody}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, quis possimus dignissimos ex ut libero quasi voluptatum recusandae sapiente odit veritatis corrupti neque 
                          </p>

                          <div className={styles.tags}>
                            <article>
                              <p>{cowork.phone}</p>
                              <p>{cowork.email}</p>
                            </article>
                          </div>

                          <div>
                            <a href="/job/<%= job._id %>">
                              <button className={styles.cardbtn}>Reservar</button>
                            </a>
                          </div>
                        </article>
                      </div>
                  </div>
                </section>

                <section className={styles.inmueblecaract}>
                    <div className={styles.contenedor}>
                      <div className={styles.contgeneralcaract}>
                        <div className={styles.caractinfbasica}>
                          <h3 className={styles.caracttitle}>Ubicacion</h3>
                        </div>

                        <div className={styles.contgeneralcaractchecks}> 
                          <p className={styles.caractchecks}>
                            <i className="fa-solid fa-check"></i> Pais: {cowork.country}<br/>
                            <i className="fa-solid fa-check"></i> Estado/Provincia: {cowork.state}<br/>
                            <i className="fa-solid fa-check"></i> Ciudad: {cowork.city}<br/>
                          </p>
                        </div>

                        <div className={styles.contgeneralcaractchecks2}>
                          <p className={styles.caractchecks}>
                            <i className="fa-solid fa-check"></i> extra: 1 <br/>
                            <i className="fa-solid fa-check"></i> extra: 4<br/>
                            <i className="fa-solid fa-check"></i> extra <br/>
                            <i className="fa-solid fa-check"></i> extra <br/>
                          </p>
                        </div>

                        <div className={styles.contgeneralcaractsup}>
                          <h3 className={styles.caracttitle}>Informacion extra</h3>
                        </div>

                        <div className={styles.contgeneralcaractsupchecks}>
                                          <p className={styles.caractchecks}>
                            <i className="fa-solid fa-ruler-combined"></i> extra extra extra<br/>
                          </p>
                        </div>

                        <div className={styles.contgeneralcaractdesc}> 
                          <h3 className="caract-title">Descripción</h3>
                        </div>

                        <div className={styles.contgeneralcaractdesccont}>
                          <p className={styles.caractdescripcion}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae, similique. Aperiam quae harum eos? Natus, autem! Voluptatibus quos amet veritatis veniam, maxime quo ipsam sequi, reiciendis fugit ducimus culpa doloribus!
                          </p>
                        </div>

                        <div className={styles.contgeneralcaractserv}>
                          <p className={styles.caractchecks}>
                            <h3 className={styles.caracttitle}>Informacion extra</h3>
                          </p>
                        </div>

                        <div className={styles.contgeneralcaractservchecks}>
                          <p className={styles.caractchecks}>
                            <i className="fa-solid fa-bolt"></i> extra <br/>
                            <i className="fa-solid fa-faucet-drip"></i> extra extra<br/>
                            <i className="fa-solid fa-fire-flame-simple"></i> extra extra <br/>
                            <i className="fa-solid fa-toilet"></i> extra <br/>
                          </p>
                        </div>

                      </div>
                    </div>
                </section>

                <section className={styles.mapadireccion}>
                  <div className={styles.contenedor}>
                    <h2 className={styles.mapatitulo}>Ubicación (ejemplo)</h2>
                    <div className={styles.googlemapslink}>
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.2606598425305!2d-58.353735624866346!3d-34.673370261178974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3331dcd68fd89%3A0x92dfdde0df93960a!2sAv.%20Bartolom%C3%A9%20Mitre%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1691671696243!5m2!1ses!2sar" ></iframe>
                    </div>
                  </div>
                </section>
            </main>


        </>
    )
}

export default CoworkDetail;