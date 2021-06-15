import React from 'react'

export const Favorites = () => {
  return (
    <div className="Favorites">
      <div className="container">
            <ul className="collection with-header">
            <li className="collection-header"><h4>Favorites</h4></li>

            <li className="collection-item avatar">
              <img src="images/yuna.jpg" alt="" className="circle" />
              <span className="title">Title</span>
              <p>First Line <br/>
                  Second Line
              </p>
              <a href="/#" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>

            <li className="collection-item avatar">
            <i className="material-icons circle">folder</i>
            <span className="title">Title</span>
            <p>First Line <br/>
                Second Line
            </p>
            <a href="/#" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            <li className="collection-item avatar">
            <i className="material-icons circle green">insert_chart</i>
            <span className="title">Title</span>
            <p>First Line <br/>
                Second Line
            </p>
            <a href="/#" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            <li className="collection-item avatar">
            <i className="material-icons circle red">play_arrow</i>
            <span className="title">Title</span>
            <p>First Line <br/>
                Second Line
            </p>
            <a href="/#" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            </ul>
        </div>
    </div>
  )
}


