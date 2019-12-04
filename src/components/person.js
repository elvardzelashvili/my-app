import React from "react";

class Person extends React.Component {
  state = {
    searchId: "",
    findUser: "",
    findUserCar: "",
    name: "",
    surname: "",
    fatherName: "",
    IdNumber: "",
    birthdate: "",
    id: 0,
    editName: "",
    editSurname: "",
    editBirthDate: "",
    editFatherName: "",
    editIdNumber: "",
    editIndex: "",
    showEditForm: false,
    disabled: false,
    values: [],
    cars: []
  };
  handleDisable = index => {
    this.setState({ disabled: !this.state.disabled });
  };
  handleDelete = index => {
    this.state.values.splice(index, 1);
    this.setState({ values: this.state.values });
    localStorage.setItem("data", JSON.stringify(this.state.values));
  };

  handleEdit = (index, chosenUser) => {
    this.setState({ showEditForm: true });
    const users = this.state.values;
    const user = users[index];
    console.log(user);

    this.setState({
      editName: user.name,
      editSurname: user.surname,
      editIdNumber: user.IdNumber,
      editFatherName: user.fatherName,
      editBirthDate: user.birthdate,
      editIndex: index
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "") {
      alert("შეავსეთ სრული ინფორმაცია");
    } else {
      const user = this.state.values.find(user => {
        return user.IdNumber === this.state.IdNumber;
      });
      console.log(user)
      if (user !== undefined || user === null ) {
        alert("მსგავსი პირადი ნომრით მომხმარებელი უკვე არსებობს");
        return;
      }
      const lastInsertId = this.state.id + 1;
      const newData = {
        name: this.state.name,
        surname: this.state.surname,
        fatherName: this.state.fatherName,
        IdNumber: this.state.IdNumber,
        birthdate: this.state.birthdate,
        id: lastInsertId
      };
  
      const data = this.state.values;
      data.push(newData);
      this.setState({ values: data });
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("id", lastInsertId);
    }
    
  };

  handleSearch = () => {
    const user = this.state.values.find(user => {
      return user.IdNumber === this.state.searchId;
    });
    console.log(user);
    if (user === undefined) {
      alert("NOT FOUND!!");
      return;
    }
    const userIdNum = user.IdNumber;
    let carName = "";

    if (this.state.cars.length !== 0) {
      const searchForCar = this.state.cars.find(car => {
        return (car.IdNumber = userIdNum);
      });

      if (searchForCar !== null) {
        carName = searchForCar.mark + " " + searchForCar.model;
      }
    }

    this.setState({ findUser: user.name + " " + user.surname + " " + carName });
    this.setState({ findUserCar: user.IdNumber });

    console.log(this.state.findUser);
  };

  handleUpdate = event => {
    const input = event.target;
    const inputName = input.name;
    const value = input.value;

    if (inputName === "editPersonName") {
      this.setState({ editName: value });
    }

    if (inputName === "editPersonSurname") {
      this.setState({ editSurname: value });
    }
    if (inputName === "editFatherName") {
      this.setState({ editFatherName: value });
    }

    if (inputName === "editIdNumber") {
      this.setState({ editIdNumber: value });
    }
    if (inputName === "editBirthDate") {
      this.setState({ editBirthDate: value });
    }
  };

  componentDidMount() {
    let users = JSON.parse(localStorage.getItem("data"));
    let lastInsertId = localStorage.getItem("id");
    let cars = JSON.parse(localStorage.getItem("carData"));

    console.log(cars);

    if (lastInsertId == null) {
      lastInsertId = 0;
    }

    if (cars == null) {
      cars = [];
    }

    if (users == null) {
      users = [];
    }
    this.setState({
      values: users,
      name: "",
      surname: "",
      id: parseInt(lastInsertId),
      cars: cars
    });
  }

  handlechange = event => {
    const input = event.target;
    const value = input.value;
    const inputName = input.name;

    if (inputName === "personName") {
      this.setState({ name: value });
    }

    if (inputName === "personSurname") {
      this.setState({ surname: value });
    }
    if (inputName === "birthdate") {
      this.setState({ birthdate: value });
    }
    if (inputName === "IdNumber") {
      this.setState({ IdNumber: value });
    }
    if (inputName === "fatherName") {
      this.setState({ fatherName: value });
    }
    if (inputName === "searchId") {
      this.setState({ searchId: value });
    }

    console.log(this.state);
  };

  updateUser = () => {
    if (this.state.editIndex !== "") {
      const users = this.state.values;
      const user = users[this.state.editIndex];
      user.name = this.state.editName;
      user.surname = this.state.editSurname;
      user.fatherName = this.state.editFatherName;
      user.IdNumber = this.state.editIdNumber;
      user.birthdate = this.state.editBirthDate;

      users[this.state.editIndex] = user;

      this.setState({ values: users, showEditForm: false });
      localStorage.setItem("data", JSON.stringify(users));
    }
  };

  render() {
    return (
      <div className="person-center ">
        <form>
          <div className="person-row ">
            <div className="person-row">
              <label htmlFor="" className="person-label">
                სახელი:
                <input
                  type="text"
                  name="personName"
                  placeholder="სახელი"
                  onChange={this.handlechange}
                  required
                />
              </label>
              <label htmlFor="" className="person-label">
                გვარი:
                <input
                  type="text"
                  name="personSurname"
                  placeholder="გვარი"
                  onChange={this.handlechange}
                  required
                />
              </label>
              <label htmlFor="" className="person-label">
                მამის სახელი:
                <input
                  type="text"
                  name="fatherName"
                  placeholder="მამის სახელი"
                  onChange={this.handlechange}
                  
                />
              </label>
              <label htmlFor="" className="person-label">
                პირადი ნომერი:
                <input
                  
                  placeholder="პირადი ნომერი"
                  type="number"
                  name="IdNumber"
                  onChange={this.handlechange}
                  required
                  pattern=".{11,}"
                  
                />
              </label>
              <label htmlFor="" className="person-label">
                დაბადების თარიღი:
                <input
                  type="date"
                  name="birthdate"
                  placeholder="დაბადების თარიღი"
                  onChange={this.handlechange}
                />
              </label>
            </div>
            <div>
              <button type="submit" onClick={this.handleFormSubmit}>
                დამატება
              </button>
            </div>
          </div>
        </form>
        <div className="person-row">
          <label htmlFor="" className="person-label ">
            პიროვნების მოსაძებნად შეიყვანეთ პ/ნ:
            <input type="number"
             name="searchId" 
             onChange={this.handlechange} />
          </label>
        </div>
        <div className="person-row">
          <button className="" onClick={this.handleSearch}>
            ძებნა
          </button>
        </div>
        <div className="person-row">
          <h2> ნაპოვნი მონაცემები სახელი და გვარი :</h2>
          <h2>{this.state.findUser}</h2>
        </div>

        {
          <table id="#customers">
            <thead>
              <tr>
                <th>სახელი</th>
                <th>გვარი</th>
                <th>მამის სახელი</th>
                <th>პირადი ნომერი</th>
                <th>დაბადების თარიღი</th>
                <th>წაშლა</th>
                <th>რედაქტირება </th>
                <th>დროებით გაუქმება</th>
              </tr>
            </thead>
            <tbody>
              {this.state.values.map((value, index) => {
                return (
                  <tr key={value.name + index}>
                    <td> {value.name} </td>
                    <td> {value.surname}</td>
                    <td> {value.fatherName}</td>
                    <td> {value.IdNumber}</td>
                    <td> {value.birthdate}</td>
                    <td>
                      <button
                        type="button"
                        onClick={this.handleDelete.bind(this, index)}
                      >
                        წაშლა
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={this.handleEdit.bind(this, index, value)}
                      >
                        რედაქტირება
                      </button>
                    </td>
                    <td>
                      <button
                        className=""
                        onClick={this.handleDisable.bind(this)}
                      >
                        დროებით გაუქმება
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }

        <div
          className="newForm "
          style={{ display: this.state.showEditForm ? "block" : "none" }}
        >
          <div className="person-row">
            <label htmlFor="" className="person-label">
              {" "}
              შესაცვლელი სახელი:
              <input
                type="text"
                name="editPersonName"
                onChange={this.handleUpdate}
                value={this.state.editName}
                disabled={this.state.disabled ? "disabled" : ""}
              />
            </label>
            <br></br>
            <label htmlFor="" className="person-label">
              შესაცვლელი გვარი:
              <input
                type="text"
                name="editPersonSurname"
                onChange={this.handleUpdate}
                value={this.state.editSurname}
                disabled={this.state.disabled ? "disabled" : ""}
              />
            </label>
            <label htmlFor="" className="person-label">
              შესაცვლელი მამის სახელი:
              <input
                type="text"
                name="editFatherName"
                value={this.state.editFatherName}
                onChange={this.handleUpdate}
                disabled={this.state.disabled ? "disabled" : ""}
              />
            </label>
            <label htmlFor="" className="person-label">
              შესაცვლელი პირადი ნომერი:
              <input
                min="11"
                pattern=".{11,}"
                minLength="11"
                type="number"
                name="editIdNumber"
                value={this.state.editIdNumber}
                onChange={this.handleUpdate}
                disabled={this.state.disabled ? "disabled" : ""}
              />
            </label>
            <label htmlFor="" className="person-label">
              შესაცვლელი დაბადების თარიღი:
              <input
                type="date"
                name="editBirthDate"
                value={this.state.editBirthDate}
                onChange={this.handleUpdate}
                disabled={this.state.disabled ? "disabled" : ""}
              />
            </label>
          </div>
          <button type="button" onClick={this.updateUser}>
            განახლება
          </button>
        </div>
      </div>
    );
  }
}

export default Person;
