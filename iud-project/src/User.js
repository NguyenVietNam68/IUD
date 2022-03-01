import React from "react";
import "./table.css";
import PropTypes from "prop-types";

/* 
  nhận dữ liệu qua props từ cha Component Form 
  lưu trữ state dùng xoá, sửa dữ liệu
*/
export class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.initialData,
      edit: this.props.edit
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialData !== this.props.initialData) {
      this.setState({ data: this.props.initialData });
    }
  }
  showEditor = e => {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      }
    });
  };

  save = e => {
    e.preventDefault();
    var input = e.target.firstChild;
    console.log(input);
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data
    });
  };

  delete = e => {
    e.preventDefault();
    let id = e.target.dataset.row;
    var data = this.state.data.slice();
    data.splice(id, 1);
    this.setState({
      edit: null,
      data: data
    });
  };

  renderTable = () => {
    // console.log(this.state.data);
    return (
      <table>
        <thead>
          <tr>
            {this.props.headers.map(function(title, idx) {
              return <th key={idx}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={this.showEditor}>
          {this.state.data.map((row, rowidx) => {
            // console.log(row);
            return (
              <tr key={rowidx}>
                {row.map((cell, idx) => {
                  var content = cell;
                  var edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    if (edit.cell === 1) {
                      content = (
                        <form onSubmit={this.save}>
                          <input
                            type="number"
                            required
                            min="0"
                            max="100"
                            defaultValue={cell}
                          />
                        </form>
                      );
                    } else if (edit.cell === 2) {
                      content = (
                        <form onSubmit={this.save}>
                          {/* <input type="text" defaultValue={cell} /> */}
                          <select type="text" defaultValue={cell}>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
                          <button type="submit">save</button>
                        </form>
                      );
                    } else {
                      content = (
                        <form onSubmit={this.save}>
                          <input type="text" defaultValue={cell} required />
                        </form>
                      );
                    }
                  }
                  return (
                    <td key={idx} data-row={rowidx}>
                      {content}
                    </td>
                  );
                })}

                <td>
                  <button onClick={this.delete} data-row={rowidx}>
                    xoá
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

UserTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  initialData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      .isRequired
  ).isRequired
};

export default UserTable;
