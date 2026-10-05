import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Used to know whether we are creating or editing
  const [editingId, setEditingId] = useState(null);

  const [student, setStudent] = useState({
    fname: "",
    lname: "",
    age: "",
    totalmarks: "",
    city: ""
  });


  // Get all students
  const getStudents = () => {

    fetch("http://localhost:8080/student/getAllStudents")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });

  };


  useEffect(() => {
    getStudents();
  }, []);


  // Handle input changes
  const handleChange = (event) => {

    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value
    });

  };


  // Open form for creating
  const openAddForm = () => {

    setEditingId(null);

    setStudent({
      fname: "",
      lname: "",
      age: "",
      totalmarks: "",
      city: ""
    });

    setShowForm(true);

  };


  // Open form for editing
  const openEditForm = (studentData) => {

    setEditingId(studentData.sid);

    setStudent({
      fname: studentData.fname,
      lname: studentData.lname,
      age: studentData.age,
      totalmarks: studentData.totalmarks,
      city: studentData.city
    });

    setShowForm(true);

  };


  // Create or Update
  const handleSubmit = (event) => {

    event.preventDefault();


    const studentData = {

      fname: student.fname,
      lname: student.lname,
      age: Number(student.age),
      totalmarks: Number(student.totalmarks),
      city: student.city

    };


    // UPDATE
    if (editingId !== null) {

      fetch(
        `http://localhost:8080/student/updateStudent/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(studentData)

        }
      )

        .then((response) => response.json())

        .then((data) => {

          console.log("Student updated:", data);
          setMessage("Student updated successfully!");
          setError("");

          setShowForm(false);

          setEditingId(null);

          setStudent({
            fname: "",
            lname: "",
            age: "",
            totalmarks: "",
            city: ""
          });

          getStudents();

        })

        .catch((error) => {
          setError("Failed to update student.");
          setMessage("");

          console.error(
            "Error updating student:",
            error
          );

        });

    }


    // CREATE
    else {

      fetch("http://localhost:8080/student/ss", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(studentData)

      })

        .then((response) => response.json())

        .then((data) => {

          console.log("Student created:", data);
          setMessage("Student added successfully!");
          setError("");

          setShowForm(false);

          setStudent({
            fname: "",
            lname: "",
            age: "",
            totalmarks: "",
            city: ""
          });

          getStudents();

        })

        .catch((error) => {
          setError("Failed to add student.");
          setMessage("");
          console.error(
            "Error creating student:",
            error
          );

        });

    }

  };

  // Delete student

  const deleteStudent = (sid) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`http://localhost:8080/student/deleteStudent/${sid}`, {
      method: "DELETE"
    })
      .then((response) => response.text())
      .then((data) => {

        console.log(data);

        setMessage("Student deleted successfully!");
        setError("");

        getStudents();

      })
      .catch((error) => {

        console.error("Error deleting student:", error);

        setError("Failed to delete student.");
        setMessage("");

      });

  };

  const filteredStudents = students.filter((student) => {

    const search = searchTerm.toLowerCase();

    return (
      student.fname.toLowerCase().includes(search) ||
      student.lname.toLowerCase().includes(search) ||
      student.city.toLowerCase().includes(search) ||
      student.sid.toString().includes(search)
    );

  });

  if (!isLoggedIn) {
    return (
      <div className="login-page">

        <div className="login-card">

          <div className="login-logo">
            👦🏻👱‍♀️
          </div>

          <h1>Student Portal</h1>

          <p>Welcome back!</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsLoggedIn(true);
            }}
          >

            <div className="login-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="login-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                required
              />

            </div>

            <button
              type="submit"
              className="login-button"
            >
              🌱 Sign In
            </button>

          </form>

        </div>

      </div>
    );
  }
  return (

    <div className="page">


      {/* Clouds */}

      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      {/* Side Decorations */}

      {/* Side Decorations */}

      <div className="side-decoration left-decoration">

        <div className="aero-bubble bubble-a"></div>
        <div className="aero-bubble bubble-b"></div>

        <div className="aero-leaf leaf-a">
          <span></span>
        </div>

        <div className="aero-drop drop-a"></div>

      </div>


      <div className="side-decoration right-decoration">

        <div className="aero-bubble bubble-c"></div>
        <div className="aero-bubble bubble-d"></div>

        <div className="aero-leaf leaf-b">
          <span></span>
        </div>

        <div className="aero-drop drop-b"></div>

      </div>

      {/* Header */}

      <header className="header">

        <div className="logo-circle">
          🎓
        </div>

        <div>

          <h1>Student Portal</h1>

          <p>
            Welcome to your student management world
          </p>

        </div>

      </header>


      {/* Main Card */}

      <main className="glass-card">


        {/* Card Header */}

        <div className="card-header">
          {message && (
            <div className="success-message">
              ✅ {message}
            </div>
          )}

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}
          <div>

            <h2>
              🌿 Student Directory
            </h2>

            <p>
              Manage your students in one place
            </p>

          </div>


          <div className="header-actions">

            <input
              type="text"
              placeholder="🔍 Search students..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="search-input"
            />

            <button
              className="add-button"
              onClick={openAddForm}
            >
              ＋ Add Student
            </button>

          </div>

        </div>


        {/* Student Form */}

        {showForm && (

          <div className="student-form">

            <h2>

              {editingId !== null
                ? "✏️ Update Student"
                : "🌱 Add New Student"}

            </h2>


            <form onSubmit={handleSubmit}>


              <div className="form-grid">


                {/* First Name */}

                <div className="form-group">

                  <label>
                    First Name
                  </label>

                  <input
                    type="text"
                    name="fname"
                    value={student.fname}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Last Name */}

                <div className="form-group">

                  <label>
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lname"
                    value={student.lname}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Age */}

                <div className="form-group">

                  <label>
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Total Marks */}

                <div className="form-group">

                  <label>
                    Total Marks
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    name="totalmarks"
                    value={student.totalmarks}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* City */}

                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={student.city}
                    onChange={handleChange}
                    required
                  />

                </div>


              </div>


              {/* Form Buttons */}

              <div className="form-buttons">


                <button
                  type="submit"
                  className="save-button"
                >

                  {editingId !== null
                    ? "✏️ Update Student"
                    : "🌱 Save Student"}

                </button>


                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                >

                  Cancel

                </button>


              </div>


            </form>

          </div>

        )}


        {/* Student Table */}

        <div className="table-container">

          <table>


            <thead>

              <tr>

                <th>ID</th>

                <th>First Name</th>

                <th>Last Name</th>

                <th>Age</th>

                <th>City</th>

                <th>Total Marks</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student.sid}>


                  <td>
                    {student.sid}
                  </td>


                  <td>
                    {student.fname}
                  </td>


                  <td>
                    {student.lname}
                  </td>


                  <td>
                    {student.age}
                  </td>


                  <td>
                    {student.city}
                  </td>


                  <td>
                    {student.totalmarks}
                  </td>


                  <td>

                    {/* EDIT */}

                    <button
                      className="edit-button"
                      onClick={() =>
                        openEditForm(student)
                      }
                    >
                      ✏️
                    </button>


                    {/* DELETE - we'll implement next */}

                    <button
                      className="delete-button"
                      onClick={() => deleteStudent(student.sid)}
                    >
                      🗑️
                    </button>

                  </td>


                </tr>

              ))}

            </tbody>


          </table>

        </div>


      </main>


      {/* Water */}

      <div className="water">

        <div className="wave wave1"></div>

        <div className="wave wave2"></div>

        <div className="water-bubble bubble1"></div>

        <div className="water-bubble bubble2"></div>

        <div className="water-bubble bubble3"></div>

      </div>


    </div>

  );

}

export default App;