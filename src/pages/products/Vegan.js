import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "../../components/product-card/Product-card";
import { Affix, Drawer, Tag } from "antd";
import { NodeExpandOutlined } from "@ant-design/icons";
import "./vegan.scss";
import "./filters.scss";
// import { Slider } from 'antd';

const { CheckableTag } = Tag;

const productTags = [
  "blush",
  "bronzer",
  "eyeliner",
  "eyeshadow",
  "foundation",
  "lip_liner",
  "lipstick",
  "mascara",
  "nail_polish",
];

const brandTags = [
  "mineral fusion",
  "pure anada",
  "rejuva minerals",
  "marienatie",
  "sante",
  "pacifica",
  "zorah",
  "moov",
  "colourpop",
  "penny lane organics",
  "milani",
  "e.l.f.",
  "dr. hauschka",
  "suncoat",
  "misa",
  "butter london",
];

const Products = ({ data, title, wishList, setWishList, userId }) => {
  const [originalData, setOriginalData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [top, setTop] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setOriginalData([...data]);
  }, [data]);

  const formatProductText = (tag) => {
    let wordsArr = tag.split("_");
    for (let i = 0; i < wordsArr.length; i++) {
      wordsArr[i] =
        wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].substring(1);
    }
    return wordsArr.join(" ");
  };
  const formatBrandText = (tag) => {
    let wordsArr = tag.split(" ");
    for (let i = 0; i < wordsArr.length; i++) {
      wordsArr[i] =
        wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].substring(1);
    }
    return wordsArr.join(" ");
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleChange = (tag, checked) => {
    setVisible(false);
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    window.scrollTo(0, 200);
    setSelectedTags([...nextSelectedTags]);
  };

  const filtered = (data) => {
    if (selectedTags.length === 0) return data;
    if (selectedTags.length === 1) {
      let tempArr = [];
      for (let i = 0; i < selectedTags.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (
            data[j].product_type === selectedTags[i] ||
            (data[j].brand === selectedTags[i] && !tempArr.includes(data[j]))
          ) {
            tempArr.push(data[j]);
          }
        }
      }
      return tempArr;
    }
    if (selectedTags.length > 1) {
      let tempArr = [];
      for (let i = 0; i < selectedTags.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (
            data[j].product_type === selectedTags[i] ||
            (data[j].brand === selectedTags[i] && !tempArr.includes(data[j]))
          ) {
            tempArr.push(data[j]);
          }
        }
      }
      let filteredArr = tempArr.filter((item) => {
        return (
          selectedTags.includes(item.product_type) &&
          selectedTags.includes(item.brand)
        );
      });
      return filteredArr;
    }
  };

  function clearFilters() {
    setSelectedTags([]);
  }

  return (
    <div className="vegan-page-container">
      <img
        src={require("../../images/vegan4.jpg")}
        alt="makeup-lipstick-colors"
        className="veganpage-image"
      />

      <div className="vegan-title wow zoomIn">
        <h1>{title}</h1>
      </div>

      <Affix offsetTop={top}>
        <div
          className="fixedHeaderButton wow zoomIn"
          onClick={() => setTop(top)}
        >
          <div className="allproducts-clear-button">
            <span
              onClick={clearFilters}
              style={{ fontSize: 18, cursor: "pointer" }}
            >
              All products
            </span>
          </div>
          <div className="filter-product-types-link">
            <span
              onClick={showDrawer}
              style={{ fontSize: 18, cursor: "pointer" }}
            >
              Filter <NodeExpandOutlined />
            </span>
          </div>

          <Drawer
            title="Filter"
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            {/* <ProductTypeTags /> */}

            <div
              className="drawer-product-type-title"
              style={{ marginRight: 8 }}
            >
              <p>Product types:</p>
            </div>

            {/* PRODUCT_TYPE */}

            <div className="drawer-product-type-tags">
              {productTags.map((tag) => (
                <CheckableTag
                  className="producttype-tags"
                  key={tag}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={(checked) => handleChange(tag, checked)}
                  onClick={onClose}
                >
                  {formatProductText(tag)}
                </CheckableTag>
              ))}
            </div>

            <br />

            <div
              className="drawer-product-type-title"
              style={{ marginRight: 8 }}
            >
              <p>Brands:</p>
            </div>
            {/* BRANDS */}
            <div className="drawer-product-type-tags">
              {brandTags.map((tag) => (
                <CheckableTag
                  className="producttype-tags"
                  key={tag}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={(checked) => handleChange(tag, checked)}
                >
                  {formatBrandText(tag)}
                </CheckableTag>
              ))}
            </div>
            {/* <p className="products-drawer-price-filter">Price filter</p>
              <Slider range defaultValue={[0, 50]} tipFormatter={formatter} /> */}
          </Drawer>
        </div>
      </Affix>

      {/* </div> */}

      <div className="products-categories-container">
        {filtered(originalData).length > 0 ? (
          <>
            {filtered(originalData).map((item) => (
              <ProductCard
                // className="product-card-container"
                key={item.id}
                image={item.image_link}
                name={item.name}
                price={item.price}
                id={item.id}
                wishList={wishList.includes(item.id)}
                userId={userId}
                setWishList={setWishList}
              />
            ))}
          </>
        ) : (
          <div>No Products match Criteria</div>
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  data: PropTypes.array,
  wishList: PropTypes.array,
  title: PropTypes.string,
  userId: PropTypes.string,
  setWishList: PropTypes.func,
};

export default Products;
