module.exports = [
  {
    functionName: "Cart and Checkout Validation",
    functionEndpoint: "cartValidation",
    display: true,
    scenarios: [
      {
        scenarioName:
          "Active Member : Customer is authenticated and is an active member",
        scenarioEndpoint: "activeMember",
        display: true,
        samplePayload: {
          cart: {
            buyerIdentity: {
              email: "neilson.flemming@shopify.com",
              isAuthenticated: true,
              customer: {
                id: "gid://shopify/Customer/6791918977097",
                memberIdMetafield: { value: "15789354" },
              },
            },
          },
        },
      },
      {
        scenarioName:
          "Min/Max : Minumum Order Quantity 2 - Maximum Order Quantity 5",
        scenarioEndpoint: "minMax",
        display: true,
        samplePayload: {
          cart: {
            lines: [
              {
                id: "gid://shopify/CartLine/0",
                quantity: 1,
                merchandise: {
                  id: "gid://shopify/ProductVariant/49178510983471",
                  title: "Super Star T Shirt",
                },
              },
              {
                id: "gid://shopify/CartLine/1",
                quantity: 2,
                merchandise: {
                  id: "gid://shopify/ProductVariant/50310723371311",
                  title: "Super Running Shoes",
                },
              },
            ],
          },
        },
      },
    ],
  },
  {
    functionName: "Local Pickup Delivery Option Generator",
    functionEndpoint: "localPickup",
    display: true,
    scenarios: [
      {
        scenarioName:
          "Single Location : Local Pickup will only display 1 option",
        scenarioEndpoint: "singleLoction",
        display: true,
        samplePayload: {
          cart: {
            buyerIdentity: {
              email: "user@example.com",
              isAuthenticated: false,
            },
            cost: {
              totalAmount: {
                amount: "1234.0",
                currencyCode: "CAD",
              },
            },
          },
        },
      },
    ],
  },
  {
    functionName: "Order Discount Function",
    functionEndpoint: "orderDiscount",
    display: true,
    scenarios: [
      {
        scenarioName:
          "VIP Customer : Customer has VIP tag and gets 20% off of all orders",
        scenarioEndpoint: "vipTag",
        display: true,
        samplePayload: {
          cart: {
            buyerIdentity: {
              email: "neilson.flemming@shopify.com",
              isAuthenticated: true,
              customer: {
                hasAnyTag: true,
              },
            },
          },
        },
      },
    ],
  },
];
