# Escrow Flow (pt 3 - Composing Demands)

The logical arbiter contracts AnyArbiter, AllArbiter, and NotArbiter can be used to compose demands. For example, you could demand that

- a task can only be completed by a particular account, and is validated by a trusted third party
- a task is completed before a particular deadline, and validated by any of a list of trusted third parties
- uptime for a server provision is above a certain threshold, and is actually the expected service

## Using logical arbiters

You can use AllArbiter to demand multiple conditions at the same time. For example, that your task is completed by a particular individual before a deadline, and validated by a third party.
[code example]

You can use AnyArbiter when multiple alternative conditions can be considered valid. For example, if you accept a decision from any of a list of trusted third party oracles, or if there are different proof mechanisms that equally ensure the validity of a result.
[code example]

Logical arbiters can be stacked. For example, you could demand that a job is completed before a deadline by a particular party, and validated by any of a list of trusted oracles.
[code example]

## Parsing composed demands

When parsing composed demands, you can use the arbiter address of each subdemand as a type id. You could communicate the whole composed demand off-chain, and only validate that the on-chain demand matches what was communicated.
[code example]

If this isn't possible, you could keep a local record mapping sub-arbiters that you support (including each logical arbiter) to their DemandData formats, and parse demands recursively.
[code example]
