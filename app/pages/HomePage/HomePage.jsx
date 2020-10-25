/**
 * Created by Andrzej on 02.02.2018.
 */
import React from "react";
import { MainNavbar, NavbarSideMenuPage } from "components";
import HomePageSideMenu from "./HomePageSideMenu";
import { menuItems, userInfo, quickSwitchUsers, searchResults } from "config/mockData";
import { exampleFilters as filters, exampleSortings as sorting } from "config/sidemenuMockData";

class HomePage extends React.Component {
  state = { selected: "subcategory1" };

  selectList = list => this.setState({ list });

  handleSearch = value => {
    return new Promise((resolve, reject) => {
      resolve(
        searchResults.filter(item =>
          item.text
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        )
      );
    });
  };

  handleSearchResult = url => {};

  navbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      placeholder="search"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  render = () => {
    const { selected } = this.state;

    return (
      <NavbarSideMenuPage
        navbar={this.navbar}
        location={this.props.location.pathname}
        sidemenuContent={
          <HomePageSideMenu
            filters={filters}
            handleFilters={_ => this.setState({})}
            isFiltersOpen={false}
            sorting={sorting}
            handleSorting={_ => this.setState({})}
            isSortingOpen={false}
            selectTab={{
              subcategory1: () => this.setState({ selected: "subcategory1" }), // dummy
              subcategory2: () => this.setState({ selected: "subcategory2" }) // dummy
            }}
            selectedTab={selected}
          />
        }
      >
        <div width="100%">
          <p align="center">
            <br />
            <br />
            Any of the main content
          </p>
        </div>
      </NavbarSideMenuPage>
    );
  };
}

export default HomePage;
