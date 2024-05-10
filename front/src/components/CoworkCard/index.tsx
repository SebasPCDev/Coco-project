import "./style.css"
export const CoworkCard =({cowork})=>{

    return(
        <div className="property-card">
            <figure className="card-banner img-holder" style={{width: "800", height: "533"}}>
                <img src={cowork.image} width="800" height="533" loading="lazy"
                alt="espacio 5" className="img-cover"/>
            </figure>
            {/* <button className="card-action-btn favourite-btn " aria-label="add to favourite">
                <div className="heart-container" title="Like">
            <input type="checkbox" className="checkbox" id="Give-It-An-Id"/>
            <div className="svg-container">
                <svg viewBox="0 0 24 24" className="svg-outline">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg viewBox="0 0 24 24" className="svg-filled">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg className="svg-celebrate" width="100" height="100">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
            </button> */}
            <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">{cowork.name}</a>
                </h3>
                <ul className="card-list">
                    <li className="card-item">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </li>
                    <li className="card-item">
                        <span className="item-text">{cowork.dateOpen}am</span>
                    </li>
                    <span>-</span>
                    <li className="card-item">
                        <span className="item-text">{cowork.dateClose}pm</span>
                    </li>
                </ul>
                <div className="card-meta">
                    <div>
                        <span className="meta-title">
                            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
                            Ubicacion
                        </span>
                        <span className="meta-text">
                          {`${cowork.location.city}, ${cowork.location.state}, ${cowork.location.country}`}
                        </span>
                    </div>
                    {/* <div>
                        <span className="meta-text">
                            <div className="rating-wrapper">
                                <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                            </div>
                            <span className="raing-text" >{cowork.rate.toString()}</span>
                        </span>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default CoworkCard;