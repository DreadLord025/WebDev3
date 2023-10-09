import React, { Component } from "react";

class BodyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: "Bloody X5 Pro Max",
          selected: false,
          priceInUAH: 1099,
          description: "",
          descriptionVisible: false,
        },
        {
          id: 2,
          name: "Poco F3",
          selected: false,
          priceInUAH: 7800,
          description: "",
          descriptionVisible: false,
        },
        {
          id: 3,
          name: "Redmi Buds 4 Pro",
          selected: false,
          priceInUAH: 2100,
          description: "",
          descriptionVisible: false,
        },
      ],
      comments: [],
      commentText: "",
      exchangeRate: 0.0274,
      totalUSD: 0,
      productDescription: "",
    };
  }

  handleCheckboxChange = (productId) => {
    this.setState((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === productId
          ? { ...product, selected: !product.selected }
          : product
      ),
    }));
  };

  handleAddComment = () => {
    const { commentText, products } = this.state;
    if (commentText.trim() !== "") {
      const selectedProducts = products.filter((product) => product.selected);

      selectedProducts.forEach((product) => {
        if (!product.comments) {
          product.comments = [];
        }
        product.comments.push(commentText);
      });

      this.setState({
        comments: [...this.state.comments, commentText],
        commentText: "",
        products: [...products],
      });

      if (!selectedProducts) {
        alert("Выберите товар для добавления комментария.");
        return;
      }
      else (alert(`Ваш відгук: "${commentText}" додано успішно!`))
    }
  };

  handleCommentTextChange = (event) => {
    this.setState({ commentText: event.target.value });
  };

  calculateTotalUSD = () => {
    const { products, exchangeRate } = this.state;
    const selectedProducts = products.filter((product) => product.selected);
    const totalUSD = selectedProducts.reduce(
      (accumulator, product) => accumulator + product.priceInUAH * exchangeRate,
      0
    );
    return totalUSD.toFixed(2);
  };

  handleCalculateTotal = () => {
    const totalUSD = this.calculateTotalUSD();
    this.setState({ totalUSD });
  };

  handleProductDescriptionChange = (event) => {
    this.setState({ productDescription: event.target.value });
  };

  handleShowProductDescription = (productId) => {
    const products = [...this.state.products];
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      selectedProduct.descriptionVisible = !selectedProduct.descriptionVisible;
    }

    this.setState({
      products,
    });
  };

  handleAddDescription = () => {
    const { products, productDescription } = this.state;
    const selectedProduct = products.find((product) => product.selected);

    if (!selectedProduct) {
      alert("Виберiть товар для додавання опису!");
      return;
    }

    selectedProduct.description = productDescription;

    this.setState({
      productDescription: "",
    });
  };

  render() {
    const { products, comments, commentText, totalUSD, productDescription } =
      this.state;
    const selectedProductsCount = products.filter(
      (product) => product.selected
    ).length;

    return (
      <div className="ProductList">
        <div className="CountProducts">
          <div className="info">
            <text>{selectedProductsCount} товарів обрано</text>
            {totalUSD > 0 && (
              <text>Загальна сума в доларах: ${totalUSD} USD</text>
            )}
          </div>
        </div>
        {products.map((product) => (
          <li key={product.id}>
            <label className="ProductSale">
              <input
                type="checkbox"
                checked={product.selected}
                onChange={() => this.handleCheckboxChange(product.id)}
              />
              {product.name} - {product.priceInUAH} гривень
              <button
                className="buttonProduct"
                onClick={() => this.handleShowProductDescription(product.id)}
              >
                {product.descriptionVisible
                  ? "Скрыть описание"
                  : "Показать описание"}
              </button>
            </label>
            {product.descriptionVisible && product.description && (
              <div className="ProductDescription">{product.description}</div>
            )}
          </li>
        ))}
        <div className="commentarSend">
          <textarea
            value={commentText}
            onChange={this.handleCommentTextChange}
            placeholder="Ваш коментар..."
          />
          <button onClick={this.handleAddComment}>Додати коментар</button>
          <button onClick={this.handleCalculateTotal}>
            Підрахувати в доларах
          </button>
        </div>
        <div className="commentsReceive">
          <div className="descriptionSend">
            <textarea
              value={productDescription}
              onChange={this.handleProductDescriptionChange}
              placeholder="Детальний опис товару..."
            />
            <button onClick={this.handleAddDescription}>
              Додати опис
            </button>
          </div>
          <h3>Коментарі:</h3>
          {products.map(
            (product) =>
              product.comments &&
              product.comments.length > 0 && (
                <div key={product.id}>
                  <h4>{product.name}:</h4>
                  {product.comments.map((comment, index) => (
                    <div className="commentText" key={index}>
                      {comment}
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

export default BodyComponent;
