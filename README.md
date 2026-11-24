# Programmable community response service

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

Reusable, transport-free planning for declarative community commands, tags, and
exact-text triggers. It deliberately provides no evaluator: templates can only
substitute named scalar variables. It has no dynamic import, `eval`, network,
filesystem, Discord, or persistence capability.

An application supplies the program, normalized event, scalar context, and a
read-only prior-response count. The result is an immutable, non-executable
proposal or a typed ignore/block decision. Adapters must separately authorize,
execute, record, and rate-store any real response.

Programs use deterministic ids/revisions, collision-free exact triggers,
visibility and authority declarations, bounded output, provenance, anti-loop
blocking, and a per-command response budget.
