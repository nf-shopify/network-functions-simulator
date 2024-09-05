/*----- Exports ------*/
module.exports = {
  status,
  minMaxValidate,
  activeMemberValidate,
};

/*----- Global Variables ------*/
const MIN_ORDER_QUANTITY = 2;
const MAX_ORDER_QUANTITY = 5;

function status() {
  return { endpointStatus: "Online" };
}

function minMaxValidate(input) {
  if (!input?.cart || !input?.cart?.lines[0]?.quantity) {
    return { error: "Missing required object or field in JSON body" };
  }
  const { lines } = input?.cart;
  console.log("********** Min Max Validate - Cart Lines ********** ");
  console.log(lines);
  const errors = lines.reduce((error, line) => {
    if (line?.quantity < MIN_ORDER_QUANTITY) {
      error.push({
        localizedMessage: `Sorry, the minimum order quantity for ${line?.merchandise?.title} is ${MIN_ORDER_QUANTITY}`,
        target: "cart",
      });
    } else if (line?.quantity > MAX_ORDER_QUANTITY) {
      error.push({
        localizedMessage: `Sorry, the maximum order quantity for ${line?.merchandise?.title} is ${MAX_ORDER_QUANTITY}`,
        target: "cart",
      });
    }
    return error;
  }, []);

  return { errors: errors };
}

function activeMemberValidate(input) {
  if (
    !input?.cart ||
    !input?.cart?.buyerIdentity?.customer?.memberIdMetafield
  ) {
    return {
      error: "Missing required object or field in JSON body",
    };
  }
  const { buyerIdentity } = input?.cart;
  const errors = [];
  const randomBoolean = Math.random() < 0.5;
  if (!buyerIdentity?.isAuthenticated) {
    errors.push({
      localizedMessage:
        "You must be authenticated to add items to cart or checkout",
      target: "cart",
    });
    return { errors: errors };
  }
  if (!buyerIdentity?.customer?.memberIdMetafield?.value) {
    console.log(buyerIdentity?.customer?.memberIdMetafield?.value);
    errors.push({
      localizedMessage: "You must be a member to add items to cart",
      target: "cart",
    });
    return { errors: errors };
  }
  if (buyerIdentity?.customer?.memberIdMetafield?.value && !randomBoolean) {
    errors.push({
      localizedMessage:
        "Your membership has expired. You will need to renew your membership to checkout",
      target: "cart",
    });
    return { errors: errors };
  }

  return { errors: errors };
}
