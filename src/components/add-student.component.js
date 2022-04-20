import React, { Component } from "react";
import StudentDataService from "../services/student.service";
export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);
    this.state = {
      id: null,
      name: "",
      age: 0,
      gender: "",
      submitted: false,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }
  saveStudent() {
    var data = {
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
    };
    StudentDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          age: response.data.age,
          gender: response.data.gender,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newStudent() {
    this.setState({
      id: null,
      name: "",
      age: 0,
      gender: "",
      submitted: false,
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Student created successfully!</h4>
            <button className="btn btn-success" onClick={this.newStudent}>
              Create
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>

              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={this.state.gender === "Male"}
                    onChange={this.onChangeGender}
                  />
                  Male
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={this.state.gender === "Female"}
                    onChange={this.onChangeGender}
                  />
                  Female
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={this.state.gender === "Other"}
                    onChange={this.onChangeGender}
                  />
                  Other
                </label>
              </div>
            </div>
            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
