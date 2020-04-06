import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SearchPanel.scss";

function SearchPanel(props) {
  const [searchQuery, setsearchQuery] = useState("");

  const getSearchQuery = e => {
    e.preventDefault();
    props.fetchRecipeFromAPI(searchQuery);
  };

  const handleChange = event => {
    event.preventDefault();
    setsearchQuery(event.target.value);
  };
  return (
    <div className="c-searchPanel">
      <Container fluid>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="c-pageTitle">
              You will love recipe of our
              <span>Delicious menu</span>
              </h1>
            <form onSubmit={getSearchQuery}>
                  <div className="searchPanel">
                    <input
                      type="text"
                      className="txtBox"
                      name="companyName"
                      placeholder="Looking For..."
                      onChange={e => handleChange(e)}
                    />
                    <button type="submit" className="submitBtn">
                    Search
                  </button>
                  </div>

            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default SearchPanel;
