import * as React from "react";
import fetch from "isomorphic-fetch";
import Client from "shopify-buy";
/**
 *
 * I pass GATSBY_STOREFRONT_ACCES_TOKEN in hard-code because for an unknow reason
 * GATSBY_STOREFRONT_ACCES_TOKEN, SHOPIFY_API_KEY, SHOPIFY_API_KEY became undefined unlike GATSBY_SHOPIFY_STORE_URL
 * I can do that because Shopify explain we can
 * Dixit Shopify :
 * Storefront API access tokens are not confidential.
 * You can place them in a JavaScript file or a public HTML document.
 */

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: "0ea422edee06c9d88e0857e3dc38d96c",
    // storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCES_TOKEN,
  },
  fetch
);

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    lineItems: [],
  },
};

export const StoreContext = React.createContext(defaultValues);

const isBrowser = typeof window !== `undefined`;
const localStorageKey = `shopify_checkout_id`;

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = React.useState(defaultValues.checkout);
  const [loading, setLoading] = React.useState(false);
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false);

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id);
    }

    setCheckout(checkout);
  };

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          );
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null);
        }
      }

      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };

    initializeCheckout();
  }, []);

  const addVariantToCart = (variantId, quantity) => {
    setLoading(true);

    const checkoutID = checkout.id;

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
        setDidJustAddToCart(true);
        setTimeout(() => setDidJustAddToCart(false), 3000);
      });
  };

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true);

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true);

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ];

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res);
        setLoading(false);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
