import React, { Component } from 'react'
import getInfo from '../data/functions'
import axios from 'axios';

export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      candidate_id: '',
      communication_percentile: '',
      coding_percentile: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    axios.get(`/api/candidate/${this.state.candidate_id}`)
      .then(res => console.log('after axios call', res))
    console.log('got candidate id: ', this.state.candidate_id)
  }

  handleChange(evt){
    evt.preventDefault();
    this.setState({candidate_id: evt.target.value})
  }

  render(){
    return (
      <div>
        <header>
          <h1>Simple Fractal Take-Home</h1>
          <hr />
          <div id="id_submission">
            <form onSubmit={this.handleSubmit}>
              <label>
                Candidate Id:
                  <input
                    type="text"
                    placeholder="enter your candidate id"
                    name="candidate_id"
                    value={this.state.candidate_id}
                    onChange={this.handleChange}/>
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
