import React from "react";
import ReactDOM from "react-dom";
import "create-react-class";
import UserTable from "./User";

/* tạo mẫu form nhập dữ liệu  
lấy dữ liệu qua props
lưu trữ state và truyền cho Componet UserTable



*/
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      headers: this.props.headers
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let data = new FormData(e.target);
    const user = [];
    for (let [name, value] of data) {
      console.log(name + " " + value);
      user.push(value);
    }
    this.setState({
      users: [...this.state.users, user]
    });
    e.target.reset();
    console.log(e.target);
  };

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit} id="myForm">
        <div>
          <label htmlFor="username">Nhập Tên</label>
          <input id="username" name="username" type="text" required />
        </div>
        <div>
          <label htmlFor="birthdate">Nhập tuổi</label>
          <input
            id="birthdate"
            name="birthdate"
            type="number"
            required
            min="0"
          />
        </div>
        <div>
          {" "}
          <p>
            giới tính: &nbsp;
            <select name="gender">
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </p>
        </div>

        <button type="submit">Thêm</button>
        <button type="reset">Reset</button>
      </form>
    );
  }
  render() {
    return (
      <div>
        {this.renderForm()}
        <UserTable
          headers={this.state.headers}
          initialData={this.state.users}
        />
      </div>
    );
  }
}

var headers = ["Tên", "Tuổi", "Giới tính", "thao tác"];
var data = [["thang", 23, "nam"], ["thang1", 23, "nam"], ["thang2", 23, "nam"]];

ReactDOM.render(
  <div>
    <MyForm data={data} headers={headers} />
  </div>,
  document.getElementById("root")
);
