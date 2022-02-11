/**
 * Fiche produit
 * v 0.2.0
 * 2021-2022
 *
 */
// REACT
import * as React from "react";
import { CgChevronRight as ChevronIcon } from "react-icons/cg";
import { useState, useContext, useCallback, useEffect } from "react";
// MISC
import isEqual from "lodash.isequal";
import sanitizeHtml from 'sanitize-html';
// GATSBY
import { GatsbyImage, getSrc } from "gatsby-plugin-image";
import { graphql, Link } from "gatsby";
// GATSBY SHOPIFY STARTER
import { Layout } from "../../../components/layout/layout";
import { ContextStore } from "../../../context/context_store";
import { AddToCart } from "../../../components/cart/add_to_cart";
import { NumericInput } from "../../../components/numeric_input";

import { Seo } from "../../../components/seo";
// CAFE 366
import content from "../../../../media/json/content.json";
// APP
import { formatPrice } from "../../../utils/format_price";
import { content_by_lang } from "../../../utils/misc";

import {
  prod_box,
  container,
  header,
  prod_img_wrapper,
  productImageList,
  productImageListItem,
  scrollForMore,
  noImagePreview,
  optionsWrapper,
  priceValue,
  selectVariant,
  labelFont,
  collection_link,
  tagList,
  addToCartStyle,
  metaSection,
  prod_description,
} from "./product_page.module.css";

// https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
// https://stackoverflow.com/questions/59467152/how-to-render-html-code-in-strings-of-a-gatsby-config-file
function Description({className, content_html}) {
  const content_clean = sanitizeHtml(content_html, {
    allowedTags: ['br'],
  })
  return(<div className={className} dangerouslySetInnerHTML={{__html: content_clean}}/>)
}

// The Search part don't work must be work on it for the future
function MetaSection({product}) {
  return(
    <div className={metaSection}>
      <span className={labelFont}>Type</span>
      <span className={tagList}>
        <Link to={product.productTypeSlug}>{product.productType}</Link>
      </span>
      <span className={labelFont}>Tags</span>
        <span className={tagList}>
        {product.tags.map((tag) => (
          <Link to={`/search/search?=${tag}`}>{tag}</Link>
        ))}
      </span>
    </div>
  ) 
}

export default function Product({ data: { product, suggestions } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    descriptionHtml,
    images,
    images: [firstImage],
  } = product;
  const { client } = useContext(ContextStore);

  const [variant, setVariant] = useState({ ...initialVariant });
  const [quantity, setQuantity] = useState(1);

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = useState(productVariant.availableForSale);

  const checkAvailablity = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product]
  );

  const handleOptionChange = (index, event) => {
    const value = event.target.value;

    if (value === "") {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions);
    });

    setVariant({ ...selectedVariant });
  };

  useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  );

  const hasVariants = variants.length > 1;
  const hasImages = images.length > 0;
  const hasMultipleImages = true || images.length > 1;

  const [select, set_select] = useState(
    content_by_lang(content.info, "select", "")
  );

  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={sanitizeHtml(descriptionHtml)}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className={container}>
        <div className={prod_box}>
          {hasImages && (
            <div className={prod_img_wrapper}>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul className={productImageList}>
                  {images.map((image, index) => (
                    <li
                      key={`product-image-${image.id}`}
                      className={productImageListItem}
                    >
                      <GatsbyImage
                        objectFit="contain"
                        loading={index === 0 ? "eager" : "lazy"}
                        alt={
                          image.altText
                            ? image.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                        image={image.gatsbyImageData}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {hasMultipleImages && (
                <div className={scrollForMore} id="instructions">
                  <span aria-hidden="true">←</span> scroll for more{" "}
                  <span aria-hidden="true">→</span>
                </div>
              )}
            </div>
          )}
          {!hasImages && (
            <span className={noImagePreview}>No Preview image</span>
          )}
          <div>
            <div className={collection_link}>
              <ChevronIcon size={20} />
              <Link to={product.productTypeSlug}>{product.productType}</Link>
              
            </div>
            <h1 className={header}>{title}</h1>
            <Description className={prod_description} content_html={descriptionHtml}></Description>
            <h2 className={priceValue}>
              <span>{price}</span>
            </h2>
            <fieldset className={optionsWrapper}>
              {hasVariants &&
                options.map(({ id, name, values }, index) => (
                  <div className={selectVariant} key={id}>
                    <select
                      aria-label="Variants"
                      onChange={(event) => handleOptionChange(index, event)}
                    >
                      <option value="">{`${select} ${name}`}</option>
                      {/* <option value="">{`Select ${name}`}</option> */}
                      {values.map((value) => (
                        <option value={value} key={`${name}-${value}`}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </fieldset>
            <div className={addToCartStyle}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                value={quantity}
                min="1"
                max="20"
              />
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
            {/* <MetaSection product={product}/> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      descriptionHtml
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/product/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
