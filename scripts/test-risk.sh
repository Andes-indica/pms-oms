#!/usr/bin/env bash

set -e

BASE_URL="http://127.0.0.1:3000"

CLIENT_1="demo-client-1"
CLIENT_2="demo-client-2"

PORTFOLIO_1="demo-portfolio-1"
PORTFOLIO_2="demo-portfolio-2"

echo "========================================="
echo " PMS-OMS Risk Engine Test"
echo "========================================="

echo
echo "1. Checking API..."
curl -s "$BASE_URL/health"
echo

echo "Authenticating demo manager..."

LOGIN_JSON=$(curl -s -X POST \
  "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@alphapms.com","password":"demo1234"}')

TOKEN=$(echo "$LOGIN_JSON" \
  | grep -o '"token":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f4)

if [ -z "$TOKEN" ]; then
  echo "ERROR: Authentication failed"
  echo "$LOGIN_JSON"
  exit 1
fi

AUTH_HEADER="Authorization: Bearer $TOKEN"

echo
echo "2. Checking database..."
curl -s "$BASE_URL/health/db"
echo

echo
echo "3. Fetching Client 1..."

CLIENT1_JSON=$(curl -s -H "$AUTH_HEADER" "$BASE_URL/api/clients/$CLIENT_1")

echo "$CLIENT1_JSON"

BROKER_1=$(echo "$CLIENT1_JSON" \
  | grep -o '"brokerAccounts":\[{"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f6)

if [ -z "$BROKER_1" ]; then
  echo "ERROR: Could not determine Client 1 broker account ID"
  exit 1
fi

echo
echo "Client 1 Broker ID: $BROKER_1"

echo
echo "4. Fetching Client 2..."

CLIENT2_JSON=$(curl -s -H "$AUTH_HEADER" "$BASE_URL/api/clients/$CLIENT_2")

BROKER_2=$(echo "$CLIENT2_JSON" \
  | grep -o '"brokerAccounts":\[{"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f6)

if [ -z "$BROKER_2" ]; then
  echo "ERROR: Could not determine Client 2 broker account ID"
  exit 1
fi

echo
echo "Client 2 Broker ID: $BROKER_2"

echo
echo "========================================="
echo " TEST 1: Valid BUY order"
echo "========================================="

VALID_ORDER=$(curl -s -X POST \
  "$BASE_URL/api/orders" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "{
    \"portfolioId\": \"$PORTFOLIO_1\",
    \"brokerAccountId\": \"$BROKER_1\",
    \"symbol\": \"RELIANCE\",
    \"exchange\": \"NSE\",
    \"side\": \"BUY\",
    \"orderType\": \"MARKET\",
    \"quantity\": 10
  }")

echo "$VALID_ORDER"

VALID_ORDER_ID=$(echo "$VALID_ORDER" \
  | grep -o '"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f4)

echo
echo "Order ID: $VALID_ORDER_ID"

echo
echo "Executing valid order..."

curl -s -X POST \
  "$BASE_URL/api/orders/$VALID_ORDER_ID/execute" \
  -H "$AUTH_HEADER"

echo

echo
echo "Expected: SUBMITTED"

echo
echo "========================================="
echo " TEST 2: Max quantity rejection"
echo "========================================="

LARGE_ORDER=$(curl -s -X POST \
  "$BASE_URL/api/orders" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "{
    \"portfolioId\": \"$PORTFOLIO_1\",
    \"brokerAccountId\": \"$BROKER_1\",
    \"symbol\": \"RELIANCE\",
    \"exchange\": \"NSE\",
    \"side\": \"BUY\",
    \"orderType\": \"MARKET\",
    \"quantity\": 150
  }")

echo "$LARGE_ORDER"

LARGE_ORDER_ID=$(echo "$LARGE_ORDER" \
  | grep -o '"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f4)

echo
echo "Executing order exceeding max quantity..."

curl -s -X POST \
  "$BASE_URL/api/orders/$LARGE_ORDER_ID/execute" \
  -H "$AUTH_HEADER"

echo

echo
echo "Expected:"
echo '{"error":"Maximum order quantity exceeded"}'

echo
echo "========================================="
echo " TEST 3: Max order value rejection"
echo "========================================="

VALUE_ORDER=$(curl -s -X POST \
  "$BASE_URL/api/orders" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "{
    \"portfolioId\": \"$PORTFOLIO_1\",
    \"brokerAccountId\": \"$BROKER_1\",
    \"symbol\": \"TCS\",
    \"exchange\": \"NSE\",
    \"side\": \"BUY\",
    \"orderType\": \"LIMIT\",
    \"quantity\": 100,
    \"limitPrice\": 5000
  }")

echo "$VALUE_ORDER"

VALUE_ORDER_ID=$(echo "$VALUE_ORDER" \
  | grep -o '"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f4)

echo
echo "Executing high-value order..."

curl -s -X POST \
  "$BASE_URL/api/orders/$VALUE_ORDER_ID/execute" \
  -H "$AUTH_HEADER"

echo

echo
echo "Expected:"
echo '{"error":"Maximum order value exceeded"}'

echo
echo "========================================="
echo " TEST 4: Insufficient holdings"
echo "========================================="

SELL_ORDER=$(curl -s -X POST \
  "$BASE_URL/api/orders" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "{
    \"portfolioId\": \"$PORTFOLIO_1\",
    \"brokerAccountId\": \"$BROKER_1\",
    \"symbol\": \"RELIANCE\",
    \"exchange\": \"NSE\",
    \"side\": \"SELL\",
    \"orderType\": \"MARKET\",
    \"quantity\": 9999
  }")

echo "$SELL_ORDER"

SELL_ORDER_ID=$(echo "$SELL_ORDER" \
  | grep -o '"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f4)

echo
echo "Executing oversized SELL..."

curl -s -X POST \
  "$BASE_URL/api/orders/$SELL_ORDER_ID/execute" \
  -H "$AUTH_HEADER"

echo

echo
echo "Expected:"
echo '{"error":"Insufficient holdings for sell order"}'

echo
echo "========================================="
echo " TEST 5: Basket partial submission"
echo "========================================="

echo
echo "Creating basket:"
echo "Client 1 → 70"
echo "Client 2 → 70"
echo

BASKET=$(curl -s -X POST \
  "$BASE_URL/api/basket-orders" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Risk Engine Test Basket\",
    \"symbol\": \"RELIANCE\",
    \"exchange\": \"NSE\",
    \"side\": \"BUY\",
    \"orderType\": \"MARKET\",
    \"totalQuantity\": 140,
    \"allocationMethod\": \"FIXED_QUANTITY\",
    \"targets\": [
      {
        \"portfolioId\": \"$PORTFOLIO_1\",
        \"brokerAccountId\": \"$BROKER_1\",
        \"quantity\": 70
      },
      {
        \"portfolioId\": \"$PORTFOLIO_2\",
        \"brokerAccountId\": \"$BROKER_2\",
        \"quantity\": 70
      }
    ]
  }")

echo "$BASKET"

BASKET_ID=$(echo "$BASKET" \
  | grep -o '"id":"[^"]*"' \
  | head -1 \
  | cut -d '"' -f4)

if [ -z "$BASKET_ID" ]; then
  echo "ERROR: Could not determine basket ID"
  exit 1
fi

echo
echo "Basket ID: $BASKET_ID"

echo
echo "Executing basket..."

curl -s -X POST \
  "$BASE_URL/api/basket-orders/$BASKET_ID/execute" \
  -H "$AUTH_HEADER"

echo

echo
echo "Expected:"
echo "Client 1 → success"
echo "Client 2 → risk rejection"
echo "Basket → PARTIALLY_SUBMITTED"

echo
echo "========================================="
echo " TEST 6: Inspect orders"
echo "========================================="

curl -s -H "$AUTH_HEADER" "$BASE_URL/api/orders"

echo

echo
echo "========================================="
echo " TEST 7: Inspect basket orders"
echo "========================================="

curl -s -H "$AUTH_HEADER" "$BASE_URL/api/basket-orders"

echo

echo
echo "========================================="
echo " TEST 8: Audit logs"
echo "========================================="

curl -s -H "$AUTH_HEADER" "$BASE_URL/api/audit-logs"

echo

echo
echo "========================================="
echo " Risk Engine Test Completed"
echo "========================================="
