import React, { Component } from 'react'

export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      candidate_id: '',
      communication_percentile: '',
      coding_percentile: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.setState({candidate_id: evt.target.candidate_id})
  }

  render(){
    return (
      <div>
        <header>
          <h1>Simple Fractal Take-Home</h1>
          <hr />
          <div id="id_submission">
            <form>
              <label>
                Candidate Id:
                  <input type="text" name="candidate_id" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </header>
        <div id="main">
          <div id="percentile_displays">
            <div id="communcation" className="percentile">
              <h3>Communication</h3>
            </div>
            <div id="coding" className="percentile">
              <h3>Coding</h3>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
