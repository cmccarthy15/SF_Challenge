import React, { Component } from 'react'
import getInfo from '../data/functions'
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';

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
      .then(res => {
        this.setState(res.data)
      })
  }

  handleChange(evt){
    evt.preventDefault();
    this.setState({candidate_id: evt.target.value})
  }

  render(){
    console.log('this.state', this.state)
    const coding = this.state.coding_percentile > 0 ? this.state.coding_percentile : 1 ;
    const communication = this.state.coding_percentile > 0 ? this.state.communication_percentile : 1 ;
    console.log('coding and communication scores: ', coding, communication)
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
          {this.state.coding_percentile === null && <p> Input a valid candidate id to see their statistics</p>}
          <div id="percentile_displays">
            <div id="communcation" className="percentile">
              <h3>Communication</h3>
              {this.state.communication_percentile && <CircularProgressbar percentage={communication} initialAnimation={true} />}
            </div>
            <div id="coding" className="percentile">
              <h3>Coding</h3>
              {this.state.coding_percentile && <CircularProgressbar percentage={coding} initialAnimation={true} />}
            </div>
          </div>
        </div>
      </div>

    )
  }
}
