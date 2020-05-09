import React from "react";
import API from "../utils/API";


class Container extends React.Component {
    state = {
      users: [],
      search: "",
      sortDirection: "",
      col: ""
    };
  
    componentDidMount() {
      API.usersList()
        .then(res => {
          const userArray = res.data.results.map(user => {
            return {
              first: user.name.first,
              last: user.name.last,
              email: user.email,
              dob: user.dob.date,
              image: user.picture.medium
            };
          });
          this.setState({ users: userArray });
        })
        .catch(err => console.log(err));
    }
  
    renderUsers = () => {
        return this.filterUsers()
          .sort(this.sortUsers)
          .map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={user.image} alt="user"></img>
                </td>
                <td>{user.first}</td>
                <td>{user.last}</td>
                <td>{user.email}</td>
                <td>{new Date(user.dob).toDateString()}</td>
              </tr>
            );
          });
      };

    handleInputChange = e => {
      this.setState({ search: e.target.value });
    };

    headerClass = col => {
        return this.state.col === col
          ? `clickable ${this.state.sortDirection}`
          : `clickable`;
      };

    filterUsers() {
      const search = this.state.search.toLowerCase();
      return this.state.users.filter(user => {
        return (
          user.first.toLowerCase().includes(search) ||
          user.last.toLowerCase().includes(search)
        );
      });
    }
    
    sortUsers = (a, b) => {
        if (a[this.state.col] < b[this.state.col]) {
          return this.state.sortDirection === "ascending" ? -1 : 1;
        } else if (a[this.state.col] > b[this.state.col]) {
          return this.state.sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      };
  
    handleOrderChange = col => {
      this.state.col === col && this.state.sortDirection === "ascending"
        ? this.setState({ sortDirection: "descending", col: col })
        : this.setState({ sortDirection: "ascending", col: col });
    };
  
    render() {
      return (
        <>
          <div className="input-group justify-content-center">
            <div className="input-group-prepend"></div>
            <input
              onChange={this.handleInputChange}
              name='search'
              type='search'
              className='form-control'
              placeholder='Search'
            />
          </div>
          <div className="table m-3">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">
                    <span
                      className={this.headerClass("first")}
                      onClick={() => {
                        this.handleOrderChange("first");
                      }}
                    >
                      First
                    </span>
                  </th>
                  <th scope="col">
                    <span
                      className={this.headerClass("last")}
                      onClick={() => this.handleOrderChange("last")}
                    >
                      Last
                    </span>
                  </th>
                  <th scope="col">
                    <span
                      className={this.headerClass("email")}
                      onClick={() => this.handleOrderChange("email")}
                    >
                      Email
                    </span>
                  </th>
                  <th scope="col">
                    <span
                      className={this.headerClass("dob")}
                      onClick={() => this.handleOrderChange("dob")}
                    >
                      DOB
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderUsers()}</tbody>
            </table>
          </div>
        </>
      );
    }
  }
  
  export default Container;