# Test Cases

## Smoke Suite (`tests/smoke`)

### TC-01: Guest user can successfully checkout with one item
- **Description:** Verifies the critical path of a guest adding an item to the cart, navigating to checkout, and successfully placing an order.
- **Steps:**
  1. Navigate to `/products`.
  2. Click "Add to Cart" on the product "Awesome T-Shirt".
  3. Navigate to the Cart page.
  4. Verify the total amount is visible.
  5. Click "Proceed to Checkout".
  6. Fill in valid shipping details.
  7. Click "Place Order".
- **Expected Result:** Order confirmation message is displayed and a valid order number is generated.

## Sanity Suite (`tests/sanity`)

### TC-02: Cart badge updates accurately when adding products
- **Description:** Validates that the global navbar cart badge reflects the accurate count of products added to the cart.
- **Steps:**
  1. Navigate to `/products`.
  2. Verify the initial cart badge count is `0`.
  3. Add the product "Awesome T-Shirt" to the cart.
- **Expected Result:** The cart badge count updates dynamically to `1` without requiring a page refresh.

## Regression Suite (`tests/regression`)

### TC-03: Valid discount code reduces total correctly
- **Description:** Ensures the discount application logic correctly alters the cart total when a valid promotional code is applied.
- **Steps:**
  1. Navigate to `/products`.
  2. Add the product "Expensive Jacket" to the cart.
  3. Navigate to the Cart page.
  4. Note the initial total amount.
  5. Enter the discount code `SUMMER20` and click "Apply".
- **Expected Result:** The total text changes and the new total is mathematically less than the initial total.
