import React from "react";

class Car extends React.Component {
  state = {
    searchId: "",
    model: "",
    mark: "",
    VIN: "",
    countryNum: "",
    editcarVin: "",
    editColor: "",
    editMark: "",
    editModel: "",
    editidNumber: "",
    color: "",
    IdNumber: "",
    id: "",
    showEditForm: false,
    disabled: false,
    values: [],
    users: []
  };
  handleDisable = index => {
    this.setState({ disabled: !this.state.disabled });
  };
  handleDelete = index => {
    this.state.values.splice(index, 1);
    this.setState({ values: this.state.values });
    localStorage.setItem("carData", JSON.stringify(this.state.values));
  };

  handleEdit = (index, chosenUser) => {
    this.setState({ showEditForm: true });
    const users = this.state.values;
    const user = users[index];
    console.log(user);

    this.setState({
      editMark: user.mark,
      editModel: user.model,
      editcarVin: user.VIN,
      editColor: user.color,
      editidNumber: user.idNumber,
      editcountryNum: user.countryNum,
      editIndex: index
    });
  };
  updateUser = () => {
    const user = this.state.values.find(user => {
      return user.idNumber === this.state.editidNumber;
    });

    if (user === null || user === undefined) {
      alert(
        "ისეთ მომხმარებელზე ვერ გადააფორმებ მანქანას, რომელიც ჩვენს ბაზაში არაა"
      );
      return;
    }

    if (this.state.editIndex !== "") {
      const users = this.state.values;
      const user = users[this.state.editIndex];
      user.model = this.state.editModel;
      user.mark = this.state.editMark;
      user.countryNum = this.state.editcountryNum;
      user.idNumber = this.state.editidNumber;
      user.carVin = this.state.editcarVin;
      user.color = this.state.editColor;
      users[this.state.editIndex] = user;

      this.setState({ values: users, showEditForm: false });
      localStorage.setItem("carData", JSON.stringify(users));
    }
  };
  componentDidMount() {
    let cars = JSON.parse(localStorage.getItem("carData"));
    let lastInsertId = JSON.parse(localStorage.getItem("idCar"));
    let users = JSON.parse(localStorage.getItem("data"));
    if (lastInsertId == null) {
      lastInsertId = 0;
    }

    if (users == null) users = [];
    if (cars === null) cars = [];

    this.setState({
      values: cars,
      users: users,
      model: "",
      mark: "",
      id: parseInt(lastInsertId)
    });
  }
  handleSearch = () => {
    const car = this.state.values.find(car => {
      return car.VIN === this.state.searchId;
    });

    if (car === undefined) {
      alert("მოცემული VIN კოდით მანქანა ვერ მოიძებნა");
      return;
    }
    const userIdNum = car.idNumber;
    let carName = "მოცემული მანქანის მფლობელი ვერ მოიძებნა";

    const user = this.state.users.find(user => {
      return (user.IdNumber = userIdNum);
    });

    if (user !== null) {
      carName =
        car.model + " " + car.mark + " " + user.name + " " + user.surname;
    }

    this.setState({ findUser: carName });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.mark === "") {
      alert("შეავსეთ სრული ინფორმაცია");
    } else {
      const user = this.state.values.find(user => {
        return user.IdNumber === this.state.searchId;
      });
  
      console.log(user);
      // if (user === null || user === undefined) {
      //   alert("არ არსებულ პიროვნებაზე ავტომობილს ვერ დაარეგისტრირებთ");
      //   return;
      // }
  
      const lastInsertId = this.state.id + 1;
      const newData = {
        model: this.state.model,
        mark: this.state.mark,
        VIN: this.state.VIN,
        countryNum: this.state.countryNum,
        color: this.state.color,
        idNumber: this.state.idNumber,
        id: lastInsertId
      };

  
      const data = this.state.values;
      data.push(newData);
      this.setState({ values: data, id: lastInsertId });
      localStorage.setItem("carData", JSON.stringify(data));
      localStorage.setItem("idCar", lastInsertId);
    }
    
  };

  handleUpdate = event => {
    const input = event.target;
    const inputName = input.name;
    const value = input.value;

    if (inputName === "editMark") {
      this.setState({ editMark: value });
    }

    if (inputName === "editModel") {
      this.setState({ editModel: value });
    }
    if (inputName === "editidNumber") {
      this.setState({ editidNumber: value });
    }

    if (inputName === "editcarVin") {
      this.setState({ editcarVin: value });
    }
    if (inputName === "editcountryNum") {
      this.setState({ editcountryNum: value });
    }

    if (inputName === "editcolor") {
      this.setState({ editcarVin: value });
    }
  };
  handlechange = event => {
    const input = event.target;
    const value = input.value;
    const inputName = input.name;
    if (inputName === "mark") {
      this.setState({ mark: value });
    }
    if (inputName === "model") {
      this.setState({ model: value });
    }
    if (inputName === "idNumber") {
      this.setState({ idNumber: value });
    }
    if (inputName === "VIN") {
      this.setState({ VIN: value });
    }
    if (inputName === "countryNum") {
      this.setState({ countryNum: value });
    }
    if (inputName === "color") {
      this.setState({ color: value });
    }
    if (inputName === "searchId") {
      this.setState({ searchId: value });
    }
  };

  render() {
    return (
      <div className="person-center ">
        <form>
          <div className="person-row ">
            <div className="person-row">
              <label htmlFor="" className="person-label">
                მანქანის მარკა:
                <input
                  type="text"
                  maxlength="17"
                  name="mark"
                  placeholder="მარკა"
                  onChange={this.handlechange}
                  required
                />
              </label>
              <label htmlFor="" className="person-label">
                მანქანის მოდელი:
                <input
                  type="text"
                  name="model"
                  placeholder="მოდელი"
                  onChange={this.handlechange}
                  required
                />
              </label>
              <label htmlFor="" className="person-label">
                მანქანის ვინკოდი:
                <input
                  type="text"
                  name="VIN"
                  placeholder="მანქანის ვინ კოდი"
                  onChange={this.handlechange}
                  maxLength="17"
                  required
                  
                />
              </label>
              <label htmlFor="" className="person-label">
                სახელმწიფო ნომერი:
                <input
                  type="text"
                  name="countryNum"
                  placeholder="სახელმწიფო ნომერი"
                  onChange={this.handlechange}
                  required
                  maxLength="10"
                />
              </label>
              <label htmlFor="" className="person-label">
                მანქანის ფერი
                <input
                  type="text"
                  name="color"
                  placeholder="ფერი"
                  onChange={this.handlechange}
                  required
                />
              </label>
              <label htmlFor="" className="person-label">
                პირადი ნომერი:
                <input
                  type="number"
                  name="idNumber"
                  min="11"
                  max="11" 
                  placeholder="პირადი ნომერი"
                  onChange={this.handlechange}
                  required
                />
              </label>
            </div>
            <div>
              <button type="" onClick={this.handleFormSubmit}>
                დამატება
              </button>
            </div>
          </div>
        </form>
        <div className="person-center">
          <label htmlFor="" className="person-label">
            მოსაძებნად შეიყვანეთ ვინკოდი :
            <input type="text" name="searchId" onChange={this.handlechange} />
          </label>
        </div>
        <div className="person-row">
          <button className="" onClick={this.handleSearch}>
            ძებნა
          </button>
        </div>
        <div className="flex-row">
          <div className="person-row">
            <h2> ნაპოვნი მონაცემები სახელი და გვარი :</h2>
            <h2>{this.state.findUser}</h2>
          </div>
        </div>
        {
          <table id="#customers">
            <thead>
              <tr>
                <th>მარკა</th>
                <th>მოდელი</th>
                <th>მანქანის ვინკოდი</th>
                <th>სახელმწიფო ნომერი</th>
                <th>ფერი</th>
                <th>პ/ნომერი</th>
                <th>წაშლა</th>
                <th>რედაქტირება</th>
                <th>დროებით გაუქმება</th>
              </tr>
            </thead>
            <tbody>
              {this.state.values.map((value, index) => {
                return (
                  <tr key={value.mark + index}>
                    <td> {value.mark} </td>
                    <td> {value.model}</td>
                    <td> {value.VIN}</td>
                    <td> {value.countryNum}</td>
                    <td> {value.color}</td>
                    <td> {value.idNumber}</td>
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
                      {
                        <button
                          className=""
                          onClick={this.handleDisable.bind(this)}
                        >
                          დროებით გაუქმება
                        </button>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
        {
          <div
            className="newForm "
            style={{ display: this.state.showEditForm ? "block" : "none" }}
          >
            <div className="person-row">
              <label htmlFor="" className="person-label">
                {" "}
                შესაცვლელი მარკა:
                <input
                  type="text"
                  name="editMark"
                  onChange={this.handleUpdate}
                  value={this.state.editMark}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
              </label>
              <br></br>
              <label htmlFor="" className="person-label">
                შესაცვლელი მოდელი:
                <input
                  type="text"
                  name="editModel"
                  onChange={this.handleUpdate}
                  value={this.state.editModel}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
              </label>
              <label htmlFor="" className="person-label">
                შესაცვლელი VIN კოდი:
                <input
                  type="text"
                  name="editcarVin"
                  value={this.state.editcarVin}
                  placeholder="VIN კოდი"
                  onChange={this.handleUpdate}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
              </label>
              <label htmlFor="" className="person-label">
                შესაცვლელი პირადი ნომერი:
                <input
                  min="11"
                  pattern=".{11},}"
                  minLength="11"
                  type="number"
                  name="editidNumber"
                  value={this.state.editidNumber}
                  onChange={this.handleUpdate}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
              </label>
              <label htmlFor="" className="person-label">
                შესაცვლელი ფერი:
                <input
                  type="text"
                  name="editColor"
                  value={this.state.editColor}
                  onChange={this.handleUpdate}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
              </label>
            </div>
            <button type="button" onClick={this.updateUser}>
              განახლება
            </button>
          </div>
        }
      </div>
    );
  }
}

export default Car;
