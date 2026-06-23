# n8n-nodes-carly

An [n8n](https://n8n.io) community node for [Carly](https://www.usecarly.com) — the AI scheduling assistant. Read and manage your booking pages, event types, calendars, bookings, and availability slots from n8n workflows.

This node is **auto-generated** from the [`carly-cli`](https://github.com/usecarly/carly-cli) command definitions, so the n8n operations stay in lockstep with the CLI and MCP server — same API surface, no drift.

## Installation

Follow the [community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/). In n8n: **Settings → Community Nodes → Install** and enter `n8n-nodes-carly`.

## Credentials

Create a **Carly API** credential with an API key generated in the Carly dashboard (Booking Pages → "Generate API key"). Write operations (create/update/delete booking pages, calendar select/unselect) require a key with the `booking_pages:write` scope. Click **Test** on the credential to verify the key against `/whoami`.

## Operations

| Resource | Operations |
|---|---|
| **Profile** | Whoami |
| **Calendars** | List, Select, Unselect |
| **Event Types** | List |
| **Booking Pages** | List, Get, Create, Update, Delete |
| **Bookings** | List, Get |
| **Slots** | List |

The node sets `usableAsTool: true`, so it can be attached to n8n's AI Agent node as a tool.

### Notes

- **Booking page nested fields** (`availability`, `customQuestions`, `durationOptions`) are JSON inputs. See the field descriptions for the expected shape, e.g. `availability`: `[{"days":[1,2,3,4,5],"start_time":"09:00","end_time":"17:00"}]` (days: Sun=0 … Sat=6).
- **Delete** soft-deletes (sets `is_active=false`); re-activate via **Update** with `isActive=true`.
- **Slots List** requires either `eventTypeId`, or both `username` and `eventTypeSlug`, plus a `startTime`/`endTime` range.

## Resources

- [Carly API docs](https://www.usecarly.com/developers)
- [n8n community nodes docs](https://docs.n8n.io/integrations/#community-nodes)

## License

[MIT](LICENSE)
