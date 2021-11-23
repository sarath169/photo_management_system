import React from 'react'

function Image(props) {
    return (
        <div>
          <div className="row center">
            <div className="col s6 m4">
              <div className="card">
                <div className="card-image">
                  <img src={props.src}></img>
                </div>
                <div class="card-action center">
                  <a href="#">Add to favourites</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Image
