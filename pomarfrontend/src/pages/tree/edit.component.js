import React, { Component } from 'react';
import api from '../../services/api';

export default class EditTree extends Component {
  constructor(props) {
    super(props);
    this.onChangeInformation = this.onChangeInformation.bind(this);
    this.onChangeSpecieId = this.onChangeSpecieId.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);        
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      information: '',
      specieId: 0,
      treeAge: ''
    }
  }

  componentDidMount() {
    api.get('/Tree/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id: response.data.id,
                information: response.data.information,
                specieId: response.data.specieId,
                treeAge: response.data.treeAge });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeInformation(e) {
    this.setState({
      information: e.target.value
    });
  }

  onChangeSpecieId(e) {
    this.setState({
      specieId: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      treeAge: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      id: this.state.id,
      information: this.state.information,
      specieId: this.setState.specieId,
      treeAge: this.setState.treeAge
    };    

    api.put('/Tree/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Tree</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Information:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.information}
                      onChange={this.onChangeInformation}
                      />
                </div>     
                <div className="form-group">
                    <label>Specie:  </label>
                    <input 
                      type="value" 
                      className="form-control" 
                      value={this.state.specieId}
                      onChange={this.onChangeSpecieId}
                      />
                </div>             
                <div className="form-group">
                    <label>Age:  </label>
                    <input 
                      type="Date" 
                      className="form-control" 
                      value={this.state.treeAge}
                      onChange={this.onChangeAge}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Tree" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}