import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  hasPermission,
} from "./permissions";

describe("web role permissions", () => {
  test("viewer cannot see mutation controls", () => {
    expect(
      hasPermission(
        "VIEWER",
        "VIEW_ORDERS",
      ),
    ).toBe(true);
    expect(
      hasPermission(
        "VIEWER",
        "CREATE_ORDERS",
      ),
    ).toBe(false);
    expect(
      hasPermission(
        "VIEWER",
        "MANAGE_CLIENTS",
      ),
    ).toBe(false);
  });

  test("operations see operational tools only", () => {
    expect(
      hasPermission(
        "OPERATIONS",
        "OPERATE_ORDERS",
      ),
    ).toBe(true);
    expect(
      hasPermission(
        "OPERATIONS",
        "VIEW_AUDIT",
      ),
    ).toBe(true);
    expect(
      hasPermission(
        "OPERATIONS",
        "EXECUTE_ORDERS",
      ),
    ).toBe(false);
  });

  test("portfolio managers do not receive administration pages", () => {
    expect(
      hasPermission(
        "PORTFOLIO_MANAGER",
        "MANAGE_RISK",
      ),
    ).toBe(true);
    expect(
      hasPermission(
        "PORTFOLIO_MANAGER",
        "VIEW_USERS",
      ),
    ).toBe(false);
    expect(
      hasPermission(
        "PORTFOLIO_MANAGER",
        "VIEW_AUDIT",
      ),
    ).toBe(false);
  });
});
