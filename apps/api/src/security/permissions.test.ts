import {
  describe,
  expect,
  test,
} from "bun:test";

import {
  hasPermission,
} from "./permissions";

describe("role permissions", () => {
  test("viewer remains read-only", () => {
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
        "OPERATE_ORDERS",
      ),
    ).toBe(false);
  });

  test("operations can reconcile but cannot originate trades", () => {
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
        "CREATE_ORDERS",
      ),
    ).toBe(false);
  });

  test("portfolio managers trade but cannot administer users", () => {
    expect(
      hasPermission(
        "PORTFOLIO_MANAGER",
        "EXECUTE_ORDERS",
      ),
    ).toBe(true);

    expect(
      hasPermission(
        "PORTFOLIO_MANAGER",
        "MANAGE_USERS",
      ),
    ).toBe(false);
  });

  test("admins have every sensitive permission", () => {
    expect(
      hasPermission(
        "ADMIN",
        "MANAGE_USERS",
      ),
    ).toBe(true);

    expect(
      hasPermission(
        "ADMIN",
        "MANAGE_BROKERS",
      ),
    ).toBe(true);
  });
});
