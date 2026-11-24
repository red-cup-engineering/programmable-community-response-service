import { normalizeCommunityResponseProgram, planCommunityResponse, type CommunityResponseEvent, type CommunityResponseProgramInput, type CommunityResponseRateBudgetObservation } from "@red-cup-engineering/programmable-community-response-service";

const program: CommunityResponseProgramInput = {
  type: "ProgrammableCommunityResponseProgram", version: 1, id: "consumer", revision: "r1",
  commands: [{ id: "status", revision: "r1", triggers: [{ kind: "exact-text", value: "!status" }], variables: [], template: "OK", visibility: "ephemeral", authority: "everyone", rateBudget: { maxResponses: 1, window: "minute" }, provenance: { sourceId: "consumer-source", revision: "r1" } }],
};
const event: CommunityResponseEvent = { type: "CommunityResponseEvent", version: 1, id: "event-1", scopeId: "scope-1", content: "!status", actorAuthority: "everyone" };
const observation: CommunityResponseRateBudgetObservation = { type: "CommunityResponseRateBudgetObservation", version: 1, observedAt: "2026-08-29T00:00:00.000Z", sourceRevision: "ledger-1", commandId: "status", scopeId: "scope-1", window: "minute", responseCount: 0 };
const normalized = normalizeCommunityResponseProgram(program);
const plan = planCommunityResponse(program, event, { now: new Date("2026-08-29T00:00:01.000Z"), maxObservationAgeMs: 60_000, variables: {}, rateBudgetObservation: observation });
void normalized.commands[0]?.triggers;
if (plan.kind === "propose") void plan.proposal.identity.renderedDigest;
