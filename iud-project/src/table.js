import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    if (value.trim().length === 0) {
      return;
    }
    const name = target.name;
    console.log("name: ", name, " value: ", value);
    this.setState({
      user: [
        ...this.state.user,
        {
          id: this.state.id + 1,
          [name]: value
        }
      ]
    });
  };
  handleAdd = e => {};

  handleEdit = id => {};

  handleDelete = id => {};
  render() {
    return (
      <div>
        <form>
          <div>
            {" "}
            <p>tên</p>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            {" "}
            <p>tuổi</p>
            <input
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            {" "}
            <p>
              giới tính: &nbsp;
              <select
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </p>
          </div>
          <div>
            <button onClick={this.handleAdd}> thêm mới</button>
          </div>
        </form>

        <div>
          <table>
            <thead>
              <tr>
                <th hidden>{this.state.id}</th>
                <th>tên</th>
                <th>tuổi</th>
                <th>giới tính</th>
                <th>thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.age}</td>
                <td>{this.state.gender}</td>
                <td>
                  <button onClick={this.handleEdit(this.state.id)}>sửa</button>
                  <button onClick={this.handleDelete(this.state.id)}>
                    xoá
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
