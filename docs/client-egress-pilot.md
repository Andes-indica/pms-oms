# Client-specific egress pilot (DRY RUN ONLY)

This is an isolated proof-of-concept for mapping a broker account to a
dedicated outbound execution worker/IP. It **does not** connect to Kite,
submit orders, deploy workers, change the live order queue or enable trading.

Run the unit tests (Node 22+):

```sh
node --test apps/api/src/services/client-egress-pilot.test.mjs
```

The existing `ExecutionJob` queue and `order-execution-worker.service.ts`
must remain authoritative. **Never generate a duplicate broker order to change
its apparent source IP**. If direct multi-client execution becomes authorized,
the central worker should dispatch the *original* order intent to a verified,
account-specific execution service with a trusted network egress probe,
broker-account binding, durable acknowledgement and unknown-outcome
reconciliation before retries.

A matching IP only demonstrates network routing; it does not prove an IP
is whitelisted or the arrangement is broker-approved. Do not turn on
direct third-party execution until Zerodha has explicitly approved the
multi-client operating model and required regulatory permissions exist.

## Phase 2: single-worker outbound-IP verification (no broker orders)

This phase tests whether a **separately provisioned** compute instance exits
through its assigned static public IPv4 address. The HTTP request goes only
to `https://checkip.amazonaws.com/`. It never connects to Zerodha.

1. In AWS Mumbai (`ap-south-1`), provision one small EC2 Linux instance
   within an existing correctly configured VPC/public subnet. Attach its
   security group with inbound SSH restricted to your own administrator IP;
   outbound HTTPS must be allowed. Follow your organization's hardening policy.
2. Allocate one Elastic IP in the same region, associate it to the instance,
   and verify the instance has a route to an Internet Gateway. Note that
   Elastic IP allocation and instance runtime incur AWS charges.
3. Install Node.js 22+ on the worker. Check out the
   `feature/client-egress-dry-run` branch. **Do not copy PMS database,
   Kite API credentials, access tokens, or production `.env` onto this worker.**
4. On that EC2 instance (not on your Mac or the existing Lightsail server):

   ```bash
   EXPECTED_EGRESS_IP="<your-assigned-elastic-ip>" \
     node apps/api/src/services/check-worker-egress.mjs
   ```

   A successful check prints JSON with `matches: true` and exits 0.
   Mismatch/network failure exits nonzero, without enabling trading.
5. Run unit tests locally or on the instance:

   ```bash
   node --test apps/api/src/services/client-egress-pilot.test.mjs \
     apps/api/src/services/client-egress-network-probe.test.mjs
   ```

6. Stop/delete temporary compute and release the Elastic IP when no longer
   needed, to avoid ongoing charges.

**Interpretation:** a matching public IP proves that this specific test
request exited via that IP at that moment. It neither proves that Zerodha
has whitelisted it nor authorizes direct trading in unrelated client
accounts. Route observations must be made from each actual worker instance.
Do not proxy orders through a whitelisted address to circumvent broker
rules. Integrate live execution only after explicit broker approval and
suitable account authorization.
