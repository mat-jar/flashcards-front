import React, { Component } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";
import update from "immutability-helper";

class ArticlesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  loadArticles() {
    axios
      .get("/api/v1/articles")
      .then((res) => {
        this.setState({ articles: res.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadArticles();
  }

  handleChange = (e) => {
  this.setState({inputValue: e.target.value});
  }

  modifyArticle = (e, id) => {
  axios
    .put(`/api/v1/articles/${id}`, { article: { read: e.target.checked } })
    .then((res) => {
      const articleIndex = this.state.articles.findIndex(
        (x) => x.id === res.data.id
      );
      const articles = update(this.state.articles, {
        [articleIndex]: { $set: res.data },
      });
      this.setState({
        articles: articles,
      });
    })
    .catch((error) => console.log(error));
};
removeArticle = (id) => {
axios
  .delete(`/api/v1/articles/${id}`)
  .then((res) => {
    const articleIndex = this.state.articles.findIndex((x) => x.id === id);
    const articles = update(this.state.articles, {
      $splice: [[articleIndex, 1]],
    });
    this.setState({
      articles: articles,
    });
  })
  .catch((error) => console.log(error));
};

  newArticle= (e) => {
  if (e.key === "Enter" && !(e.target.value === "")) {
    axios
      .post("/api/v1/articles", { article: { title: e.target.value } })
      .then((res) => {
        const articles = update(this.state.articles, {
          $splice: [[0, 0, res.data]],
        });

        this.setState({
          articles: articles,
          inputValue: "",
        });
      })
      .catch((error) => console.log(error));
  }
};

  render() {
    return (
      <div>
        <div className="articleContainer">
          <input
            className="newArticle"
            type="string"
            placeholder="Input a Article and Press Enter"
            maxLength="75"
            onKeyPress={this.newArticle}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.articles.map((article) => {
              return (
                <li className="item" article={article} key={article.id}>
                <input className="itemCheckbox" type="checkbox"
                checked={article.read}
                onChange={(e) => this.modifyArticle(e, article.id)} />
                  <Link to={`/articles/${article.id}`}>
                  <label className="itemDisplay">{article.title}</label>
                  </Link>
                  <span className="removeItemButton"
                  onClick={(e) =>
                  {if (window.confirm("Delete the article")) {
                  this.removeArticle(article.id);
                  }
                  }
                  }
                  >
                  x
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ArticlesContainer;
