import React, { Component } from "react";
import StudentDataService from "../services/student.service";
export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.state = {
      currentStudent: {
        id: null,
        name: "",
        age: 0,
        gender: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getStudent(this.props.match.params.id);
  }
  onChangeName(e) {
    const name = e.target.value;
    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          name: name,
        },
      };
    });
  }
  onChangeAge(e) {
    const age = e.target.value;

    this.setState((prevState) => ({
      currentAge: {
        ...prevState.currentStudent,
        age: age,
      },
    }));
  }
  getStudent(id) {
    StudentDataService.get(id)
      .then((response) => {
        this.setState({
          currentStudent: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateStudent() {
    StudentDataService.update(
      this.state.currentStudent.id,
      this.state.currentStudent
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The student was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  deleteStudent() {
    StudentDataService.delete(this.state.currentStudent.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/students");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { currentStudent } = this.state;
    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Student</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentStudent.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={currentStudent.age}
                  onChange={this.onChangeAge}
                />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                {currentStudent.gender}
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStudent}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStudent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}
