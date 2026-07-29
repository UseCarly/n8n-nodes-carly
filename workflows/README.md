# Carly workflow templates

Ready-to-submit n8n workflow templates for the [Carly](https://www.usecarly.com) node.
Import each JSON into an n8n editor, connect credentials, test, then submit via the
**Creator Portal → Templates → Submit a template** (upload the JSON, set price **Free**).

> Carly has **no webhooks**, so these templates poll on a Schedule Trigger and
> use **Remove Duplicates** ("items seen in previous executions") to work out
> what changed between runs.

| File | What it does |
| --- | --- |
| `new-booking-to-slack.json` | Every 5 min → list upcoming bookings → keep new *and changed* ones → route cancellations and new bookings to separate Slack messages. |
| `new-booking-to-teams.json` | Every 5 min → list bookings → keep only new ones → post an HTML card to a Microsoft Teams channel. |
| `weekly-overview-to-gmail.json` | Every Monday 8am → list this week's bookings → build an HTML table → email it via Gmail. |

## Pipeline

Slack (`new-booking-to-slack.json`):

`Schedule Trigger (5 min)` → `Settings` → `Carly: List bookings` →
`Split Out (items)` → `Remove Duplicates (uid + status)` →
`If: cancelled?` → `Slack (cancellation)` / `Slack (new booking)`

Teams:

`Schedule Trigger (5 min)` → `Carly: List bookings` → `Split Out (items)` →
`Remove Duplicates (uid)` → `Teams`

The Carly **List** operation returns `{ items: [...] }` as a single item, so a
**Split Out** node (`fieldToSplitOut: items`) fans it into one item per booking.

### Why the Slack one dedupes on `uid` + `status`

Keyed on `uid` alone, a booking notifies once and is never heard from again.
Keyed on the `uid`-`status` pair, a booking that later flips to `cancelled`
produces a key the workflow hasn't seen, so it comes through a second time and
can be routed to a cancellation message. That is the whole trick behind
change detection without webhooks.

Consequence worth knowing: **run the workflow once manually before activating
it.** The first execution records every existing booking as seen. Activate
without doing that and the channel gets one message per booking already on the
calendar.

n8n rejected the first version of this template as "too basic" (2026-07-03) —
a five-node straight line. Cancellation handling, the config node and the
defensive attendee expressions are the response to that.

## Before submitting, in your editor

1. Install the community node `n8n-nodes-carly` (Settings → Community Nodes).
2. Connect a **Carly API** credential (API key from the Carly dashboard).
3. Connect Slack / Microsoft Teams / Gmail and pick the channel / recipient
   (placeholders are blank; the Gmail template's recipient lives in the **Settings** node).
4. Execute once to confirm, then upload the JSON to the Creator Portal.

## Built to n8n's [template submission guidelines](https://n8n.notion.site/Template-submission-guidelines-9959894476734da3b402c90b124b1f77)

- **Titles** use sentence-case "action verb → thing → where" (no emojis).
- **Sticky notes (mandatory):** each workflow has one yellow description sticky
  (full description inside) + neutral step stickies.
- **No hardcoded keys** — auth is the Carly credential, not an HTTP node.
- **Set Fields:** the Gmail template groups its one config var (recipient) in a
  `Settings` node.

### Two things YOU must add at submit time (can't be done in the JSON)

1. **Community-node requirements** — in the description, add the **self-hosted-only**
   disclaimer (already in the sticky) **and a workflow screenshot image at the very
   top** of the description. Community-node templates don't render an auto-preview,
   so the image is required.
2. **Description box** — paste the text from the yellow sticky (it already uses
   `## H2` sections: Who's it for / How it works / How to set up / Requirements /
   Customize), then set price **Free**.

Booking fields available on each item: `uid`, `title`, `status`, `start_time`,
`end_time`, `notes`, `username`, `event_type_slug`, and
`attendees[]` (`name`, `email`, `phone`, `company`, `timezone`).
