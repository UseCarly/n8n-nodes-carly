# Submission description — new-booking-to-slack

Paste this into the Creator Portal description box for workflow 16626
(Template actions → Edit description), **with a screenshot of the workflow
canvas at the very top**. Community-node templates don't render an automatic
preview, so n8n requires the image.

The portal rejects `Upload new version` with
`400 — "A complete description is required to submit for review"` until the
description is filled in, so do this before uploading the JSON.

---

## Quick overview

Notifies a Slack channel when someone books time through your
[Carly](https://www.usecarly.com) booking pages — and again if they cancel.
Carly has no webhooks, so this polls on a schedule and works out what changed
by itself.

## How it works

1. Runs every 5 minutes on a schedule.
2. A **Settings** node holds the lookahead window (14 days by default).
3. Lists bookings from Carly that start inside that window.
4. Splits the response so each booking is its own item.
5. Keeps only bookings whose `uid` + `status` pair hasn't been seen in a
   previous execution. Deduping on the pair rather than `uid` alone is the
   trick: a booking that later flips to `cancelled` produces a key the
   workflow hasn't seen, so it comes through a second time.
6. An **If** node splits cancellations from new bookings.
7. Posts a differently worded Slack message for each — new bookings show the
   time, attendees, event type and notes; cancellations show what was
   cancelled and the reason given.

## Setup

1. Install the `n8n-nodes-carly` community node (Settings → Community nodes).
   Requires self-hosted n8n.
2. Add your Carly API key as an n8n credential and attach it to the Carly
   node. The key needs the `bookings:read` scope.
3. Add your Slack credential and pick a channel on **both** Slack nodes.
4. Optionally change `lookaheadDays` in the Settings node.
5. **Run once manually before activating.** The first execution records every
   booking already on your calendar as seen. Skip this and switching the
   workflow on posts one message per existing booking.

## Requirements

- Self-hosted n8n — community nodes don't run on n8n Cloud
- A Carly account and API key
- A Slack workspace

## Customize

- Change the trigger interval to poll faster or less often.
- Set **Event Type ID** on the Carly node to watch a single booking page.
- Add a Filter after the split to notify only for certain event types.
- Edit either Slack message; each booking exposes `uid`, `title`, `status`,
  `start_time`, `end_time`, `notes`, `username`, `event_type_slug`,
  `cancellation_reason` and `attendees[]` (`name`, `email`, `phone`,
  `company`, `timezone`).
