export type CommunityResponseAuthority = "everyone" | "moderator" | "administrator";
export type CommunityResponseVisibility = "public" | "private" | "ephemeral";
export type CommunityResponseScalar = string | number | boolean;

export interface CommunityResponseTriggerInput {
  readonly kind: "exact-text";
  readonly value: string;
}
export interface CommunityResponseRateBudget {
  readonly maxResponses: number;
  readonly window: string;
}
export interface CommunityResponseProvenance {
  readonly sourceId: string;
  readonly revision: string;
}
export interface CommunityResponseCommandInput {
  readonly id: string;
  readonly revision: string;
  readonly triggers: readonly CommunityResponseTriggerInput[];
  readonly variables: readonly string[];
  readonly template: string;
  readonly visibility: CommunityResponseVisibility;
  readonly authority: CommunityResponseAuthority;
  readonly rateBudget: CommunityResponseRateBudget;
  readonly provenance: CommunityResponseProvenance;
}
export interface CommunityResponseProgramInput {
  readonly type: "ProgrammableCommunityResponseProgram";
  readonly version: 1;
  readonly id: string;
  readonly revision: string;
  readonly commands: readonly CommunityResponseCommandInput[];
}
export interface CommunityResponseCommand extends Omit<CommunityResponseCommandInput, "triggers"> {
  readonly triggers: readonly string[];
}
export interface CommunityResponseProgram extends Omit<CommunityResponseProgramInput, "commands"> {
  readonly commands: readonly CommunityResponseCommand[];
}
export interface CommunityResponseEvent {
  readonly type: "CommunityResponseEvent";
  readonly version: 1;
  readonly id: string;
  readonly scopeId: string;
  readonly content: string;
  readonly actorAuthority: CommunityResponseAuthority;
  readonly originResponse?: Readonly<{ id: string; proposalId: string }>;
}
export interface CommunityResponseRateBudgetObservation {
  readonly type: "CommunityResponseRateBudgetObservation";
  readonly version: 1;
  readonly observedAt: string;
  readonly sourceRevision: string;
  readonly commandId: string;
  readonly scopeId: string;
  readonly window: string;
  readonly responseCount: number;
}
export interface CommunityResponseProposalIdentity {
  readonly programId: string;
  readonly programRevision: string;
  readonly commandId: string;
  readonly commandRevision: string;
  readonly eventId: string;
  readonly scopeId: string;
  readonly template: string;
  readonly sourceId: string;
  readonly sourceRevision: string;
  readonly budgetRevision: string;
  readonly renderedDigest: string;
}
export interface CommunityResponseProposalProvenance {
  readonly sourceId: string;
  readonly sourceRevision: string;
  readonly programRevision: string;
  readonly templateDigest: string;
  readonly renderedDigest: string;
  readonly budgetRevision: string;
}
export interface CommunityResponseProposal {
  readonly type: "CommunityResponseProposal";
  readonly version: 1;
  readonly id: string;
  readonly identity: CommunityResponseProposalIdentity;
  readonly visibility: CommunityResponseVisibility;
  readonly content: string;
  readonly executable: false;
  readonly allowedMentions: "none";
  readonly authority: "adapter-review-required";
  readonly provenance: CommunityResponseProposalProvenance;
  readonly safeguards: readonly ["no-eval", "no-dynamic-import", "no-network", "no-filesystem", "no-discord-execution", "anti-loop", "rate-budget", "mentions-none"];
}
export type CommunityResponsePlan =
  | Readonly<{ kind: "propose"; proposal: CommunityResponseProposal }>
  | Readonly<{ kind: "ignore"; reason: "no-trigger-match"; executable: false }>
  | Readonly<{ kind: "block"; reason: "response-origin-loop" | "authority-denied" | "rate-budget-exhausted"; executable: false; commandId?: string }>;
export interface CommunityResponsePlanOptions {
  readonly now?: Date;
  readonly maxObservationAgeMs?: number;
  readonly variables?: Readonly<Record<string, CommunityResponseScalar>>;
  readonly rateBudgetObservation?: CommunityResponseRateBudgetObservation;
}

export function normalizeCommunityResponseProgram(input: CommunityResponseProgramInput): CommunityResponseProgram;
export function renderBoundedTemplate(template: string, variables: Readonly<Record<string, CommunityResponseScalar>>, allowedVariables: readonly string[]): string;
export function validateCommunityResponseProposal(input: CommunityResponseProposal): CommunityResponseProposal;
export function planCommunityResponse(program: CommunityResponseProgramInput, event: CommunityResponseEvent, options?: CommunityResponsePlanOptions): CommunityResponsePlan;
