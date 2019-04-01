import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios';
import AddStudent from './add_student';
import StudentTable from './students_table';

// let id = 100;

class App extends Component {
    state = {
        students: [],
        error: ''
    }

    // addStudent = (student) => {
    //     student.id = id++;
    //     this.setState({
    //         students: [...this.state.students, student]
    //     });
    // }

    addStudent = async (student) => {
        await axios.post('/api/grades', student);
        this.getStudentData();
    }

    // deleteStudent = (id) => {
    //     const studentsCopy = this.state.students.slice();
    //     const index = studentsCopy.findIndex((student) => {
    //         return student.id === id;
    //     });

    //     // console.log('Found Index:', index);

    //     if (index >= 0) {
    //         studentsCopy.splice(index, 1);
    //         this.setState({
    //             students: [...studentsCopy]
    //         });
    //     }
    // }

    deleteStudent = async (id) => {
        await axios.delete(`/api/grades/${id}`);
        this.getStudentData();
    }

    componentDidMount() {
        this.getStudentData();
    }

    // getStudentData() {
    //     //call server here

    //     axios.get('http://localhost:3001/api/grades').then((resp) => {
    //         console.log("Server Response:", resp);
    //         this.setState({
    //             students: resp.data.data
    //         });
    //     }).catch((err) => {
    //         console.log('Error getting student data:', err.message);
    //         this.setState({
    //             error: 'Error retrieving student data'
    //         });
    //     });
    // }

    async getStudentData() {
        //call server here

        try {
            const resp = await axios.get('/api/grades');
            this.setState({
                students: resp.data.data
            });
        } catch (err) {
            // console.log('Error getting data:', err.message);
            this.setState({
                error: 'Error retrieving student data'
            });
        }
    }

    render() {
        return (
            <div>
                <h1 className="center">React SGT</h1>
                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <StudentTable col="s12 m8" delete={this.deleteStudent} list={this.state.students} />
                    <AddStudent col="s12 m4" add={this.addStudent} />
                </div>
            </div>
        );
    }
}

export default App;