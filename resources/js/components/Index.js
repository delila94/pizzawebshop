import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function Blog() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component index</div>
                        <div className="card-body">Ovo ce biti pizza narudzba blaaaa</div>
                        <label for="cars">Choose a car:</label>

<select id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
                    </div>
                </div>
            </div>
        </div>

    );
}


if (document.getElementById('blog')) {
    ReactDOM.render(<Blog />, document.getElementById('blog'));
}
