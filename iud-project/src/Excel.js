import React from "react";
import createReactClass from "create-react-class";
import "./table.css";

var Excel = createReactClass({
  displayName: "Excel",

  propTypes: {
    headers: React.PropTypes.arrayOf(React.PropTypes.string),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.string)
    )
  },

  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // [row index, cell index],
      search: false
    };
  },

  _sort: function(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var descending = this.state.sortby === column && !this.state.descending;
    data.sort(function(a, b) {
      return descending
        ? a[column] < b[column]
          ? 1
          : -1
        : a[column] > b[column]
        ? 1
        : -1;
    });
    this.setState({
      data: data,
      sortby: column,
      descending: descending
    });
  },

  _showEditor: function(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      }
    });
  },

  _save: function(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data
    });
  },

  _preSearchData: null,

  _toggleSearch: function() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true
      });
    }
  },

  _search: function(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({ data: this._preSearchData });
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function(row) {
      return (
        row[idx]
          .toString()
          .toLowerCase()
          .indexOf(needle) > -1
      );
    });
    this.setState({ data: searchdata });
  },

  _download: function(format, ev) {
    var contents =
      format === "json"
        ? JSON.stringify(this.state.data)
        : this.state.data.reduce(function(result, row) {
            return (
              result +
              row.reduce(function(rowresult, cell, idx) {
                return (
                  rowresult +
                  '"' +
                  cell.replace(/"/g, '""') +
                  '"' +
                  (idx < row.length - 1 ? "," : "")
                );
              }, "") +
              "\n"
            );
          }, "");

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], { type: "text/" + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = "data." + format;
  },

  render: function() {
    return (
      <div>
        {this._renderToolbar()}
        {this._renderTable()}
      </div>
    );
  },

  _renderToolbar: function() {
    return (
      <div className="toolbar">
        <button onClick={this._toggleSearch}>Search</button>
        <a onClick={this._download.bind(this, "json")} href="data.json">
          Export JSON
        </a>
        <a onClick={this._download.bind(this, "csv")} href="data.csv">
          Export CSV
        </a>
      </div>
    );
  },

  _renderSearch: function() {
    if (!this.state.search) {
      return null;
    }
    return (
      <tr onChange={this._search}>
        {this.props.headers.map(function(_ignore, idx) {
          return (
            <td key={idx}>
              <input type="text" data-idx={idx} />
            </td>
          );
        })}
      </tr>
    );
  },

  _renderTable: function() {
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>
            {this.props.headers.map(function(title, idx) {
              if (this.state.sortby === idx) {
                title += this.state.descending ? " \u2191" : " \u2193";
              }
              return <th key={idx}>{title}</th>;
            }, this)}
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor}>
          {this._renderSearch()}
          {this.state.data.map(function(row, rowidx) {
            return (
              <tr key={rowidx}>
                {row.map(function(cell, idx) {
                  var content = cell;
                  var edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    content = (
                      <form onSubmit={this._save}>
                        <input type="text" defaultValue={cell} />
                      </form>
                    );
                  }
                  return (
                    <td key={idx} data-row={rowidx}>
                      {content}
                    </td>
                  );
                }, this)}
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }
});

// var headers = ["Book", "Author", "Language", "Published", "Sales"];

// var data = [
//   [
//     "The Lord of the Rings",
//     "J. R. R. Tolkien",
//     "English",
//     "1954-1955",
//     "150 million"
//   ],
//   [
//     "Le Petit Prince (The Little Prince)",
//     "Antoine de Saint-Exupéry",
//     "French",
//     "1943",
//     "140 million"
//   ],
//   [
//     "Harry Potter and the Philosopher's Stone",
//     "J. K. Rowling",
//     "English",
//     "1997",
//     "107 million"
//   ],
//   [
//     "And Then There Were None",
//     "Agatha Christie",
//     "English",
//     "1939",
//     "100 million"
//   ],
//   [
//     "Dream of the Red Chamber",
//     "Cao Xueqin",
//     "Chinese",
//     "1754-1791",
//     "100 million"
//   ],
//   ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
//   [
//     "She: A History of Adventure",
//     "H. Rider Haggard",
//     "English",
//     "1887",
//     "100 million"
//   ]
// ];

// ReactDOM.render(
//   React.createElement(Excel, {
//     headers: headers,
//     initialData: data
//   }),
//   document.getElementById("root")
// );

export default Excel;
